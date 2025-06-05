'use client';

import EventRegistrationButton from '@/components/EventRegistrationButton';
import { ToastContainer, useToast } from '@/components/Toast';

export default function TestRegistration() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Registration System Test</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Primary Variant</h3>
                <EventRegistrationButton 
                  eventName="BizCivitas Networking Event" 
                  eventSlug="networking-event"
                  variant="primary" 
                  size="md"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Secondary Variant</h3>
                <EventRegistrationButton 
                  eventName="Business Workshop" 
                  eventSlug="business-workshop"
                  variant="secondary" 
                  size="md"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Orange Variant</h3>
                <EventRegistrationButton 
                  eventName="Leadership Summit" 
                  eventSlug="leadership-summit"
                  variant="orange" 
                  size="md"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Orange Rounded Variant</h3>
                <EventRegistrationButton 
                  eventName="Innovation Conference" 
                  eventSlug="innovation-conference"
                  variant="orange-rounded" 
                  size="md"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Small Size</h3>
                <EventRegistrationButton 
                  eventName="Small Event" 
                  eventSlug="small-event"
                  variant="primary" 
                  size="sm"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Medium Size</h3>
                <EventRegistrationButton 
                  eventName="Medium Event" 
                  eventSlug="medium-event"
                  variant="primary" 
                  size="md"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Large Size</h3>
                <EventRegistrationButton 
                  eventName="Large Event" 
                  eventSlug="large-event"
                  variant="primary" 
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Click any button to test the registration modal with mobile-responsive design and bottom toast notifications.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Features Implemented:</strong>
            </p>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>✅ Toast notifications moved to bottom position</li>
              <li>✅ Modal overflow handling fixed for mobile</li>
              <li>✅ Responsive grid layout and mobile-friendly forms</li>
              <li>✅ Orange color variants with border radius options</li>
              <li>✅ Hero section buttons replaced with EventRegistrationButton</li>
              <li>✅ Mobile form filling without overflow issues</li>
            </ul>
          </div>
        </div>
      </div>
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
