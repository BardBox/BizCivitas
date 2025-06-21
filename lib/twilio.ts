const accountSid = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';

export const client = require('twilio')(accountSid, authToken);

// Re-export messaging functions for backward compatibility
export { 
  sendTwilioMessage,
  sendSMS,
  sendWhatsApp,
  sendOTP,
  sendWelcomeMessage,
  sendEventConfirmation,
  sendPaymentConfirmation,
  sendComprehensiveNotification,
  sendQuickWelcomePackage,
  sendMinimalPaymentConfirmation
} from './messaging';

// Legacy function - use sendSMS from messaging.ts instead
export async function sendSms(to: string, message: string) {
  try {
    const res = await fetch("/api/twilio/sendmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, message, type: 'sms' }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to send SMS");
    }

    return {
      success: true,
      sid: data.sid,
    };
  } catch (error: any) {
    console.error("SMS send error:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}