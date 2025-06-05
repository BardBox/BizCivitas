# Event Registration System

A beautiful, animated event registration modal built with Next.js, React Hook Form, Framer Motion, and Supabase.

## Features

### 🎨 Beautiful UI/UX
- Animated modal with smooth transitions using Framer Motion
- Gradient backgrounds with floating particles
- Responsive design that works on all devices
- Modern card-based layout with glassmorphism effects

### 📝 Form Management
- Built with React Hook Form for optimal performance
- Real-time validation with custom error messages
- Required and optional fields with proper validation
- Phone number and email format validation

### 🔔 User Feedback
- Toast notification system for success/error messages
- Loading states with animated spinners
- Form submission feedback
- Auto-closing modal after successful registration

### 🚀 Performance & Security
- Server-side API route for secure data handling
- Input sanitization and validation
- Duplicate email detection
- Error handling with meaningful messages

### ♿ Accessibility
- Keyboard navigation support (ESC to close)
- ARIA labels and semantic HTML
- Focus management
- Screen reader friendly

## Database Schema

The registration system uses the following Supabase table:

```sql
create table attendees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  email text not null,
  phone text,
  reason_to_attend text,
  created_at timestamp with time zone default now()
);
```

## Usage

### Basic Implementation

```tsx
import EventRegistrationButton from '@/components/EventRegistrationButton';

export default function EventPage() {
  return (
    <EventRegistrationButton
      eventName="Your Event Name"
      eventSlug="your-event-slug"
      variant="primary"
      size="md"
    />
  );
}
```

### Button Variants

- `primary`: Gradient blue-to-purple button with white text
- `secondary`: White button with border and dark text

### Button Sizes

- `sm`: Small button (px-4 py-2 text-sm)
- `md`: Medium button (px-6 py-3 text-base)
- `lg`: Large button (px-8 py-4 text-lg)

## API Endpoint

The registration system includes a secure API endpoint at `/api/register-event` that:

1. Validates required fields (name, email)
2. Sanitizes input data
3. Checks for duplicate email addresses
4. Inserts data into Supabase
5. Returns appropriate success/error responses

## Components

### EventRegistrationButton
- Animated button with hover effects
- Shimmer and sparkle animations
- Opens the registration modal

### EventRegistrationModal
- Full-screen overlay with backdrop blur
- Animated form fields with icons
- Real-time validation
- Success/error states
- Toast notifications

### Toast System
- Four toast types: success, error, warning, info
- Auto-dismiss with customizable duration
- Smooth enter/exit animations
- Stackable notifications

## Animations

The system includes various animations:

- **Modal entrance**: Scale and fade animation
- **Form fields**: Staggered entrance animations
- **Button interactions**: Hover and tap feedback
- **Loading states**: Smooth spinner animations
- **Success feedback**: Celebration animations
- **Background effects**: Floating particles and gradients

## Styling

Built with Tailwind CSS featuring:
- Responsive design patterns
- Custom gradient backgrounds
- Smooth transitions
- Shadow and blur effects
- Modern color palette

## Integration

The registration system is integrated into the events page at `/events/[slug]` and appears only for upcoming events, maintaining the ISR (Incremental Static Regeneration) setup for optimal performance.

## Customization

The system is highly customizable:
- Modify colors in `tailwind.config.js`
- Adjust animations in component props
- Add new form fields by updating the schema and components
- Customize validation rules in the form configuration
