import { sendTwilioMessage } from "@/lib/messaging";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { to, message, type = 'sms' } = body;

        // Use the modular messaging function
        const result = await sendTwilioMessage({ to, message, type });

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

// GET endpoint to check Twilio configuration
export async function GET() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    
    const isConfigured = !!(accountSid && authToken && twilioPhoneNumber);
    
    return NextResponse.json({
        configured: isConfigured,
        phoneNumber: twilioPhoneNumber ? `${twilioPhoneNumber.slice(0, 3)}****${twilioPhoneNumber.slice(-4)}` : null,
        accountSid: accountSid ? `${accountSid.slice(0, 8)}****${accountSid.slice(-8)}` : null
    });
}