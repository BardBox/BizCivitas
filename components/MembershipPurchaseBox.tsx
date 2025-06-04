
"use client";

import { useState } from "react";
import { MembershipPlan } from "@/lib/memberships";

interface MembershipPurchaseBoxProps {
  membership: MembershipPlan;
}

export default function MembershipPurchaseBox({ membership }: MembershipPurchaseBoxProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    
    try {
      // TODO: Integrate with Razorpay
      // This is where you'll add Razorpay integration
      console.log("Initiating payment for:", {
        plan: membership.name,
        amount: membership.price.amount
      });
      
      // Placeholder for Razorpay integration
      alert(`Payment integration coming soon! You selected ${membership.name} plan.`);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
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
              <h4 className="font-semibold text-gray-800 mb-2">Investment Breakdown:</h4>
              {membership.price.breakdown.registration && (
                <div className="flex justify-between">
                  <span>Registration Fee:</span>
                  <span>₹{membership.price.breakdown.registration.toLocaleString()}</span>
                </div>
              )}
              {membership.price.breakdown.annual && (
                <div className="flex justify-between">
                  <span>Annual Membership:</span>
                  <span>₹{membership.price.breakdown.annual.toLocaleString()}</span>
                </div>
              )}
              {membership.price.breakdown.meeting && (
                <div className="flex justify-between">
                  <span>Meeting Fee:</span>
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

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
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

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Secure payment powered by Razorpay
          </p>
          <div className="mt-2 space-y-1 text-xs text-gray-600">
            <p>📞 +91 81606 79917</p>
            <p>📩 info@bizcivitas.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
