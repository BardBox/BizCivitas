# WhatsApp Messaging Troubleshooting Guide

## Why WhatsApp isn't working while SMS works fine

WhatsApp messaging through Twilio has additional requirements compared to SMS:

## 1. **Twilio WhatsApp Setup Required**

### For Testing (Sandbox):
1. Go to Twilio Console → Messaging → Try it out → Send a WhatsApp message
2. Note your sandbox WhatsApp number (usually starts with +1 415...)
3. Send `join [your-sandbox-keyword]` to this number from your WhatsApp
4. You'll receive a confirmation message

### For Production:
1. WhatsApp Business Account verification with Meta
2. Approved message templates
3. Business verification process (can take weeks)

## 2. **Common Error Codes**

- **63016**: Recipient doesn't have WhatsApp or not in sandbox
- **63017**: WhatsApp Business Account not approved
- **21610**: Message outside 24-hour window
- **63018**: Template message failed

## 3. **Environment Variables**

Make sure your `TWILIO_PHONE_NUMBER` is WhatsApp-enabled:

```env
# For sandbox testing
TWILIO_PHONE_NUMBER=+14155238886  # Example sandbox number

# For production  
TWILIO_PHONE_NUMBER=+919876543210  # Your verified WhatsApp Business number
```

## 4. **Testing Steps**

### Step 1: Verify Sandbox Setup
1. Send `join [keyword]` to your Twilio WhatsApp sandbox number
2. You should receive: "Connected to sandbox"

### Step 2: Test from Sandbox
Use the test page with:
- **Type**: WhatsApp
- **Number**: Your WhatsApp number (that joined sandbox)
- **Message**: "Hello from BizCivitas!"

### Step 3: Check Logs
1. Go to Twilio Console → Monitor → Logs → Errors
2. Look for WhatsApp-specific error codes

## 5. **Common Issues & Solutions**

### Issue: "WhatsApp message failed"
**Solution**: 
- Ensure recipient joined sandbox
- Use sandbox number as sender
- Check 24-hour messaging window

### Issue: "Phone number not verified"
**Solution**:
- For testing: Use sandbox mode
- For production: Complete Meta Business verification

### Issue: "Template message failed"
**Solution**:
- In sandbox: Use freeform messages
- In production: Use approved templates only

## 6. **Sandbox Limitations**

- Only pre-approved phone numbers can receive messages
- 24-hour messaging window after user interaction
- Limited to development/testing only
- Cannot send messages to unverified numbers

## 7. **Production Requirements**

- Meta Business Manager account
- WhatsApp Business Account verification
- Approved message templates
- Phone number verification
- Can take 2-8 weeks for approval

## 8. **Testing with BizCivitas**

1. Visit `/twilio-test`
2. Select "WhatsApp" message type
3. Enter your WhatsApp number (that joined sandbox)
4. Send test message
5. Check for detailed error messages

## 9. **Quick Sandbox Setup**

1. **Get Sandbox Number**: Check Twilio Console → Messaging → Try it out
2. **Join Sandbox**: Send `join [keyword]` from your WhatsApp
3. **Test**: Use `/twilio-test` page with WhatsApp option
4. **Verify**: Check message delivery and logs

## 10. **Debug Commands**

Use the test page to check:
- Twilio configuration status
- WhatsApp-specific error codes
- Message delivery status
- Sandbox connection status

If SMS works but WhatsApp doesn't, it's almost always a sandbox setup or verification issue.
