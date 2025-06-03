import type { Metadata } from "next";
import { theme } from "@/lib/theme";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About BizCivitas - Turning Visions Into Reality",
  description:
    "Learn about BizCivitas, our mission to bring your vision to life with seamless execution and unforgettable experiences. Discover our story, values, and commitment to business networking excellence.",
  keywords: [
    "about BizCivitas",
    "company mission",
    "business networking",
    "vision to reality",
    "company values",
    "our story",
  ],
  openGraph: {
    title: "About BizCivitas - Turning Visions Into Reality",
    description:
      "Learn about BizCivitas, our mission to bring your vision to life with seamless execution and unforgettable experiences.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/about`,
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About BizCivitas - Our Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About BizCivitas - Turning Visions Into Reality",
    description:
      "Learn about BizCivitas, our mission to bring your vision to life with seamless execution and unforgettable experiences.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BizCivitas",
    description:
      "Bringing your vision to life with seamless execution and unforgettable experiences",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/contact`,
    },
    sameAs: [
      "https://linkedin.com/company/bizcivitas",
      "https://twitter.com/bizcivitas",
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About BizCivitas</h1>
            <p className="text-xl opacity-90">
              Turning Visions Into Reality, One Connection at a Time
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                BizCivitas was founded with a simple yet powerful vision: to
                create meaningful connections that transform business ideas into
                reality. We believe that every great venture starts with the
                right network, the right insights, and the right opportunities.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Through our carefully curated events, insightful content, and
                vibrant community, we provide entrepreneurs, business leaders,
                and innovators with the platform they need to thrive in today's
                competitive landscape.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 mb-6">
                To bring your vision to life with seamless execution and
                unforgettable experiences, fostering a community where business
                dreams become sustainable realities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Meaningful Networking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Strategic Partnerships</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Innovation Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
