import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "@/types/payment.types";
import { insertSuccessPayment } from "@/lib/payment";
import { 
  sendTwilioMessage, 
  sendSMS, 
  sendWhatsApp, 
  sendOTP,
  sendWelcomeMessage,
  sendEventConfirmation,
  sendPaymentConfirmation,
  sendComprehensiveNotification
} from '@/lib/messaging';

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = body;

        // Verify signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Get payment details for logging/database storage
            const payment = await instance.payments.fetch(razorpay_payment_id);
            const order = await instance.orders.fetch(razorpay_order_id);

            // Here you can save to database if needed
            console.log("Payment successful:", {
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                amount: payment.amount,
                notes: order.notes
            });

            const paymentDetails: Partial<Payment> = {
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                amount: parseInt(payment.amount.toString()) / 100,
                email: order.notes?.email,
                phone: order.notes?.phone,
                first_name: order.notes?.firstName,
                description: order.notes?.description || null,
                last_name: order.notes?.lastName,
                gst_number: order.notes?.gstNumber || null,
                company_name: order.notes?.companyName || null,
                paidFor: order.notes?.paidFor || undefined,
                utm_source: order.notes?.utm_source || null,
                utm_medium: order.notes?.utm_medium || null,
                utm_campaign: order.notes?.utm_campaign || null,
                created_at: new Date(payment.created_at * 1000).toISOString(),
            }

            await insertSuccessPayment(paymentDetails);
            
            // Send comprehensive notification after successful payment
            if (paymentDetails.phone) {
                try {
                    const phoneNumber = String(paymentDetails.phone);
                    const paidForString = String(paymentDetails.paidFor || paymentDetails.description || 'BizCivitas Membership');
                    
                    const messageResult = await sendComprehensiveNotification(
                        phoneNumber,
                        {
                            userName: paymentDetails.first_name ? 
                                `${paymentDetails.first_name} ${paymentDetails.last_name || ''}`.trim() : 
                                undefined,
                            amount: paymentDetails.amount,
                            membershipType: paidForString,
                            transactionId: paymentDetails.payment_id,
                            includeBenefits: true,
                            includeNetworkingTips: paidForString.toLowerCase().includes('event'),
                            includeContactInfo: true
                        },
                        'sms' // Use WhatsApp for comprehensive notifications
                    );

                    if (!messageResult.success) {
                        console.error('Failed to send comprehensive notification:', messageResult.error);
                        
                        // Fallback to simple payment confirmation via SMS
                        const fallbackResult = await sendPaymentConfirmation(
                            phoneNumber,
                            paymentDetails.amount || 0,
                            paidForString,
                            paymentDetails.payment_id || '',
                            'whatsapp'
                        );
                        
                        if (!fallbackResult.success) {
                            console.error('SMS fallback also failed:', fallbackResult.error);
                        }
                    } else {
                        console.log('Comprehensive notification sent successfully:', messageResult.sid);
                    }
                } catch (messageError) {
                    console.error('Error sending notification:', messageError);
                }
            } else {
                console.log('No phone number provided, skipping notification');
            }
            return NextResponse.json({
                success: true,
                message: "Payment verified successfully",
                payment_id: razorpay_payment_id
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { success: false, message: "Payment verification failed" },
            { status: 500 }
        );
    }
}
