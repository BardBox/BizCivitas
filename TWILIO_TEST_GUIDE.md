# Twilio Test Page

A comprehensive test interface for sending SMS and WhatsApp messages through Twilio integration.

## Features

- **SMS and WhatsApp Support**: Toggle between SMS and WhatsApp message types
- **Configuration Checker**: Verify Twilio credentials and settings
- **Sample Messages**: Pre-loaded messages for quick testing
- **Real-time Results**: Detailed response information including message ID, status, and costs
- **Error Handling**: Comprehensive error reporting with Twilio error codes
- **Phone Number Validation**: Supports both international (+91...) and local (98...) formats

## Access

Visit `/twilio-test` to access the test interface.

## Environment Variables Required

```env
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
```

## API Endpoint

The test page uses `/api/twilio/sendmessage` which supports:

### POST Request
```json
{
  "to": "+919876543210",
  "message": "Your message here",
  "type": "sms" // or "whatsapp"
}
```

### GET Request
Returns Twilio configuration status (masked for security).

## Testing Tips

1. **SMS Testing**: Use any valid phone number
2. **WhatsApp Testing**: Number must be WhatsApp-enabled in Twilio console
3. **International Format**: +919876543210 (recommended)
4. **Local Format**: 9876543210 (+91 will be added automatically)

## Error Codes

Common Twilio error codes and their meanings:
- `21211`: Invalid phone number
- `21614`: Phone number not valid for SMS
- `21408`: Permission not enabled for this number
- `20003`: Authentication error
- `20429`: Rate limit exceeded

## Sample Messages

The interface includes three sample message types:
- **Test Message**: Basic connectivity test
- **Welcome Message**: User onboarding
- **OTP Message**: Verification code example
