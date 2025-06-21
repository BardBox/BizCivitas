import { client } from "@/lib/twilio";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { to, message } = body;

        // Validate required fields
        if (!to || !message) {
            return NextResponse.json(
                { error: "Missing required fields: 'to' and 'message'" },
                { status: 400 }
            );
        }

        // Send SMS using Twilio
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
            to: to,
        });

        return NextResponse.json({ success: true, sid: response.sid });
    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json(
            { error: "Failed to send SMS" },
            { status: 500 }
        );
    }
}