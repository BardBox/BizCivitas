
import type { Metadata } from "next";
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
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

export default function MembershipsPage() {
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

  return (
    <>
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
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-4">Perfect for new entrepreneurs</p>
                <div className="text-4xl font-bold text-orange-500 mb-2">$99</div>
                <p className="text-gray-500">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Monthly networking events</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Digital community access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Business resources library</span>
                </li>
              </ul>
              <button className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors">
                Get Started
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                <p className="text-gray-600 mb-4">For growing businesses</p>
                <div className="text-4xl font-bold text-orange-500 mb-2">$199</div>
                <p className="text-gray-500">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">All Starter features</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Exclusive workshops</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">1-on-1 mentoring sessions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Priority event access</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                Choose Professional
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">For established companies</p>
                <div className="text-4xl font-bold text-orange-500 mb-2">$399</div>
                <p className="text-gray-500">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">All Professional features</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Private networking events</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Strategic partnership intro</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Custom solutions</span>
                </li>
              </ul>
              <button className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
