# Messaging Utilities Usage Guide

The modular messaging system provides easy-to-use functions for sending SMS and WhatsApp messages through Twilio.

## Basic Usage

### Import the functions
```typescript
import { 
  sendTwilioMessage, 
  sendSMS, 
  sendWhatsApp, 
  sendOTP,
  sendWelcomeMessage,
  sendEventConfirmation,
  sendPaymentConfirmation,
  sendComprehensiveNotification,
  sendQuickWelcomePackage,
  sendMinimalPaymentConfirmation,
  sendFreeEventCelebration
} from '@/lib/messaging';
```

## Core Functions

### 1. `sendTwilioMessage` - Main function
```typescript
const result = await sendTwilioMessage({
  to: '+919876543210',
  message: 'Hello from BizCivitas!',
  type: 'sms' // or 'whatsapp'
});

if (result.success) {
  console.log('Message sent:', result.sid);
} else {
  console.error('Failed:', result.error);
}
```

### 2. `sendSMS` - SMS convenience function
```typescript
const result = await sendSMS('+919876543210', 'Your SMS message here');
```

### 3. `sendWhatsApp` - WhatsApp convenience function
```typescript
const result = await sendWhatsApp('+919876543210', 'Your WhatsApp message here');
```

## Specialized Functions

### 4. `sendOTP` - Send OTP codes
```typescript
const result = await sendOTP(
  '+919876543210', 
  '123456',          // OTP code
  'BizCivitas',      // Service name (optional)
  10                 // Validity minutes (optional)
);
```

### 5. `sendWelcomeMessage` - Welcome new users
```typescript
const result = await sendWelcomeMessage(
  '+919876543210',
  'John Doe',        // User name (optional)
  'sms'             // Type: 'sms' or 'whatsapp' (optional)
);
```

### 6. `sendEventConfirmation` - Event registration
```typescript
const result = await sendEventConfirmation(
  '+919876543210',
  'Business Networking Event',
  'December 25, 2024',
  'whatsapp'        // Type (optional)
);
```

### 7. `sendPaymentConfirmation` - Payment success
```typescript
const result = await sendPaymentConfirmation(
  '+919876543210',
  1770,             // Amount in rupees
  'Digital Membership',
  'TXN123456',      // Transaction ID
  'sms'            // Type (optional)
);
```

### 8. `sendComprehensiveNotification` - All-in-one notification
```typescript
const result = await sendComprehensiveNotification(
  '+919876543210',
  {
    userName: 'John Doe',
    eventName: 'Business Networking Summit',
    eventDate: 'December 25, 2024',
    eventVenue: 'Taj Hotel, Mumbai',
    amount: 1770,
    membershipType: 'Digital Membership',
    transactionId: 'TXN123456',
    includeBenefits: true,
    includeNetworkingTips: true,
    includeContactInfo: true
  },
  'whatsapp'        // Recommended for comprehensive messages
);
```

### 9. `sendQuickWelcomePackage` - Shorter comprehensive message
```typescript
const result = await sendQuickWelcomePackage(
  '+919876543210',
  {
    userName: 'John Doe',
    eventName: 'Business Networking Summit',
    amount: 1770,
    transactionId: 'TXN123456'
  },
  'sms'             // Good for SMS due to length limit
);
```

### 10. `sendMinimalPaymentConfirmation` - Ultra-short payment confirmation (lowest cost)
```typescript
const result = await sendMinimalPaymentConfirmation(
  '+919876543210',
  1770,             // Amount
  'pay_xyz123456',  // Transaction ID (will use last 6 chars)
  'sms'             // Recommended for lowest cost
);
// Sends: "✅ Paid ₹1770 | ID:123456 | BizCivitas | Thanks!" (under 80 chars)
```

### 11. `sendFreeEventCelebration` - Free event entry celebration
```typescript
const result = await sendFreeEventCelebration(
  '+919876543210',
  'GODIGITAL',      // Coupon code
  'Business Summit', // Event name (optional)
  'sms'             // Type (optional)
);
// Sends: "🎉 HOORAY! You got FREE Event Entry for Business Summit using GODIGITAL coupon! 🎊 Welcome to BizCivitas networking event. See you there! 🚀"
```

## Usage in API Routes

### Example: Event Registration API
```typescript
import { sendEventConfirmation } from '@/lib/messaging';

export async function POST(request: NextRequest) {
  try {
    // ... registration logic ...
    
    // Send confirmation message
    const messageResult = await sendEventConfirmation(
      userData.phone,
      eventData.name,
      eventData.date,
      'sms'
    );

    if (!messageResult.success) {
      console.error('Failed to send confirmation:', messageResult.error);
      // Continue with registration even if message fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
```

### Example: Payment Success Handler
```typescript
import { sendPaymentConfirmation } from '@/lib/messaging';

export async function handlePaymentSuccess(paymentData: any) {
  const result = await sendPaymentConfirmation(
    paymentData.phone,
    paymentData.amount / 100, // Convert from paise to rupees
    paymentData.description,
    paymentData.razorpay_payment_id
  );

  if (result.success) {
    console.log('Payment confirmation sent:', result.sid);
  } else {
    console.error('Failed to send payment confirmation:', result.error);
  }
}
```

### Example: Complete Member Onboarding with Comprehensive Notification
```typescript
import { sendComprehensiveNotification, sendQuickWelcomePackage } from '@/lib/messaging';

export async function POST(request: NextRequest) {
  try {
    const { userData, eventData, paymentData } = await request.json();
    
    // ... registration and payment processing logic ...
    
    // Send comprehensive welcome + event + payment notification
    const messageResult = await sendComprehensiveNotification(
      userData.phone,
      {
        userName: userData.name,
        eventName: eventData.name,
        eventDate: eventData.date,
        eventVenue: eventData.venue,
        amount: paymentData.amount / 100, // Convert from paise
        membershipType: paymentData.membership_type,
        transactionId: paymentData.payment_id,
        includeBenefits: true,
        includeNetworkingTips: eventData.isNetworkingEvent,
        includeContactInfo: true
      },
      'whatsapp' // Use WhatsApp for rich, comprehensive content
    );

    // If WhatsApp fails, try quick SMS version as fallback
    if (!messageResult.success) {
      console.error('WhatsApp comprehensive message failed:', messageResult.error);
      
      const smsResult = await sendQuickWelcomePackage(
        userData.phone,
        {
          userName: userData.name,
          eventName: eventData.name,
          amount: paymentData.amount / 100,
          transactionId: paymentData.payment_id
        },
        'sms'
      );
      
      if (!smsResult.success) {
        console.error('SMS fallback also failed:', smsResult.error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      messageSent: messageResult.success,
      messageId: messageResult.sid 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
```

## Error Handling

All functions return a consistent result structure:

```typescript
interface SendMessageResult {
  success: boolean;
  sid?: string;        // Twilio message ID (if successful)
  status?: string;     // Message status
  to?: string;         // Recipient number
  from?: string;       // Sender number
  type?: string;       // 'sms' or 'whatsapp'
  dateCreated?: string;// When message was sent
  price?: string;      // Message cost
  priceUnit?: string;  // Currency
  error?: string;      // Error message (if failed)
  code?: string;       // Twilio error code (if failed)
  moreInfo?: string;   // Additional error info
}
```

### Handle errors gracefully:
```typescript
const result = await sendSMS('+919876543210', 'Test message');

if (!result.success) {
  switch (result.code) {
    case '21211':
      console.error('Invalid phone number');
      break;
    case '63016':
      console.error('WhatsApp recipient not found');
      break;
    default:
      console.error('Message failed:', result.error);
  }
}
```

## Environment Variables Required

```env
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
```

## Phone Number Formats

- **International**: `+919876543210` (recommended)
- **Local**: `9876543210` (will auto-add +91)
- **WhatsApp**: Automatically formatted with `whatsapp:` prefix

## Best Practices

1. **Always check the result**: Don't assume messages were sent successfully
2. **Handle errors gracefully**: Don't fail the main operation if messaging fails
3. **Use appropriate message types**: SMS for notifications, WhatsApp for rich content
4. **Respect rate limits**: Twilio has sending limits
5. **Log for debugging**: Keep track of message IDs and errors
6. **Cost optimization**: Use `sendMinimalPaymentConfirmation` for lowest charges (under 80 chars)
7. **Message length**: SMS charges per 160 characters, keep messages short when possible

## Cost Optimization Tips

- **Minimal confirmations**: Use `sendMinimalPaymentConfirmation` for basic confirmations (₹0.5-1 per SMS)
- **SMS vs WhatsApp**: SMS is often cheaper for short messages
- **Character limits**: SMS: 160 chars per segment, WhatsApp: ~1600 chars for similar cost
- **Use abbreviations**: "₹" instead of "Rupees", "ID:" instead of "Transaction ID:"

## Testing

Use the test page at `/twilio-test` to verify your messaging setup and debug issues.
