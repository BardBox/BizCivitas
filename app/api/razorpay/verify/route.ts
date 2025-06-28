import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "@/types/payment.types";
import { insertSuccessPayment } from "@/lib/payment";
import {
    sendMinimalPaymentConfirmation,
    sendFreeEventCelebration
} from '@/lib/messaging';
import { supabase } from "@/lib/db";

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
            });            const paymentDetails: Partial<Payment> = {
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

            // Check if payment is for an event ticket
            const paidForString = String(order.notes?.paidFor || '');
            const isEventPayment = paidForString.toLowerCase().includes('event') || 
                                 paidForString.toLowerCase().includes('ticket');

            if (isEventPayment && paymentDetails.amount && paymentDetails.amount > 0) {
                try {
                    // Extract details from payment notes
                    const firstName = String(order.notes?.firstName || '');
                    const lastName = String(order.notes?.lastName || '');
                    const fullName = `${firstName} ${lastName}`.trim();
                    const email = String(order.notes?.email || '');
                    const phone = String(order.notes?.phone || '');
                    const companyName = String(order.notes?.companyName || '');
                    const reasonToAttend = String(order.notes?.whyToAttend || order.notes?.description || '');
                    const eventSlug = String(order.notes?.eventSlug || '');
                    const couponCode = String(order.notes?.couponCode || '');
                    const referredBy = String(order.notes?.referredBy || '');

                    const { data, error } = await supabase
                        .from('attendees')
                        .insert([
                            {
                                name: fullName || '',
                                business_name: companyName?.trim() || null,
                                email: email.trim().toLowerCase(),
                                phone: phone?.trim() || null,
                                reason_to_attend: reasonToAttend?.trim() || null,
                                event_slug: eventSlug || null,
                                coupon_code: couponCode?.toUpperCase() || null,
                                amount_paid: paymentDetails.amount || 0,
                                paid_for: paidForString || null,
                                referredBy: referredBy || null,
                                utm_source: paymentDetails.utm_source || null,
                                utm_medium: paymentDetails.utm_medium || null,
                                utm_campaign: paymentDetails.utm_campaign || null,
                                registration_type: couponCode?.toUpperCase() === 'LASTMINUTE' ? 'free_coupon' : 'regular',
                                created_at: new Date().toISOString()
                            },
                        ])
                        .select()
                        .single();

                    if (error) {
                        console.error('Supabase error:', error);

                        // Handle duplicate email error
                        if (error.code === '23505' && error.message.includes('email')) {
                            return NextResponse.json(
                                { error: 'This email is already registered for the event' },
                                { status: 409 }
                            );
                        }

                        // Handle duplicate phone error for coupon users
                        if (error.code === '23505' && error.message.includes('phone') && couponCode?.toUpperCase() === 'LASTMINUTE') {
                            return NextResponse.json(
                                { error: 'This phone number has already been used to claim the LASTMINUTE coupon.' },
                                { status: 409 }
                            );
                        }

                        return NextResponse.json(
                            { error: 'Failed to register for event. Please try again.' },
                            { status: 500 }
                        );
                    }

                    // Send WhatsApp template message if environment variables are available
                    const apiKey = process.env.WHATSAPP_API_KEY;
                    const templateName = process.env.WHATSAPP_EVENT_TEMPLATE_NAME;
                    
                    if (apiKey && templateName && phone) {
                        await fetch(`https://official.thefuturetech.in/wapp/api/v2/send/bytemplate?apikey=${apiKey}&templatename=${templateName}&mobile=${phone.trim()}&dvariables=${fullName.trim()},${data.id.toString().slice(0, 10)}`, {
                            method: "POST",
                        })
                    }

                    return NextResponse.json(
                        {
                            success: true,
                            message: couponCode?.toUpperCase() === 'LASTMINUTE'
                                ? 'Free registration successful with LASTMINUTE coupon!'
                                : 'Event registration successful',
                            registrationId: data.id,
                            data: {
                                id: data.id,
                                name: data.name,
                                email: data.email,
                                phone: data.phone,
                                couponCode: data.coupon_code,
                                registrationType: data.registration_type
                            }
                        },
                        { status: 201 }
                    );
                } catch (error) {
                    console.error('Event registration error:', error);
                    return NextResponse.json(
                        { error: 'Failed to register for event. Please try again.' },
                        { status: 500 }
                    );
                }
            } else {
                // For non-event payments, store in payments table
                await insertSuccessPayment(paymentDetails);
            }            // Send minimal payment confirmation after successful payment
            if (paymentDetails.phone) {
                try {
                    const phoneNumber = String(paymentDetails.phone);

                    const messageResult = await sendMinimalPaymentConfirmation(
                        phoneNumber,
                        paymentDetails.amount || 0,
                        paymentDetails.payment_id || '',
                        'sms'
                    );

                    if (!messageResult.success) {
                        console.error('Failed to send payment confirmation:', messageResult.error);
                    } else {
                        console.log('Payment confirmation sent successfully:', messageResult.sid);
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
