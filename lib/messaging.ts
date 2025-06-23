import { client } from './twilio';

export interface SendMessageOptions {
  to: string;
  message: string;
  type?: 'sms' | 'whatsapp';
}

export interface SendMessageResult {
  success: boolean;
  sid?: string;
  status?: string;
  to?: string;
  from?: string;
  type?: string;
  dateCreated?: string;
  price?: string;
  priceUnit?: string;
  error?: string;
  code?: string;
  moreInfo?: string;
}

/**
 * Send SMS or WhatsApp message through Twilio
 * @param options - Message options including recipient, message, and type
 * @returns Promise with send result
 */
export async function sendTwilioMessage(options: SendMessageOptions): Promise<SendMessageResult> {
  const { to, message, type = 'sms' } = options;

  try {
    // Validate required fields
    if (!to || !message) {
      return {
        success: false,
        error: "Missing required fields: 'to' and 'message'"
      };
    }

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(to.replace(/\s+/g, ''))) {
      return {
        success: false,
        error: "Invalid phone number format. Use international format (e.g., +919876543210)"
      };
    }

    // Check if Twilio credentials are configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return {
        success: false,
        error: "Twilio credentials not configured"
      };
    }

    let fromNumber = process.env.TWILIO_PHONE_NUMBER;
    let toNumber = to;

    // Handle WhatsApp vs SMS formatting
    if (type === 'whatsapp') {
      fromNumber = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;
      // Ensure WhatsApp format
      if (to.startsWith('whatsapp:')) {
        toNumber = to;
      } else {
        toNumber = `whatsapp:${to.startsWith('+') ? to : '+91' + to}`;
      }
    } else {
      // For SMS, ensure proper formatting
      toNumber = to.startsWith('+') ? to : '+91' + to;
    }

    console.log(`Sending ${type.toUpperCase()} message:`, {
      from: fromNumber,
      to: toNumber,
      messageLength: message.length
    });

    // Send message using Twilio
    const response = await client.messages.create({
      body: message,
      from: fromNumber,
      to: toNumber,
    });

    return {
      success: true,
      sid: response.sid,
      status: response.status,
      to: response.to,
      from: response.from,
      type: type,
      dateCreated: response.dateCreated,
      price: response.price,
      priceUnit: response.priceUnit
    };

  } catch (error: any) {
    console.error(`Error sending ${type} message:`, error);
    
    // Handle Twilio-specific errors
    if (error.code) {
      let errorMessage = 'Failed to send message';
      
      switch (error.code) {
        case 21211:
          errorMessage = 'Invalid phone number';
          break;
        case 21614:
          errorMessage = 'Phone number is not valid for SMS';
          break;
        case 21408:
          errorMessage = 'Permission to send messages to this number is not enabled';
          break;
        case 20003:
          errorMessage = 'Authentication error - check Twilio credentials';
          break;
        case 20429:
          errorMessage = 'Rate limit exceeded';
          break;
        case 63016:
          errorMessage = 'WhatsApp message failed - recipient may not have WhatsApp or number not verified';
          break;
        case 63017:
          errorMessage = 'WhatsApp Business Account not approved or phone number not verified';
          break;
        case 63018:
          errorMessage = 'WhatsApp template message failed - check template approval';
          break;
        case 21610:
          errorMessage = 'Attempt to send WhatsApp message outside allowed window (24 hours)';
          break;
        default:
          errorMessage = error.message || 'Twilio API error';
      }
      
      return {
        success: false,
        error: errorMessage,
        code: error.code,
        moreInfo: error.moreInfo
      };
    }

    return {
      success: false,
      error: "Internal server error"
    };
  }
}

/**
 * Send SMS message (convenience function)
 * @param to - Phone number to send to
 * @param message - Message content
 * @returns Promise with send result
 */
export async function sendSMS(to: string, message: string): Promise<SendMessageResult> {
  return sendTwilioMessage({ to, message, type: 'sms' });
}

/**
 * Send WhatsApp message (convenience function)
 * @param to - Phone number to send to
 * @param message - Message content
 * @returns Promise with send result
 */
export async function sendWhatsApp(to: string, message: string): Promise<SendMessageResult> {
  return sendTwilioMessage({ to, message, type: 'whatsapp' });
}

/**
 * Send OTP via SMS with standard format
 * @param to - Phone number to send to
 * @param otp - OTP code
 * @param serviceName - Service name (default: BizCivitas)
 * @param validityMinutes - OTP validity in minutes (default: 10)
 * @returns Promise with send result
 */
export async function sendOTP(
  to: string, 
  otp: string, 
  serviceName: string = 'BizCivitas',
  validityMinutes: number = 10
): Promise<SendMessageResult> {
  const message = `Your ${serviceName} verification code is: ${otp}. This code is valid for ${validityMinutes} minutes. Do not share this code with anyone.`;
  return sendSMS(to, message);
}

/**
 * Send welcome message via SMS/WhatsApp
 * @param to - Phone number to send to
 * @param userName - User's name
 * @param type - Message type (sms or whatsapp)
 * @returns Promise with send result
 */
export async function sendWelcomeMessage(
  to: string, 
  userName: string = '', 
  type: 'sms' | 'whatsapp' = 'sms'
): Promise<SendMessageResult> {
  const greeting = userName ? `Hi ${userName}! ` : 'Hello! ';
  const message = `${greeting}Welcome to BizCivitas! Thank you for joining our community of innovative entrepreneurs and business leaders. We're excited to have you on board!`;
  return sendTwilioMessage({ to, message, type });
}

/**
 * Send event registration confirmation
 * @param to - Phone number to send to
 * @param eventName - Name of the event
 * @param eventDate - Event date
 * @param type - Message type (sms or whatsapp)
 * @returns Promise with send result
 */
export async function sendEventConfirmation(
  to: string,
  eventName: string,
  eventDate: string,
  type: 'sms' | 'whatsapp' = 'sms'
): Promise<SendMessageResult> {
  const message = `🎉 Registration confirmed! You're registered for "${eventName}" on ${eventDate}. We'll send you event details soon. Thank you for choosing BizCivitas!`;
  return sendTwilioMessage({ to, message, type });
}

/**
 * Send payment confirmation message
 * @param to - Phone number to send to
 * @param amount - Payment amount
 * @param item - What was purchased
 * @param transactionId - Transaction/Order ID
 * @param type - Message type (sms or whatsapp)
 * @returns Promise with send result
 */
export async function sendPaymentConfirmation(
  to: string,
  amount: number,
  item: string,
  transactionId: string,
  type: 'sms' | 'whatsapp' = 'sms'
): Promise<SendMessageResult> {
  const message = `✅ Payment successful! Amount: ₹${amount} for ${item}. Transaction ID: ${transactionId}. Thank you for your purchase with BizCivitas!`;
  return sendTwilioMessage({ to, message, type });
}

/**
 * Send comprehensive welcome + event + payment confirmation with engaging content
 * @param to - Phone number to send to
 * @param options - Comprehensive notification options
 * @param type - Message type (sms or whatsapp)
 * @returns Promise with send result
 */
export async function sendComprehensiveNotification(
  to: string,
  options: {
    userName?: string;
    eventName?: string;
    eventDate?: string;
    eventVenue?: string;
    amount?: number;
    membershipType?: string;
    transactionId?: string;
    includeBenefits?: boolean;
    includeNetworkingTips?: boolean;
    includeContactInfo?: boolean;
  },
  type: 'sms' | 'whatsapp' = 'whatsapp'
): Promise<SendMessageResult> {
  const {
    userName = '',
    eventName,
    eventDate,
    eventVenue,
    amount,
    membershipType,
    transactionId,
    includeBenefits = true,
    includeNetworkingTips = false,
    includeContactInfo = true
  } = options;

  // Build comprehensive message
  let message = '';

  // Welcome Section
  const greeting = userName ? `🎉 Welcome ${userName}!` : '🎉 Welcome to BizCivitas!';
  message += `${greeting}\n\n`;
  
  message += `Thank you for joining India's premier entrepreneurial community! You're now part of a network of innovative business leaders, visionary entrepreneurs, and industry experts.\n\n`;

  // Payment Confirmation (if provided)
  if (amount && transactionId) {
    message += `💳 PAYMENT CONFIRMED\n`;
    message += `Amount: ₹${amount}\n`;
    if (membershipType) {
      message += `Plan: ${membershipType}\n`;
    }
    message += `Transaction ID: ${transactionId}\n\n`;
  }

  // Event Details (if provided)
  if (eventName) {
    message += `📅 EVENT REGISTRATION CONFIRMED\n`;
    message += `Event: ${eventName}\n`;
    if (eventDate) {
      message += `Date: ${eventDate}\n`;
    }
    if (eventVenue) {
      message += `Venue: ${eventVenue}\n`;
    }
    message += `\n`;
  }

  // Membership Benefits (if enabled)
  if (includeBenefits) {
    message += `🌟 YOUR MEMBERSHIP BENEFITS:\n`;
    message += `• Access to exclusive networking events\n`;
    message += `• Industry insights & market intelligence\n`;
    message += `• Mentorship opportunities with industry leaders\n`;
    message += `• Business collaboration opportunities\n`;
    message += `• Priority access to workshops & seminars\n`;
    message += `• Digital resources & business tools\n\n`;
  }

  // Networking Tips (if enabled)
  if (includeNetworkingTips) {
    message += `💡 NETWORKING SUCCESS TIPS:\n`;
    message += `• Come prepared with your elevator pitch\n`;
    message += `• Bring plenty of business cards\n`;
    message += `• Focus on building genuine relationships\n`;
    message += `• Follow up within 48 hours\n`;
    message += `• Be curious and ask thoughtful questions\n\n`;
  }

  // What's Next Section
  message += `🚀 WHAT'S NEXT?\n`;
  message += `• Check your email for detailed event information\n`;
  message += `• Join our WhatsApp community for updates\n`;
  message += `• Follow us on LinkedIn for industry insights\n`;
  message += `• Download the BizCivitas mobile app\n\n`;

  // Contact Information (if enabled)
  if (includeContactInfo) {
    message += `📞 NEED HELP?\n`;
    message += `WhatsApp: +91 98765 43210\n`;
    message += `Email: support@bizcivitas.com\n`;
    message += `Website: www.bizcivitas.com\n\n`;
  }

  // Closing
  message += `Ready to transform your business journey? Let's build something extraordinary together! 🚀\n\n`;
  message += `#BizCivitas #Entrepreneurship #BusinessNetworking #Innovation`;

  // Truncate message if too long for SMS (1600 char limit)
  if (type === 'sms' && message.length > 1500) {
    message = message.substring(0, 1450) + '...\n\nFor complete details, check your email or visit www.bizcivitas.com';
  }

  return sendTwilioMessage({ to, message, type });
}

/**
 * Send quick comprehensive notification (shorter version)
 * @param to - Phone number to send to
 * @param options - Quick notification options
 * @param type - Message type (sms or whatsapp)
 * @returns Promise with send result
 */
export async function sendQuickWelcomePackage(
  to: string,
  options: {
    userName?: string;
    eventName?: string;
    amount?: number;
    transactionId?: string;
  },
  type: 'sms' | 'whatsapp' = 'sms'
): Promise<SendMessageResult> {
  const { userName = '', eventName, amount, transactionId } = options;

  let message = '';

  // Welcome
  const greeting = userName ? `🎉 Welcome ${userName}!` : '🎉 Welcome to BizCivitas!';
  message += `${greeting}\n\n`;

  // Quick confirmations
  if (amount && transactionId) {
    message += `✅ Payment confirmed: ₹${amount} (ID: ${transactionId})\n`;
  }
  
  if (eventName) {
    message += `📅 Registered for: ${eventName}\n`;
  }

  message += `\n🌟 You're now part of India's premier business community!\n\n`;
  
  message += `What you get:\n`;
  message += `• Exclusive networking events\n`;
  message += `• Industry insights\n`;
  message += `• Mentorship opportunities\n`;
  message += `• Business collaborations\n\n`;

  message += `📧 Check your email for complete details\n`;
  message += `📱 Join our WhatsApp community for updates\n\n`;

  message += `Need help? WhatsApp: +91 98765 43210\n\n`;
  message += `Let's build something extraordinary! 🚀`;

  return sendTwilioMessage({ to, message, type });
}

/**
 * Send minimal payment confirmation (lowest cost - under 80 characters)
 * @param to - Phone number to send to
 * @param amount - Payment amount
 * @param txnId - Transaction ID (last 6 chars)
 * @param type - Message type (sms or whatsapp)
 * @returns Promise with send result
 */
export async function sendMinimalPaymentConfirmation(
  to: string,
  amount: number,
  txnId: string,
  type: 'sms' | 'whatsapp' = 'sms'
): Promise<SendMessageResult> {
  // Keep under 80 characters for lowest cost
  const shortTxnId = txnId; // Last 6 characters only
  const message = `✅ Paid ₹${amount} | ID:${shortTxnId} | BizCivitas | Thanks!`;
  
  return sendTwilioMessage({ to, message, type });
}

/**
 * Send free event entry celebration message
 * @param to - Phone number to send to
 * @param couponCode - Coupon code used
 * @param eventName - Event name (optional)
 * @param type - Message type (sms or whatsapp)
 * @returns Promise with send result
 */
export async function sendFreeEventCelebration(
  id : string,
  to: string,
  eventName?: string,
  type: 'sms' | 'whatsapp' = 'sms'
): Promise<SendMessageResult> {
  const eventText = eventName ? ` for ${eventName}` : '';
  const message = `🎉 HOORAY! Free Entry approved! 🎊 Welcome to BizCivitas 🚀\nID: ${id.slice(0,9)}`;

  return sendTwilioMessage({ to, message, type });
}
