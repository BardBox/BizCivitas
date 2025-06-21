import { MembershipPaymentButton } from '@/components/PaymentButton';
import Link from 'next/link';

export default function TestLinksPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        BizCivitas Test Pages
                    </h1>
                    <p className="text-xl text-gray-600">
                        Development and testing interfaces
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Twilio Test */}
                    <Link href="/twilio-test" className="group">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 ml-4">Twilio Test</h2>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Send SMS and WhatsApp messages through Twilio API. Test message delivery, check configuration, and debug issues.
                            </p>
                            <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                                <span className="font-medium">Open Test Interface</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Payment Button Demo */}
                    <Link href="/payment-button-demo" className="group">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 ml-4">Payment Button Demo</h2>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Showcase of enhanced PaymentButton component with color variants, custom text, and icon animations.
                            </p>
                            <div className="flex items-center text-green-600 group-hover:text-green-800">
                                <span className="font-medium">View Demo</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* WhatsApp Setup Guide */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 ml-4">WhatsApp Setup</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            WhatsApp messaging requires additional setup in Twilio Console:
                        </p>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p>1. Enable WhatsApp in Twilio Console</p>
                            <p>2. Use Sandbox for testing</p>
                            <p>3. Join sandbox: Send "join [keyword]" to your Twilio WhatsApp number</p>
                            <p>4. For production: Get Meta Business verification</p>
                        </div>
                    </div>

                    {/* API Endpoints */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 ml-4">API Endpoints</h2>
                        </div>
                        <p className="text-gray-600 mb-4">Available API endpoints for testing:</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">/api/twilio/sendmessage</span>
                                <span className="text-green-600 font-medium">POST</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">/api/register-event</span>
                                <span className="text-green-600 font-medium">POST</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">/api/razorpay/create-order</span>
                                <span className="text-green-600 font-medium">POST</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <MembershipPaymentButton
                        paymentData={{
                            color: "#EB5E15",
                            amount: 1,
                            paidFor: "Bizcivitas Digital Membership",
                            isEvent: true,
                        }}
                        buttonText="Purchase Digital Membership"
                        size="lg"
                        fullWidth={false}
                        animateIcon={true}
                    />
                </div>
                {/* Environment Variables Check */}
                <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-yellow-800">Environment Variables Required</h3>
                    </div>
                    <div className="text-sm text-yellow-700 space-y-1">
                        <p>• <code className="bg-yellow-100 px-2 py-1 rounded">TWILIO_ACCOUNT_SID</code> - Your Twilio Account SID</p>
                        <p>• <code className="bg-yellow-100 px-2 py-1 rounded">TWILIO_AUTH_TOKEN</code> - Your Twilio Auth Token</p>
                        <p>• <code className="bg-yellow-100 px-2 py-1 rounded">TWILIO_PHONE_NUMBER</code> - Your Twilio Phone Number</p>
                        <p>• <code className="bg-yellow-100 px-2 py-1 rounded">RAZORPAY_KEY_ID</code> - Razorpay Key ID</p>
                        <p>• <code className="bg-yellow-100 px-2 py-1 rounded">RAZORPAY_KEY_SECRET</code> - Razorpay Key Secret</p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
