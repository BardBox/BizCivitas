// Event Registration Demo
// This showcases the beautiful animated registration modal

import EventRegistrationButton from '@/components/EventRegistrationButton';

export default function RegistrationDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Event Registration System
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Click the button below to see the beautiful animated registration modal
          with form validation, toast notifications, and smooth animations.
        </p>
        
        <div className="space-y-4">
          <EventRegistrationButton
            eventName="BizCivitas Innovation Summit 2025"
            eventSlug="innovation-summit-2025"
            variant="primary"
            size="lg"
          />
          
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Features Included:</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>✨ Beautiful animated modal with framer-motion</li>
              <li>📝 Form validation with react-hook-form</li>
              <li>🎯 Direct Supabase integration</li>
              <li>🔔 Toast notifications for feedback</li>
              <li>📱 Responsive design</li>
              <li>🎨 Modern UI with Tailwind CSS</li>
              <li>⚡ Server-side API route</li>
              <li>🔒 Input validation and sanitization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
