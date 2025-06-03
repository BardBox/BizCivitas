"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const metadata: Metadata = {
  title: "BizCivitas Memberships - Join Our Business Community",
  description: "Discover BizCivitas membership plans designed for entrepreneurs, business leaders, and innovators. Unlock exclusive networking opportunities, events, and business growth resources.",
  keywords: ["BizCivitas membership", "business community", "networking membership", "entrepreneur membership", "business growth", "exclusive events"],
  openGraph: {
    title: "BizCivitas Memberships - Join Our Business Community",
    description: "Discover BizCivitas membership plans designed for entrepreneurs, business leaders, and innovators.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/memberships`,
    images: [
      {
        url: "/og-memberships.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Memberships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizCivitas Memberships - Join Our Business Community",
    description: "Discover BizCivitas membership plans designed for entrepreneurs, business leaders, and innovators.",
  },
  alternates: {
    canonical: "/memberships",
  },
};

interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  color: string;
}

const membershipPlans: MembershipPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for new entrepreneurs",
    amount: 9900, // Amount in paise (₹99)
    features: [
      "Monthly networking events",
      "Digital community access",
      "Business resources library"
    ],
    buttonText: "Get Started",
    color: "orange"
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing businesses",
    amount: 19900, // Amount in paise (₹199)
    features: [
      "All Starter features",
      "Exclusive workshops",
      "1-on-1 mentoring sessions",
      "Priority event access"
    ],
    buttonText: "Choose Professional",
    isPopular: true,
    color: "gradient"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For established companies",
    amount: 39900, // Amount in paise (₹399)
    features: [
      "All Professional features",
      "Private networking events",
      "Strategic partnership intro",
      "Custom solutions"
    ],
    buttonText: "Contact Sales",
    color: "green"
  }
];

export default function MembershipsPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "BizCivitas Memberships",
    description: "Join BizCivitas membership for exclusive networking opportunities and business growth resources",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/memberships`,
    mainEntity: {
      "@type": "Organization",
      name: "BizCivitas",
      offers: {
        "@type": "Offer",
        name: "Business Membership",
        description: "Exclusive access to networking events and business resources",
      },
    },
  };

  // TODO: Integrate Razorpay payment processing
  // const handlePayment = async (plan: MembershipPlan) => {
  //   setIsLoading(plan.id);

  //   try {
  //     // Create order on backend
  //     const response = await fetch('/api/create-order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         amount: plan.amount,
  //         currency: 'INR',
  //         receipt: `membership_${plan.id}_${Date.now()}`,
  //         notes: {
  //           plan_id: plan.id,
  //           plan_name: plan.name,
  //         },
  //       }),
  //     });

  //     const order = await response.json();

  //     if (!order.id) {
  //       throw new Error('Failed to create order');
  //     }

  //     // Initialize Razorpay
  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: 'BizCivitas',
  //       description: `${plan.name} Membership`,
  //       order_id: order.id,
  //       handler: async function (response: any) {
  //         // Payment successful
  //         try {
  //           const verifyResponse = await fetch('/api/verify-payment', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               razorpay_order_id: response.razorpay_order_id,
  //               razorpay_payment_id: response.razorpay_payment_id,
  //               razorpay_signature: response.razorpay_signature,
  //               plan_id: plan.id,
  //             }),
  //           });

  //           const verifyResult = await verifyResponse.json();

  //           if (verifyResult.success) {
  //             alert('Payment successful! Welcome to BizCivitas!');
  //             // Redirect to success page or dashboard
  //             window.location.href = '/memberships/success';
  //           } else {
  //             alert('Payment verification failed. Please contact support.');
  //           }
  //         } catch (error) {
  //           console.error('Payment verification error:', error);
  //           alert('Payment verification failed. Please contact support.');
  //         }
  //       },
  //       prefill: {
  //         name: '',
  //         email: '',
  //         contact: '',
  //       },
  //       notes: {
  //         plan_id: plan.id,
  //       },
  //       theme: {
  //         color: '#F97316',
  //       },
  //       modal: {
  //         ondismiss: function() {
  //           setIsLoading(null);
  //         }
  //       }
  //     };

  //     const razorpay = new window.Razorpay(options);
  //     razorpay.open();
  //   } catch (error) {
  //     console.error('Payment error:', error);
  //     alert('Failed to initiate payment. Please try again.');
  //   } finally {
  //     setIsLoading(null);
  //   }
  // };

  const handlePayment = (plan: MembershipPlan) => {
    // Temporary placeholder - payment integration will be added later
    alert(`Payment integration coming soon for ${plan.name} plan!`);
  };

  const getButtonClass = (plan: MembershipPlan) => {
    if (plan.color === "gradient") {
      return "w-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50";
    } else if (plan.color === "green") {
      return "w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50";
    } else {
      return "w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50";
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Join BizCivitas</h1>
            <p className="text-xl opacity-90">Unlock Exclusive Networking & Growth Opportunities</p>
          </div>
        </section>

        {/* Membership Plans */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Membership</h2>
            <p className="text-xl text-gray-600">Find the perfect plan to accelerate your business journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white p-8 rounded-lg shadow-lg border-2 ${
                  plan.isPopular ? 'border-orange-500 relative' : 'border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    ₹{plan.amount / 100}
                  </div>
                  <p className="text-gray-500">per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePayment(plan)}
                  disabled={isLoading === plan.id}
                  className={getButtonClass(plan)}
                >
                  {isLoading === plan.id ? 'Processing...' : plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}