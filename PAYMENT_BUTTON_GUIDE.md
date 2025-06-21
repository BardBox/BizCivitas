# Enhanced PaymentButton Component

The PaymentButton component has been enhanced to support color variants, custom text, and icon hover animations via props. This makes it highly flexible and reusable across different parts of the application.

## Features

- **Color Variants**: 7 predefined color schemes (primary, secondary, success, warning, danger, outline, ghost)
- **Custom Text**: Configurable button text via props
- **Icon Animation**: Smooth hover animations with scale and rotation effects
- **Multiple Icons**: Payment, cart, user, ticket icons or custom icons
- **Size Options**: Small, medium, large, and extra-large sizes
- **Loading States**: Built-in loading spinner and disabled states
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Modal Integration**: Opens payment form in a beautiful modal dialog

## Basic Usage

```tsx
import PaymentDialog from '@/components/PaymentButton';

// Basic usage with default styling
<PaymentDialog
  paymentData={{
    color: "#22c55e",
    amount: 8259,
    paidFor: "Bizcivitas Digital Membership",
    isEvent: false
  }}
  buttonText="Purchase Membership"
  variant="primary"
  size="lg"
  icon="user"
/>
```

## Props Reference

### PaymentDialogProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `paymentData` | `PaymentProps` | **required** | Payment configuration object |
| `trigger` | `React.ReactNode` | `undefined` | Custom trigger element (overrides default button) |
| `buttonText` | `string` | `"Make Payment"` | Text displayed on the button |
| `buttonClassName` | `string` | `undefined` | Custom CSS classes for the button |
| `variant` | `ButtonVariant` | `"primary"` | Color variant of the button |
| `size` | `ButtonSize` | `"md"` | Size of the button |
| `icon` | `IconType` | `"payment"` | Icon to display |
| `iconPosition` | `"left" \| "right"` | `"left"` | Position of the icon |
| `showIcon` | `boolean` | `true` | Whether to show the icon |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether to show loading state |
| `fullWidth` | `boolean` | `false` | Whether button should take full width |
| `animateIcon` | `boolean` | `true` | Whether to animate the icon on hover |

## Variants

### Color Variants

```tsx
// Primary (Blue gradient)
<PaymentDialog variant="primary" {...props} />

// Secondary (Gray gradient)
<PaymentDialog variant="secondary" {...props} />

// Success (Green gradient)
<PaymentDialog variant="success" {...props} />

// Warning (Yellow gradient)
<PaymentDialog variant="warning" {...props} />

// Danger (Red gradient)
<PaymentDialog variant="danger" {...props} />

// Outline (Transparent with border)
<PaymentDialog variant="outline" {...props} />

// Ghost (Transparent)
<PaymentDialog variant="ghost" {...props} />
```

### Sizes

```tsx
// Small
<PaymentDialog size="sm" {...props} />

// Medium (default)
<PaymentDialog size="md" {...props} />

// Large
<PaymentDialog size="lg" {...props} />

// Extra Large
<PaymentDialog size="xl" {...props} />
```

### Icons

```tsx
// Payment card icon
<PaymentDialog icon="payment" {...props} />

// Shopping cart icon
<PaymentDialog icon="cart" {...props} />

// User icon
<PaymentDialog icon="user" {...props} />

// Ticket icon
<PaymentDialog icon="ticket" {...props} />

// No icon
<PaymentDialog icon="none" {...props} />
```

## Pre-configured Components

For common use cases, use the pre-configured components:

```tsx
import { 
  MembershipPaymentButton, 
  EventRegistrationButton, 
  QuickPayButton, 
  PremiumPayButton 
} from '@/components/PaymentButton';

// Membership purchase (primary variant with user icon)
<MembershipPaymentButton paymentData={membershipData} />

// Event registration (success variant with ticket icon)
<EventRegistrationButton paymentData={eventData} />

// Quick payment (outline variant, small size)
<QuickPayButton paymentData={paymentData} />

// Premium purchase (large size with animation)
<PremiumPayButton paymentData={paymentData} />
```

## Custom Trigger

You can provide a custom trigger element instead of using the default button:

```tsx
const customTrigger = (
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-white cursor-pointer">
    <h3>Custom Payment Trigger</h3>
    <p>Click to pay</p>
  </div>
);

<PaymentDialog
  paymentData={paymentData}
  trigger={customTrigger}
/>
```

## States

### Loading State

```tsx
<PaymentDialog
  paymentData={paymentData}
  loading={true}
  buttonText="Processing..."
/>
```

### Disabled State

```tsx
<PaymentDialog
  paymentData={paymentData}
  disabled={true}
  buttonText="Unavailable"
/>
```

### Full Width

```tsx
<PaymentDialog
  paymentData={paymentData}
  fullWidth={true}
  buttonText="Purchase Now"
/>
```

## Advanced Customization

### Custom Styling

```tsx
<PaymentDialog
  paymentData={paymentData}
  buttonClassName="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
  showIcon={false}
  buttonText="Custom Styled Button"
/>
```

### Icon Animation Control

```tsx
// Animated icon (default)
<PaymentDialog icon="payment" animateIcon={true} {...props} />

// Static icon
<PaymentDialog icon="payment" animateIcon={false} {...props} />

// Icon on the right
<PaymentDialog icon="payment" iconPosition="right" {...props} />
```

## Payment Data Structure

```tsx
interface PaymentProps {
  color: string;        // Theme color for Razorpay
  amount: number;       // Amount in paise (₹82.59 = 8259)
  paidFor: string;      // Description of what is being paid for
  isEvent?: boolean;    // Whether this is an event payment
  onClose?: () => void; // Optional close callback
}
```

## Examples

### Membership Purchase

```tsx
<MembershipPaymentButton
  paymentData={{
    color: "#22c55e",
    amount: 8259,
    paidFor: "Bizcivitas Digital Membership",
    isEvent: false
  }}
  size="lg"
  buttonText="Join BizCivitas"
/>
```

### Event Registration

```tsx
<EventRegistrationButton
  paymentData={{
    color: "#3b82f6",
    amount: 1500,
    paidFor: "Business Networking Event",
    isEvent: true
  }}
  size="lg"
  buttonText="Register Now"
/>
```

### Custom Implementation

```tsx
<PaymentDialog
  paymentData={{
    color: "#8b5cf6",
    amount: 5000,
    paidFor: "Premium Workshop",
    isEvent: true
  }}
  variant="warning"
  size="xl"
  icon="ticket"
  iconPosition="right"
  animateIcon={true}
  fullWidth={false}
  buttonText="Book Premium Workshop"
/>
```

## Accessibility

The component includes:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## Browser Support

- Modern browsers with ES6+ support
- Mobile responsive design
- Touch-friendly interface
- Progressive enhancement

## Migration from Old PaymentButton

If you're migrating from the old `PaymentDialogButton`:

```tsx
// Old usage
<PaymentDialogButton paymentData={data} />

// New usage
<PaymentDialog paymentData={data} />

// Or use pre-configured components
<MembershipPaymentButton paymentData={data} />
```
