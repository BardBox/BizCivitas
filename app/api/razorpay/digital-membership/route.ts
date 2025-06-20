import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuid } from "uuid";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      companyName, 
      gstNumber, 
      amount = 8259, // Default amount with GST
      utm_source,
      utm_medium,
      utm_campaign 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // Create order with Razorpay
    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `digital_membership_${uuid().slice(0, 16)}`, // Unique receipt ID
      notes: {
        firstName,
        lastName,
        email,
        phone,
        companyName,
        gstNumber: gstNumber || '',
        membershipType: 'Digital Membership',
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || ''
      }
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({ 
      success: true, 
      order,
      key_id: process.env.RAZORPAY_KEY_ID 
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" }, 
      { status: 500 }
    );
  }
}
