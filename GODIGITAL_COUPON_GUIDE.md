# LASTMINUTE Coupon System

## Overview
The LASTMINUTE coupon system provides 100% discount on event registrations for eligible users. This system is case-insensitive and includes phone number validation to prevent duplicate redemptions.

## Features

### 🎫 Coupon Code
- **Code**: `LASTMINUTE` (case-insensitive)
- **Discount**: 100% (completely free)
- **Usage**: One-time per phone number
- **Valid for**: Event registrations only

### 🔒 Validation Rules
1. **Case Insensitive**: `LASTMINUTE`, `LASTMINUTE`, `LASTMINUTE` all work
2. **Phone Required**: Must provide a valid 10-digit Indian phone number
3. **Unique Phone**: Each phone number can only claim the coupon once
4. **Event Only**: Coupon only applies to event registrations (not memberships)

### 🚀 User Experience
1. User enters event registration form
2. Fills required details including phone number
3. Enters `LASTMINUTE` in coupon field
4. System validates and applies 100% discount
5. Amount becomes ₹0 (FREE)
6. Registration bypasses payment gateway
7. Direct registration via `/api/register-event`

## Technical Implementation

### Frontend (PaymentPage.tsx)
```typescript
// Coupon validation (case-insensitive)
if (couponCode.toUpperCase() !== 'LASTMINUTE') {
  showError('Invalid coupon code');
  return;
}

// Apply 100% discount
setFinalAmount(0);
setCouponApplied(true);
```

### Backend (register-event API)
```typescript
// Check for duplicate phone with LASTMINUTE coupon
const { data: existingCouponUser } = await supabase
  .from('attendees')
  .select('id, phone, coupon_code')
  .eq('phone', phone.trim())
  .eq('coupon_code', 'LASTMINUTE')
  .limit(1);

if (existingCouponUser && existingCouponUser.length > 0) {
  return NextResponse.json(
    { error: 'Phone number already used for LASTMINUTE coupon' },
    { status: 409 }
  );
}
```

### Database Schema
The `attendees` table should include these fields:
```sql
- coupon_code (VARCHAR) - Stores the coupon code used
- registration_type (VARCHAR) - 'free_coupon' or 'regular'
- amount_paid (DECIMAL) - Amount paid (0 for coupon users)
- phone (VARCHAR) - Required for coupon validation
```

## User Flow

### Successful Coupon Application
1. **Enter Details**: User fills form with valid phone number
2. **Apply Coupon**: Enter "LASTMINUTE" → System shows "100% discount applied"
3. **Submit**: Click "Register for FREE" button
4. **Validation**: Backend checks phone number uniqueness
5. **Success**: Registration completed, redirect to success page

### Error Scenarios
1. **Invalid Coupon**: "Invalid coupon code"
2. **Duplicate Phone**: "This phone number has already been used to claim the LASTMINUTE coupon"
3. **Missing Phone**: "Phone number is required for coupon redemption"
4. **Invalid Phone**: "Please enter a valid 10-digit Indian phone number"

## UI/UX Features

### Coupon Section
- Green-themed design for trust and success
- Real-time validation and feedback
- Loading states during validation
- Clear success/error messages
- Easy removal option

### Dynamic Button
- Changes from "Proceed to Payment" to "Register for FREE"
- Green color scheme when coupon applied
- Loading states with appropriate text

### Success Page
- Special messaging for coupon users
- Shows coupon details and registration ID
- Highlights free registration status

## Testing Scenarios

### Positive Tests
1. ✅ Apply "LASTMINUTE" with new phone number
2. ✅ Apply "LASTMINUTE" (lowercase) with new phone number
3. ✅ Apply "LASTMINUTE" (mixed case) with new phone number
4. ✅ Complete free registration successfully

### Negative Tests
1. ❌ Try "INVALID123" coupon code
2. ❌ Try LASTMINUTE with already used phone number
3. ❌ Try LASTMINUTE without phone number
4. ❌ Try LASTMINUTE with invalid phone format

## Monitoring & Analytics

### Key Metrics
- Total LASTMINUTE coupon redemptions
- Unique phone numbers used
- Conversion rate from coupon application to registration
- Error rates and types

### Database Queries
```sql
-- Count total LASTMINUTE redemptions
SELECT COUNT(*) FROM attendees WHERE coupon_code = 'LASTMINUTE';

-- Get all LASTMINUTE users
SELECT name, email, phone, created_at 
FROM attendees 
WHERE coupon_code = 'LASTMINUTE' 
ORDER BY created_at DESC;

-- Check for duplicate phone attempts
SELECT phone, COUNT(*) as attempts 
FROM attendees 
WHERE coupon_code = 'LASTMINUTE' 
GROUP BY phone 
HAVING COUNT(*) > 1;
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting on coupon validation
2. **Phone Validation**: Strict 10-digit Indian phone number format
3. **Case Insensitive**: Prevents user frustration with casing
4. **Unique Constraint**: Database-level phone uniqueness for coupon users
5. **Audit Trail**: All coupon usage logged with timestamps

## Support & Troubleshooting

### Common Issues
1. **"Coupon already claimed"**: User likely used different email with same phone
2. **"Invalid phone number"**: Must be 10-digit Indian format (6-9 prefix)
3. **"Coupon not working"**: Check for typos, ensure LASTMINUTE exactly

### Support Response
For duplicate phone issues:
> "Each phone number can only claim the LASTMINUTE coupon once. If you believe this is an error, please contact support with your phone number and we'll investigate."

## Future Enhancements

1. **Multiple Coupons**: Support for different coupon codes
2. **Percentage Discounts**: Not just 100% off
3. **Expiry Dates**: Time-limited coupons
4. **Usage Limits**: Maximum redemptions per coupon
5. **Admin Dashboard**: Manage coupons and view analytics
