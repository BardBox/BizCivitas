import type { Metadata } from "next";
import Link from "next/link";
import TopSection from "@/components/TopSection";

export const metadata: Metadata = {
  title: "Terms & Conditions | BizCivitas - Service Agreement & User Guidelines",
  description: "BizCivitas Terms & Conditions outlining user rights, responsibilities, membership policies, and service guidelines. Read our comprehensive terms of service and platform usage agreement.",
  keywords: [
    "BizCivitas terms and conditions",
    "terms of service",
    "user agreement",
    "service terms",
    "membership terms",
    "platform guidelines",
    "user responsibilities",
    "service agreement",
    "legal terms",
    "platform rules",
    "user rights",
    "service policies",
  ],
  openGraph: {
    title: "Terms & Conditions | BizCivitas - Service Agreement & User Guidelines",
    description: "Read BizCivitas Terms & Conditions covering user rights, responsibilities, and service guidelines. Comprehensive platform usage agreement and membership policies.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/terms`,
    images: [
      {
        url: "/og-terms.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Terms & Conditions - Service Agreement",
      },
    ],
    siteName: "BizCivitas",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | BizCivitas - Service Agreement & User Guidelines",
    description: "Read BizCivitas Terms & Conditions covering user rights, responsibilities, and service guidelines.",
    site: "@BizCivitas",
    creator: "@BizCivitas",
  },
  alternates: {
    canonical: "/terms",
  },
  other: {
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

export default function TermsConditionsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions - BizCivitas",
    description: "BizCivitas Terms & Conditions outlining user rights, responsibilities, membership policies, and service guidelines",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/terms`,
    mainEntity: {
      "@type": "TermsOfService",
      name: "BizCivitas Terms & Conditions",
      datePublished: "2025-06-08",
      dateModified: "2025-06-08",
      publisher: {
        "@type": "Organization",
        name: "BizCivitas",
        url: "https://bizcivitas.com",
        logo: {
          "@type": "ImageObject",
          url: "https://bizcivitas.com/logo.png"
        }
      }
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://bizcivitas.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Terms & Conditions",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/terms`
        }
      ]
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <TopSection
          heading="Terms & Conditions"
          subheading="Understanding our service agreement helps ensure a positive experience for all members. Please review our terms and guidelines carefully."
          backgroundImage="/HeroSection_1_Contact.jpg"
        />

        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Terms & Conditions</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 lg:p-12">
              
              {/* Effective Date */}
              <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-blue-800 font-medium">
                  <strong>Effective Date:</strong> June 8, 2025
                </p>
              </div>

              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="introduction">
                  1. Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Welcome to BizCivitas ("we," "us," or "our"). These Terms & Conditions govern your access to and use of our website and services (the "Platform"). By accessing or using the Platform, you agree to comply with and be bound by these Terms. If you do not agree, please do not use our services.
                </p>
              </section>

              {/* Eligibility */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="eligibility">
                  2. Eligibility
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  You must be at least 18 years old and legally capable of entering into binding agreements. If you are acting on behalf of an organization, you confirm you have the authority to bind that entity.
                </p>
              </section>

              {/* Membership & Account Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="membership-security">
                  3. Membership & Account Security
                </h2>
                <ul className="space-y-3 text-gray-700 ml-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Access to certain features requires registration and a valid membership.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    You are responsible for maintaining the confidentiality of your account information and notifying us immediately of any unauthorized access or use.
                  </li>
                </ul>
              </section>

              {/* Services & Use of Content */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="services-content">
                  4. Services & Use of Content
                </h2>
                <ul className="space-y-3 text-gray-700 ml-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    BizCivitas offers networking opportunities, member forums, events, and referral platforms.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    You are solely responsible for the content you post. It must comply with applicable laws and not infringe the rights of others.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    By posting content, you grant BizCivitas a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content for the purpose of operating and promoting the Platform.
                  </li>
                </ul>
              </section>

              {/* Acceptable Use */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="acceptable-use">
                  5. Acceptable Use
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="space-y-3 text-gray-700 ml-6">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Impersonate any person or entity, or misrepresent your affiliation;
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Upload or distribute unlawful, harmful, or offensive content;
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Disrupt or interfere with the security or functionality of the Platform;
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Use automated means (bots, scripts) to access the Platform without permission.
                  </li>
                </ul>
              </section>

              {/* Fees & Payment */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="fees-payment">
                  6. Fees & Payment
                </h2>
                <ul className="space-y-3 text-gray-700 ml-6 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Membership fees and event charges will be clearly communicated at the time of purchase.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    All payments are due in advance and are non-refundable unless stated otherwise.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Prices are subject to change, but any changes will not affect ongoing memberships until renewal.
                  </li>
                </ul>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    <strong>Important:</strong> All payments are non-refundable unless stated otherwise.
                  </p>
                </div>
              </section>

              {/* Privacy */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="privacy">
                  7. Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Your use of the Platform is also governed by our{" "}
                  <Link 
                    href="/privacy" 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors underline"
                  >
                    Privacy Policy
                  </Link>
                  . By using our services, you consent to our data collection and use practices described therein.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="intellectual-property">
                  8. Intellectual Property
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  All intellectual property, including logos, trademarks, text, images, and software, are owned by BizCivitas or its licensors. Unauthorized use, reproduction, or distribution is prohibited.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="termination">
                  9. Termination
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to suspend or terminate your access for violation of these Terms or other misconduct. You may cancel your membership at any time by contacting us.
                </p>
              </section>

              {/* Disclaimers & Limitations */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="disclaimers-limitations">
                  10. Disclaimers & Limitations
                </h2>
                <ul className="space-y-3 text-gray-700 ml-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    The Platform is provided "as is" without warranties of any kind.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    BizCivitas disclaims liability for any indirect, incidental, or consequential damages to the fullest extent permitted by law.
                  </li>
                </ul>
              </section>

              {/* Governing Law & Dispute Resolution */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="governing-law">
                  11. Governing Law & Dispute Resolution
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    These Terms are governed by and construed in accordance with the laws of Vadodara, Gujarat, India.
                  </p>
                  <p className="leading-relaxed">
                    Any disputes arising from or related to these Terms will be subject to the exclusive jurisdiction of the courts located in Vadodara, Gujarat, India.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="changes-terms">
                  12. Changes to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may revise these Terms periodically. Changes will be posted on the website, and continued use constitutes acceptance of those changes.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="contact-information">
                  Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For any questions regarding these Terms & Conditions, please contact:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">BizCivitas Legal Team</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong>{" "}
                    <a 
                      href="mailto:legal@bizcivitas.com" 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      legal@bizcivitas.com
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Location:</strong> Vadodara, Gujarat, India
                  </p>
                </div>
              </section>
            </div>

            {/* Quick Navigation */}
            <div className="mt-12 bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <a href="#introduction" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  1. Introduction
                </a>
                <a href="#eligibility" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  2. Eligibility
                </a>
                <a href="#membership-security" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  3. Membership & Security
                </a>
                <a href="#services-content" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  4. Services & Content
                </a>
                <a href="#acceptable-use" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  5. Acceptable Use
                </a>
                <a href="#fees-payment" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  6. Fees & Payment
                </a>
                <a href="#privacy" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  7. Privacy
                </a>
                <a href="#intellectual-property" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  8. Intellectual Property
                </a>
                <a href="#termination" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  9. Termination
                </a>
                <a href="#disclaimers-limitations" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  10. Disclaimers
                </a>
                <a href="#governing-law" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  11. Governing Law
                </a>
                <a href="#changes-terms" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  12. Changes to Terms
                </a>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Information</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/privacy" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/contact" 
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/memberships" 
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  View Memberships
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
