
"use client";

import { useState } from "react";
import type { Metadata } from "next";

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
  baseAmount: number;
  gst: number;
  totalAmount: number;
  color: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
}

const offlinePlans: MembershipPlan[] = [
  {
    id: "one-time-offline",
    name: "One Time Registration Free",
    description: "A non-refundable fee for onboarding and activating your Bizcivitas membership.",
    baseAmount: 25000,
    gst: 4500,
    totalAmount: 29500,
    color: "orange",
    bgColor: "bg-gradient-to-b from-orange-400 to-orange-300",
    textColor: "text-white",
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    id: "membership-offline",
    name: "Membership Fees",
    description: "An annual subscription fee granting access to exclusive Bizcivitas communities, events, and benefits.",
    baseAmount: 300000,
    gst: 54000,
    totalAmount: 354000,
    color: "green",
    bgColor: "bg-gradient-to-b from-green-500 to-green-400",
    textColor: "text-white",
    buttonColor: "bg-green-600 hover:bg-green-700"
  },
  {
    id: "meeting-offline",
    name: "Meeting/Event Fees",
    description: "A recurring charge for attending structured Bizcivitas networking meetings and events.",
    baseAmount: 25000,
    gst: 4500,
    totalAmount: 29500,
    color: "blue",
    bgColor: "bg-gradient-to-b from-blue-500 to-blue-400",
    textColor: "text-white",
    buttonColor: "bg-blue-600 hover:bg-blue-700"
  }
];

const onlinePlans: MembershipPlan[] = [
  {
    id: "one-time-online",
    name: "One Time Registration Free",
    description: "A non-refundable fee for onboarding and activating your Bizcivitas membership.",
    baseAmount: 25000,
    gst: 4500,
    totalAmount: 29500,
    color: "orange",
    bgColor: "bg-gradient-to-b from-orange-400 to-orange-300",
    textColor: "text-white",
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  }
];

export default function MembershipsPage() {
  const [activeTab, setActiveTab] = useState<'offline' | 'online'>('offline');
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

  const handlePayment = (plan: MembershipPlan) => {
    setIsLoading(plan.id);
    // Placeholder for future payment integration
    setTimeout(() => {
      alert(`Thank you for your interest in the ${plan.name} plan! Payment integration coming soon.`);
      setIsLoading(null);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toLocaleString('en-IN')}`;
  };

  const currentPlans = activeTab === 'offline' ? offlinePlans : onlinePlans;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Join BizCivitas</h1>
            <p className="text-xl opacity-90">Unlock Exclusive Networking & Growth Opportunities</p>
          </div>
        </section>

        {/* Tabs and Membership Plans */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('offline')}
                  className={`px-12 py-4 text-lg font-medium transition-all duration-200 ${
                    activeTab === 'offline'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  Offline
                </button>
                <button
                  onClick={() => setActiveTab('online')}
                  className={`px-12 py-4 text-lg font-medium transition-all duration-200 ${
                    activeTab === 'online'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  Online
                </button>
              </div>
            </div>
          </div>

          {/* Membership Cards */}
          <div className={`grid gap-8 ${currentPlans.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-3'}`}>
            {currentPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                {/* Header */}
                <div className={`${plan.bgColor} p-6 text-center`}>
                  <h3 className={`text-xl font-bold ${plan.textColor} mb-4`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Pricing */}
                <div className={`${plan.bgColor} opacity-80 p-4 text-center`}>
                  <div className={`text-sm ${plan.textColor} mb-2`}>
                    {formatCurrency(plan.baseAmount)} + {formatCurrency(plan.gst)} (18% GST)
                  </div>
                  <div className={`text-xl font-bold ${plan.textColor}`}>
                    Total: {formatCurrency(plan.totalAmount)}
                  </div>
                </div>

                {/* Description and Button */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-6 text-center leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => handlePayment(plan)}
                      disabled={isLoading === plan.id}
                      className={`${plan.buttonColor} text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isLoading === plan.id ? 'Processing...' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose BizCivitas?</h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Networking</h3>
                  <p className="text-gray-600 text-center">Connect with industry leaders and innovative entrepreneurs</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Growth</h3>
                  <p className="text-gray-600 text-center">Access exclusive resources and mentorship opportunities</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Events</h3>
                  <p className="text-gray-600 text-center">Join structured meetings and exclusive business events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
