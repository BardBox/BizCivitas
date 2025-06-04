"use client";

import { useState } from "react";
import { MembershipPlan } from "@/lib/memberships";
import { PhoneIcon, EmailIcon, WebsiteIcon } from "./Icons";

interface MembershipPurchaseBoxProps {
  membership: MembershipPlan;
}

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function MembershipPurchaseBox({ membership }: MembershipPurchaseBoxProps) {
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async (paymentType?: 'registration' | 'annual' | 'meeting' | 'community', amount?: number) => {
    setIsLoading(true);

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setIsLoading(false);
        return;
      }

      // Determine payment amount and description
      let paymentAmount = amount || membership.price.amount;
      let paymentDescription = membership.name;

      if (paymentType && membership.price.breakdown) {
        switch (paymentType) {
          case 'registration':
            paymentAmount = membership.price.breakdown.registration || 0;
            paymentDescription = `${membership.name} - Registration Fee`;
            break;
          case 'annual':
            paymentAmount = membership.price.breakdown.annual || 0;
            paymentDescription = `${membership.name} - Annual Membership`;
            break;
          case 'meeting':
            paymentAmount = membership.price.breakdown.meeting || 0;
            paymentDescription = `${membership.name} - Meeting Fee`;
            break;
          case 'community':
            paymentAmount = (membership.price.breakdown as any).community || 0;
            paymentDescription = `${membership.name} - Community Launch Fee`;
            break;
        }
      }

      // Create order on backend
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentAmount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          membershipId: membership.id,
          membershipName: membership.name,
          paymentType: paymentType || 'full',
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'BizCivitas',
        description: paymentDescription,
        order_id: orderData.id,
        handler: function (response: any) {
          // Payment successful
          console.log('Payment successful:', response);

          // Redirect to success page with payment details
          const params = new URLSearchParams({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            membership: membership.name,
            payment_type: paymentType || 'full',
          });

          window.location.href = `/memberships/success?${params.toString()}`;
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          membership_id: membership.id,
          membership_name: membership.name,
          payment_type: paymentType || 'full',
        },
        theme: {
          color: membership.color.primary,
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
        setIsLoading(false);
      });

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initialization failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="sticky top-8">
      <div 
        className="bg-white rounded-2xl shadow-lg border-2 p-8"
        style={{ borderColor: membership.color.primary }}
      >
        {membership.popularBadge && (
          <div 
            className="text-center text-white px-4 py-2 rounded-lg mb-6 font-semibold"
            style={{ backgroundColor: membership.color.primary }}
          >
            {membership.popularBadge}
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{membership.name}</h3>
          <p className="text-gray-600">{membership.tagline}</p>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-4" style={{ color: membership.color.primary }}>
            {membership.price.currency}{membership.price.amount.toLocaleString()}
          </div>

          {/* Price Breakdown */}
          {membership.price.breakdown && (
            <div className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">💰 Membership Investment:</h4>
              {membership.price.breakdown.registration && (
                <div className="flex justify-between">
                  <span>One-time Registration Fee:</span>
                  <span>₹{membership.price.breakdown.registration.toLocaleString()}</span>
                </div>
              )}
              {membership.price.breakdown.annual && (
                <div className="flex justify-between">
                  <span>Annual Membership Fee:</span>
                  <span>₹{membership.price.breakdown.annual.toLocaleString()}</span>
                </div>
              )}
              {membership.price.breakdown.meeting && (
                <div className="flex justify-between">
                  <span>Annual Meeting Fee:</span>
                  <span>₹{membership.price.breakdown.meeting.toLocaleString()}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total Investment:</span>
                <span>₹{membership.price.amount.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Eligibility Requirements (for Industria) */}
        {membership.eligibility && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Eligibility Requirements:</h4>
            <ul className="space-y-2">
              {membership.eligibility.map((requirement, index) => (
                <li key={index} className="flex items-start text-sm">
                  <div 
                    className="w-4 h-4 rounded-full mr-2 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: membership.color.primary }}
                  >
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Features Preview */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
          <ul className="space-y-2">
            {membership.features.slice(0, 5).map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <div 
                  className="w-4 h-4 rounded-full mr-2 flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: membership.color.primary }}
                >
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
            {membership.features.length > 5 && (
              <li className="text-sm text-gray-500 ml-6">
                +{membership.features.length - 5} more benefits...
              </li>
            )}
          </ul>
        </div>

        {/* Payment Buttons */}
        {membership.price.breakdown && (membership.id === 'industria' || membership.id === 'flagship') ? (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Choose Payment Option:</h4>

            {/* Three Payment Cards for Industria */}
            <div className="grid grid-cols-1 gap-4">
              {/* One-Time Registration Fees Card */}
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                <div className="text-center">
                  <h5 className="text-lg font-bold text-orange-800 mb-2">One-Time Registration Fees</h5>
                  <p className="text-sm text-orange-700 mb-3">
                    A non-refundable fee for onboarding and activating your BizCivitas membership.
                  </p>
                  <div className="text-sm text-orange-600 mb-2">
                    ₹25,000 + ₹4,500 (18% GST)
                  </div>
                  <div className="text-xl font-bold text-orange-800 mb-3">
                    Total: ₹29,500
                  </div>
                  <button
                    onClick={() => handlePurchase('registration', 29500)}
                    disabled={isLoading}
                    className="w-full bg-white text-orange-600 border-2 border-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>

              {/* Membership Fees Card */}
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                <div className="text-center">
                  <h5 className="text-lg font-bold text-orange-800 mb-2">Membership Fees</h5>
                  <p className="text-sm text-orange-700 mb-3">
                    An annual subscription fee granting access to exclusive BizCivitas communities, events, and benefits.
                  </p>
                  <div className="text-sm text-orange-600 mb-2">
                    ₹3,00,000 + ₹54,000 (18% GST)
                  </div>
                  <div className="text-xl font-bold text-orange-800 mb-3">
                    Total: ₹3,54,000
                  </div>
                  <button
                    onClick={() => handlePurchase('annual', 354000)}
                    disabled={isLoading}
                    className="w-full bg-white text-orange-600 border-2 border-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>

              {/* Meeting/Event Fees Card */}
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                <div className="text-center">
                  <h5 className="text-lg font-bold text-orange-800 mb-2">Meeting/Event Fees</h5>
                  <p className="text-sm text-orange-700 mb-3">
                    A recurring charge for attending structured BizCivitas networking meetings and events.
                  </p>
                  <div className="text-sm text-orange-600 mb-2">
                    ₹25,000 + ₹4,500 (18% GST)
                  </div>
                  <div className="text-xl font-bold text-orange-800 mb-3">
                    Total: ₹29,500
                  </div>
                  <button
                    onClick={() => handlePurchase('meeting', 29500)}
                    disabled={isLoading}
                    className="w-full bg-white text-orange-600 border-2 border-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : membership.price.breakdown && membership.id === 'flagship' ? (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Choose Payment Option:</h4>

            {/* Four Payment Cards for Flagship */}
            <div className="grid grid-cols-1 gap-4">
              {/* One-Time Registration Fees Card */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="text-center">
                  <h5 className="text-lg font-bold text-purple-800 mb-2">One-Time Registration Fees</h5>
                  <p className="text-sm text-purple-700 mb-3">
                    A non-refundable fee for onboarding and activating your Bizcivitas membership.
                  </p>
                  <div className="text-sm text-purple-600 mb-2">
                    ₹25,000 + ₹4,500 (18% GST)
                  </div>
                  <div className="text-xl font-bold text-purple-800 mb-3">
                    Total: ₹29,500
                  </div>
                  <button
                    onClick={() => handlePurchase('registration', 29500)}
                    disabled={isLoading}
                    className="w-full bg-white text-purple-600 border-2 border-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>

              {/* Membership Fees Card */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="text-center">
                  <h5 className="text-lg font-bold text-purple-800 mb-2">Membership Fees</h5>
                  <p className="text-sm text-purple-700 mb-3">
                    An annual subscription fee granting access to exclusive Bizcivitas communities, events, and benefits.
                  </p>
                  <div className="text-sm text-purple-600 mb-2">
                    ₹3,00,000 + ₹54,000 (18% GST)
                  </div>
                  <div className="text-xl font-bold text-purple-800 mb-3">
                    Total: ₹3,54,000
                  </div>
                  <button
                    onClick={() => handlePurchase('annual', 354000)}
                    disabled={isLoading}
                    className="w-full bg-white text-purple-600 border-2 border-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>

              {/* Meeting/Event Fees Card */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="text-center">
                  <h5 className="text-lg font-bold text-purple-800 mb-2">Meeting/Event Fees</h5>
                  <p className="text-sm text-purple-700 mb-3">
                    A recurring charge for attending structured Bizcivitas networking meetings and events.
                  </p>
                  <div className="text-sm text-purple-600 mb-2">
                    ₹25,000 + ₹4,500 (18% GST)
                  </div>
                  <div className="text-xl font-bold text-purple-800 mb-3">
                    Total: ₹29,500
                  </div>
                  <button
                    onClick={() => handlePurchase('meeting', 29500)}
                    disabled={isLoading}
                    className="w-full bg-white text-purple-600 border-2 border-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>

              {/* Community Launch Fees Card */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="text-center">
                  <h5 className="text-lg font-bold text-purple-800 mb-2">Community Launch Fees</h5>
                  <p className="text-sm text-purple-700 mb-3">
                    Core member frees for launching community (Valid for 2 years)
                  </p>
                  <div className="text-sm text-purple-600 mb-2">
                    ₹3,00,000 + ₹54,000 (18% GST)
                  </div>
                  <div className="text-xl font-bold text-purple-800 mb-3">
                    Total: ₹3,54,000
                  </div>
                  <button
                    onClick={() => handlePurchase('community', 354000)}
                    disabled={isLoading}
                    className="w-full bg-white text-purple-600 border-2 border-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : membership.price.breakdown && (membership.id === 'core') ? (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Choose Payment Option:</h4>

            {/* Registration Fee */}
            {membership.price.breakdown.registration && (
              <button
                onClick={() => handlePurchase('registration', membership.price.breakdown!.registration)}
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2"
                style={{ 
                  borderColor: membership.color.primary,
                  color: membership.color.primary,
                  backgroundColor: 'white'
                }}
              >
                Pay Registration Fee - ₹{membership.price.breakdown.registration.toLocaleString()}
              </button>
            )}

            {/* Annual Membership Fee */}
            {membership.price.breakdown.annual && (
              <button
                onClick={() => handlePurchase('annual', membership.price.breakdown!.annual)}
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2"
                style={{ 
                  borderColor: membership.color.primary,
                  color: membership.color.primary,
                  backgroundColor: 'white'
                }}
              >
                Pay Annual Membership - ₹{membership.price.breakdown.annual.toLocaleString()}
              </button>
            )}

            {/* Meeting Fee */}
            {membership.price.breakdown.meeting && (
              <button
                onClick={() => handlePurchase('meeting', membership.price.breakdown!.meeting)}
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2"
                style={{ 
                  borderColor: membership.color.primary,
                  color: membership.color.primary,
                  backgroundColor: 'white'
                }}
              >
                Pay Meeting Fee - ₹{membership.price.breakdown.meeting.toLocaleString()}
              </button>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Full Payment */}
            <button
              onClick={() => handlePurchase()}
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: membership.color.primary,
                color: 'white'
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Pay Full Amount - ₹${membership.price.amount.toLocaleString()}`
              )}
            </button>
          </div>
        ) : (
          /* Single Payment Button for Digital */
          <button
            onClick={() => handlePurchase()}
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: membership.color.primary,
              color: 'white'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              membership.ctaText
            )}
          </button>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Secure payment powered by Razorpay
          </p>
          <div className="mt-2 space-y-1 text-xs text-gray-600">
            {/* Contact Info for all memberships */}
                <div className="space-y-1 text-xs text-gray-600">
                  <p className="flex items-center justify-center">
                    <PhoneIcon className="mr-2" size={14} />
                    {membership.id === 'digital' || membership.id === 'industria' ? '+91 81606 79917' : '+91 80000 23786'}
                  </p>
                  <p className="flex items-center justify-center">
                    <EmailIcon className="mr-2" size={14} />
                    info@bizcivitas.com
                  </p>
                  <p className="flex items-center justify-center">
                    <WebsiteIcon className="mr-2" size={14} />
                    www.bizcivitas.com
                  </p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}