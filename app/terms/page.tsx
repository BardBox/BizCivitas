import type { Metadata } from "next";
import Link from "next/link";
import TopSection from "@/components/TopSection";

export const metadata: Metadata = {
  title: "Privacy Policy | BizCivitas - Your Data Protection & Privacy Rights",
  description: "BizCivitas Privacy Policy detailing how we collect, use, protect, and manage your personal information. Learn about your privacy rights, data security measures, and cookie usage policies.",
  keywords: [
    "BizCivitas privacy policy",
    "data protection",
    "privacy rights",
    "personal information security",
    "cookie policy",
    "data collection policy",
    "GDPR compliance",
    "user privacy",
    "data security",
    "information handling",
    "privacy practices",
    "data processing"
  ],
  openGraph: {
    title: "Privacy Policy | BizCivitas - Your Data Protection & Privacy Rights",
    description: "Learn how BizCivitas protects your personal information and respects your privacy rights. Comprehensive data protection and privacy policy details.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/privacy`,
    images: [
      {
        url: "/og-privacy.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Privacy Policy - Data Protection",
      },
    ],
    siteName: "BizCivitas",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | BizCivitas - Your Data Protection & Privacy Rights",
    description: "Learn how BizCivitas protects your personal information and respects your privacy rights.",
    site: "@BizCivitas",
    creator: "@BizCivitas",
  },
  alternates: {
    canonical: "/privacy",
  },
  other: {
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

export default function PrivacyPolicyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - BizCivitas",
    description: "BizCivitas Privacy Policy detailing data protection, privacy rights, and information handling practices",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/privacy`,
    mainEntity: {
      "@type": "PrivacyPolicy",
      name: "BizCivitas Privacy Policy",
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
          name: "Privacy Policy",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/privacy`
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
          heading="Privacy Policy"
          subheading="Your privacy is important to us. Learn how we protect and handle your personal information with transparency and care."
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
              <span className="text-gray-600">Privacy Policy</span>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="overview">
                  1. Overview
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  BizCivitas values your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you interact with our Platform.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="information-collection">
                  2. Information We Collect
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      a) Information You Provide:
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-6">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Registration details: name, email, phone number, company, job title.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Profile details: biography, photos, business descriptions.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Payment information for membership and event transactions.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      b) Information Collected Automatically:
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-6">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Device information: IP address, browser type, operating system.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Site activity: pages viewed, time spent, interaction patterns.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Participation records: event attendance and engagement metrics.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="information-usage">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use your data to:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Manage your account and membership;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Facilitate networking, events, and community engagement;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Communicate updates and promotional offers;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Analyze usage to improve our services;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Comply with legal obligations.
                  </li>
                </ul>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    BizCivitas does not sell your personal information to third parties.
                  </p>
                </div>
              </section>

              {/* Sharing of Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="information-sharing">
                  4. Sharing of Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share information with:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Service providers assisting with payment processing, hosting, and analytics;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Legal authorities if required by law;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Potential business partners in the event of a merger or acquisition, under strict confidentiality.
                  </li>
                </ul>
              </section>

              {/* Cookies & Tracking Technologies */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="cookies-tracking">
                  5. Cookies & Tracking Technologies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies to enhance user experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings, but disabling cookies may affect certain functionalities.
                </p>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="data-security">
                  6. Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement commercially reasonable security measures to protect your data. However, no system can be guaranteed 100% secure, and you use our Platform at your own risk.
                </p>
              </section>

              {/* Third-Party Links */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="third-party-links">
                  7. Third-Party Links
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our Platform may contain links to external websites. We are not responsible for the privacy practices of such third parties and encourage you to review their policies independently.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="childrens-privacy">
                  8. Children's Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are intended for individuals aged 18 and older. We do not knowingly collect data from children. If we learn we have collected personal information from a child, we will promptly delete it.
                </p>
              </section>

              {/* International Data Transfers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="data-transfers">
                  9. International Data Transfers
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Your information may be transferred and maintained on servers outside your jurisdiction. By using our services, you consent to such transfer in accordance with applicable laws.
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="your-rights">
                  10. Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Access the personal data we hold about you;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Request corrections to inaccurate data;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Request deletion of your data;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Restrict certain processing;
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Opt-out of marketing communications.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  For requests, please email{" "}
                  <a 
                    href="mailto:privacy@bizcivitas.com" 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    privacy@bizcivitas.com
                  </a>.
                </p>
              </section>

              {/* Policy Updates */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="policy-updates">
                  11. Policy Updates
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="contact-information">
                  12. Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For any privacy-related inquiries, please contact:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">BizCivitas Privacy Team</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong>{" "}
                    <a 
                      href="mailto:privacy@bizcivitas.com" 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      privacy@bizcivitas.com
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
                <a href="#overview" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  1. Overview
                </a>
                <a href="#information-collection" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  2. Information Collection
                </a>
                <a href="#information-usage" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  3. Information Usage
                </a>
                <a href="#information-sharing" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  4. Information Sharing
                </a>
                <a href="#cookies-tracking" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  5. Cookies & Tracking
                </a>
                <a href="#data-security" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  6. Data Security
                </a>
                <a href="#third-party-links" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  7. Third-Party Links
                </a>
                <a href="#childrens-privacy" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  8. Children's Privacy
                </a>
                <a href="#data-transfers" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  9. Data Transfers
                </a>
                <a href="#your-rights" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  10. Your Rights
                </a>
                <a href="#policy-updates" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  11. Policy Updates
                </a>
                <a href="#contact-information" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  12. Contact Information
                </a>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Information</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/terms" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Terms & Conditions
                </Link>
                <Link 
                  href="/contact" 
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/discover" 
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
