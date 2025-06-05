import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllMemberships } from "@/lib/memberships";
import TopSection from "@/components/TopSection";

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
  const membershipPlans = getAllMemberships();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "BizCivitas Memberships",
    description: "Join BizCivitas membership for exclusive networking opportunities and business growth resources",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/memberships`,
    mainEntity: {
      "@type": "Organization",
      name: "BizCivitas",
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com',
      sameAs: [
        "https://www.youtube.com/@BizCivitas",
        "https://www.linkedin.com/company/bizcivitas/",
        "https://www.facebook.com/bizcivitas/",
        "https://www.instagram.com/bizcivitas/"
      ],
      offers: membershipPlans.map(plan => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        price: plan.price.amount,
        priceCurrency: "INR",
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <TopSection
          heading="Memberships"
          subheading="Join our exclusive community of entrepreneurs, innovators, and business leaders. Choose the membership that aligns with your business journey."
          backgroundImage="/patani.jpg"
        />

        {/* What We Provide Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Provide</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                BizCivitas offers comprehensive business growth solutions designed to accelerate your entrepreneurial journey and connect you with the right opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Networking Events</h3>
                <p className="text-gray-600">Connect with industry leaders and like-minded entrepreneurs at exclusive networking events.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Business Resources</h3>
                <p className="text-gray-600">Access curated business tools, templates, and resources to accelerate your growth.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-command-icon w-8 h-8 text-green-600 lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
                <p className="text-gray-600">Get guidance from experienced mentors who have built successful businesses.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
                <p className="text-gray-600">Discover partnerships, funding opportunities, and growth strategies for your business.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Plans */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Membership Plan</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the membership that best fits your business stage and growth objectives. Each plan is designed to provide maximum value for your investment.
              </p>
            </div>

            {/* Enhanced grid with 4-2-1 responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-8">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col h-full"
                >
                  {/* Popular Badge (if needed) */}
                  {/* {plan.popularBadge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                      {plan.popularBadge}
                    </div>
                  )} */}

                  {/* Card Content - flex-grow to push button to bottom */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    {/* Header Section */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base font-bold">"{plan.tagline}"</p>
                      <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: plan.color.primary }}>
                        {plan.price.currency}{plan.price.amount.toLocaleString()}
                        <div className="text-xs sm:text-sm text-gray-500 font-normal">
                          Inclusive of GST
                        </div>
                      </div>
                    </div>

                    {/* Features List - flex-grow to take available space */}
                    <div className="flex-grow">
                      <ul className="space-y-3 mb-6">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div 
                              className="w-5 h-5 rounded-full mr-3 flex items-center justify-center mt-0.5 flex-shrink-0"
                              style={{ backgroundColor: `${plan.color.primary}20` }}
                            >
                              <svg 
                                className="w-3 h-3" 
                                fill="none" 
                                stroke={plan.color.primary} 
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button Section - always at bottom */}
                    <div className="mt-auto">
                      <Link
                        href={`/memberships/${plan.slug}`}
                        className="block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 border-2 text-white hover:opacity-90 transform hover:translate-y-[-1px]"
                        style={{ 
                          backgroundColor: plan.color.primary,
                          borderColor: plan.color.primary
                        }}
                      >
                        Learn More
                      </Link>
                      <p className="text-xs text-gray-500 text-center mt-2">Click to see full details</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}