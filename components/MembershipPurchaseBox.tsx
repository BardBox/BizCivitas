
"use client";

import { useState } from "react";
import { MembershipPlan } from "@/lib/memberships";

interface MembershipPurchaseBoxProps {
  membership: MembershipPlan;
}

export default function MembershipPurchaseBox({ membership }: MembershipPurchaseBoxProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentPrice = isAnnual ? membership.price.yearly : membership.price.monthly;
  const savings = isAnnual ? (membership.price.monthly * 12) - membership.price.yearly : 0;

  const handlePurchase = async () => {
    setIsLoading(true);
    
    try {
      // TODO: Integrate with Razorpay
      // This is where you'll add Razorpay integration
      console.log("Initiating payment for:", {
        plan: membership.name,
        amount: currentPrice,
        isAnnual
      });
      
      // Placeholder for Razorpay integration
      alert(`Payment integration coming soon! You selected ${membership.name} - ${isAnnual ? 'Annual' : 'Monthly'} plan.`);
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

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-6">
          <span className={`mr-3 ${!isAnnual ? 'font-semibold' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-3 ${isAnnual ? 'font-semibold' : 'text-gray-500'}`}>Annual</span>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2" style={{ color: membership.color.primary }}>
            {membership.price.currency}{currentPrice}
            <span className="text-lg text-gray-500 font-normal">
              /{isAnnual ? 'year' : 'month'}
            </span>
          </div>
          {isAnnual && savings > 0 && (
            <p className="text-green-600 font-semibold">
              Save {membership.price.currency}{savings} per year!
            </p>
          )}
        </div>

        {/* Features Preview */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
          <ul className="space-y-2">
            {membership.features.slice(0, 5).map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <div 
                  className="w-4 h-4 rounded-full mr-2 flex items-center justify-center"
                  style={{ backgroundColor: membership.color.primary }}
                >
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
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

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Razorpay. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
