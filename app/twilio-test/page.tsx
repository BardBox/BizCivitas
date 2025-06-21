'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TwilioConfig {
  configured: boolean;
  phoneNumber: string | null;
  accountSid: string | null;
}

interface MessageResult {
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

export default function TwilioTestPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'sms' | 'whatsapp'>('sms');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MessageResult | null>(null);
  const [twilioConfig, setTwilioConfig] = useState<TwilioConfig | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(false);

  // Check Twilio configuration
  const checkConfig = async () => {
    setLoadingConfig(true);
    try {
      const response = await fetch('/api/twilio/sendmessage', {
        method: 'GET'
      });
      const config = await response.json();
      setTwilioConfig(config);
    } catch (error) {
      console.error('Failed to check Twilio config:', error);
    } finally {
      setLoadingConfig(false);
    }
  };

  // Send message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !message) {
      setResult({
        success: false,
        error: 'Phone number and message are required'
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/twilio/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message,
          type: messageType
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear form
  const clearForm = () => {
    setPhoneNumber('');
    setMessage('');
    setResult(null);
  };

  // Load predefined messages
  const loadSampleMessage = (type: 'welcome' | 'test' | 'otp' | 'sandbox' | 'comprehensive' | 'quick-package' | 'minimal') => {
    const messages = {
      welcome: 'Welcome to BizCivitas! Thank you for joining our community of innovative entrepreneurs and business leaders.',
      test: 'This is a test message from BizCivitas. If you received this, our Twilio integration is working correctly!',
      otp: 'Your BizCivitas verification code is: 123456. This code is valid for 10 minutes. Do not share this code with anyone.',
      sandbox: 'Hello! This is a test message from BizCivitas WhatsApp Sandbox. If you receive this, your sandbox setup is working perfectly! 🎉',
      comprehensive: `🎉 Welcome John Doe to BizCivitas!

Thank you for joining India's premier entrepreneurial community! You're now part of a network of innovative business leaders, visionary entrepreneurs, and industry experts.

💳 PAYMENT CONFIRMED
Amount: ₹1770
Plan: Digital Membership
Transaction ID: TXN123456

📅 EVENT REGISTRATION CONFIRMED
Event: Business Networking Summit
Date: December 25, 2024
Venue: Taj Hotel, Mumbai

🌟 YOUR MEMBERSHIP BENEFITS:
• Access to exclusive networking events
• Industry insights & market intelligence
• Mentorship opportunities with industry leaders
• Business collaboration opportunities
• Priority access to workshops & seminars
• Digital resources & business tools

🚀 WHAT'S NEXT?
• Check your email for detailed event information
• Join our WhatsApp community for updates
• Follow us on LinkedIn for industry insights
• Download the BizCivitas mobile app

📞 NEED HELP?
WhatsApp: +91 98765 43210
Email: support@bizcivitas.com
Website: www.bizcivitas.com

Ready to transform your business journey? Let's build something extraordinary together! 🚀

#BizCivitas #Entrepreneurship #BusinessNetworking #Innovation`,
      'quick-package': `🎉 Welcome John Doe to BizCivitas!

✅ Payment confirmed: ₹1770 (ID: TXN123456)
📅 Registered for: Business Networking Summit

🌟 You're now part of India's premier business community!

What you get:
• Exclusive networking events
• Industry insights
• Mentorship opportunities
• Business collaborations

📧 Check your email for complete details
📱 Join our WhatsApp community for updates

Need help? WhatsApp: +91 98765 43210

Let's build something extraordinary! 🚀`,
      minimal: '✅ Paid ₹1770 | ID:xyz123 | BizCivitas | Thanks!'
    };
    setMessage(messages[type]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Twilio Message Test
          </h1>
          <p className="text-xl text-gray-600">
            Send SMS and WhatsApp messages through Twilio API
          </p>
        </div>

        {/* Twilio Configuration Status */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Twilio Configuration</h2>
            <button
              onClick={checkConfig}
              disabled={loadingConfig}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loadingConfig ? 'Checking...' : 'Check Config'}
            </button>
          </div>
          
          {twilioConfig && (
            <div className="space-y-2">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${twilioConfig.configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-medium ${twilioConfig.configured ? 'text-green-700' : 'text-red-700'}`}>
                  {twilioConfig.configured ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              {twilioConfig.phoneNumber && (
                <p className="text-gray-600">Phone Number: {twilioConfig.phoneNumber}</p>
              )}
              {twilioConfig.accountSid && (
                <p className="text-gray-600">Account SID: {twilioConfig.accountSid}</p>
              )}
            </div>
          )}
        </div>

        {/* Message Form */}
        {/* WhatsApp Requirements Notice */}
        {messageType === 'whatsapp' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-2">WhatsApp Requirements:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Your Twilio phone number must be WhatsApp-enabled</li>
                  <li>• Target phone number must have WhatsApp installed</li>
                  <li>• For testing, use your WhatsApp-verified sandbox number</li>
                  <li>• Production requires business verification with Meta</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Send Message</h2>
            <p className="text-blue-100">Test your Twilio integration</p>
          </div>

          <form onSubmit={sendMessage} className="p-8 space-y-6">
            {/* Message Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="sms"
                    checked={messageType === 'sms'}
                    onChange={(e) => setMessageType(e.target.value as 'sms')}
                    className="mr-2"
                  />
                  <span className="text-gray-700">SMS</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="whatsapp"
                    checked={messageType === 'whatsapp'}
                    onChange={(e) => setMessageType(e.target.value as 'whatsapp')}
                    className="mr-2"
                  />
                  <span className="text-gray-700">WhatsApp</span>
                </label>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+919876543210 or 9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter with country code (e.g., +919876543210) or without (+91 will be added automatically)
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Characters: {message.length}/1600
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => loadSampleMessage('test')}
                    className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 bg-blue-50 rounded"
                  >
                    Test Message
                  </button>
                  {messageType === 'whatsapp' && (
                    <>
                      <button
                        type="button"
                        onClick={() => loadSampleMessage('sandbox')}
                        className="text-sm text-green-600 hover:text-green-800 px-2 py-1 bg-green-50 rounded"
                      >
                        Sandbox Test
                      </button>
                      <button
                        type="button"
                        onClick={() => loadSampleMessage('comprehensive')}
                        className="text-sm text-purple-600 hover:text-purple-800 px-2 py-1 bg-purple-50 rounded"
                      >
                        Comprehensive
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => loadSampleMessage('welcome')}
                    className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 bg-blue-50 rounded"
                  >
                    Welcome
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleMessage('otp')}
                    className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 bg-blue-50 rounded"
                  >
                    OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleMessage('quick-package')}
                    className="text-sm text-orange-600 hover:text-orange-800 px-2 py-1 bg-orange-50 rounded"
                  >
                    Quick Package
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleMessage('minimal')}
                    className="text-sm text-red-600 hover:text-red-800 px-2 py-1 bg-red-50 rounded"
                  >
                    Minimal (Lowest Cost)
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading || !phoneNumber || !message}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  `Send ${messageType.toUpperCase()}`
                )}
              </button>
              
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-xl border-l-4 ${
              result.success 
                ? 'bg-green-50 border-green-500' 
                : 'bg-red-50 border-red-500'
            }`}
          >
            <div className="flex items-center mb-4">
              {result.success ? (
                <div className="flex items-center text-green-700">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">Message Sent Successfully!</span>
                </div>
              ) : (
                <div className="flex items-center text-red-700">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-semibold">Message Failed</span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              {result.success ? (
                <>
                  {result.sid && <p><strong>Message ID:</strong> {result.sid}</p>}
                  {result.status && <p><strong>Status:</strong> {result.status}</p>}
                  {result.to && <p><strong>To:</strong> {result.to}</p>}
                  {result.from && <p><strong>From:</strong> {result.from}</p>}
                  {result.type && <p><strong>Type:</strong> {result.type.toUpperCase()}</p>}
                  {result.dateCreated && <p><strong>Sent:</strong> {new Date(result.dateCreated).toLocaleString()}</p>}
                  {result.price && <p><strong>Cost:</strong> {result.price} {result.priceUnit}</p>}
                </>
              ) : (
                <>
                  <p className="text-red-700"><strong>Error:</strong> {result.error}</p>
                  {result.code && <p><strong>Error Code:</strong> {result.code}</p>}
                  {result.moreInfo && (
                    <p>
                      <strong>More Info:</strong> 
                      <a href={result.moreInfo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                        {result.moreInfo}
                      </a>
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions & Troubleshooting</h3>
          
          {/* SMS Instructions */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2">SMS Testing:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Use international format (+919876543210) or Indian format (9876543210)</p>
              <p>• Test messages are limited by your Twilio account balance and rate limits</p>
              <p>• Check Twilio console for detailed delivery status and logs</p>
              <p>• Use "Quick Package" sample for comprehensive SMS messages</p>
            </div>
          </div>

          {/* WhatsApp Instructions */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2">WhatsApp Testing:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• <strong>Sandbox Mode:</strong> Use Twilio WhatsApp Sandbox for testing</p>
              <p>• <strong>Phone Number:</strong> Must be WhatsApp-enabled in Twilio Console</p>
              <p>• <strong>Recipient:</strong> Must have WhatsApp installed and verified</p>
              <p>• <strong>24-hour Window:</strong> Can only send messages within 24 hours of user interaction</p>
              <p>• <strong>Production:</strong> Requires Meta Business verification and approved templates</p>
              <p>• <strong>Comprehensive Messages:</strong> Use "Comprehensive" sample for rich content with benefits, tips, and contact info</p>
            </div>
          </div>

          {/* Common Issues */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Common WhatsApp Issues:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• <strong>Error 63016:</strong> Recipient doesn't have WhatsApp or number not verified</p>
              <p>• <strong>Error 63017:</strong> Your WhatsApp Business Account not approved</p>
              <p>• <strong>Error 21610:</strong> Message sent outside 24-hour window</p>
              <p>• <strong>Sandbox Setup:</strong> Join sandbox by sending "join [sandbox-keyword]" to your Twilio WhatsApp number</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
