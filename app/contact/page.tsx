
import type { Metadata } from "next";
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: "Contact BizCivitas - Get in Touch",
  description: "Contact BizCivitas for inquiries about events, memberships, partnerships, or business networking opportunities. We're here to help turn your vision into reality.",
  keywords: ["contact BizCivitas", "business inquiries", "event inquiries", "partnership opportunities", "get in touch"],
  openGraph: {
    title: "Contact BizCivitas - Get in Touch",
    description: "Contact BizCivitas for inquiries about events, memberships, partnerships, or business networking opportunities.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/contact`,
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact BizCivitas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact BizCivitas - Get in Touch",
    description: "Contact BizCivitas for inquiries about events, memberships, partnerships, or business networking opportunities.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact BizCivitas",
    description: "Get in touch with BizCivitas for business networking opportunities",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "BizCivitas",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@bizcivitas.com",
        availableLanguage: "English",
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
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90">Let's Turn Your Vision Into Reality Together</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-8">
                Ready to join our community or have questions about our events? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-500 rounded-full mr-4 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">hello@bizcivitas.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Follow Us</h3>
                    <p className="text-gray-700">LinkedIn, Twitter, Instagram</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mr-4 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-700">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
