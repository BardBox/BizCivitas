import type { Metadata } from "next";
import { theme } from '@/lib/theme';
import ContactFormWrapper from '@/components/ContactFormWrapper';
import TopSection from "@/components/TopSection";

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
        url: "/HeroSection_1_Contact.jpg",
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

import { ContactFormData } from "@/types/common.types";

interface ContactPageProps {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const success = params.success;
  const error = params.error;

  const handleFormSubmit = async (data: ContactFormData) => {
    'use server';

    console.log("Server: Received form data:", data);

    try {
      const response = await fetch('https://backend.bizcivitas.com/api/v1/inquiry/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phoneNumber: data.contact,
          email: data.email,
          howDidYouFindUs: data.howFindUs
        }),
      });

      const result = await response.json();
      console.log("Server: API response:", result);

      if (response.ok && result.success) {
        // Handle success - you might want to use a different approach for success handling
        console.log("Server: Form submission successful");
        return { success: true, data: result };
      } else {
        console.error("Server: API error:", result);
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Server: Error submitting form:', error);
      throw error;
    }
  };

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
        email: "info@bizcivitas.com",
        telephone: "+91 81606 79917",
        availableLanguage: "English",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "304, Pancham Highstreet, Old Padra Road, Opp. Bankers Heart Institute",
        addressLocality: "Vadodara",
        addressRegion: "Gujarat",
        postalCode: "390015",
        addressCountry: "IN"
      }
    },
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="w-screen bg-white flex flex-col items-center justify-center">
        {/* Hero Section */}
        <TopSection
        heading="Contact Us"
        subheading="Stay up to date with the most recent insights, trends, articles, and news from Bizcivitas around the world."
        backgroundImage="/HeroSection_1_Contact.jpg"
        />

        {/* Success/Error Messages */}
        {success && (
          <div className="max-w-6xl mx-auto px-4 pt-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Thank you for your inquiry! We'll get back to you soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-6xl mx-auto px-4 pt-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    There was an error submitting your inquiry. Please try again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-8">
                Have questions, suggestions, or need assistance? Feel free to reach out to us. We're here to help!
              </p>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mr-4 mt-1 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Address:</h3>
                    <div className="text-gray-700 leading-relaxed">
                      <p>304, Pancham Highstreet,</p>
                      <p>Old Padra Road,</p>
                      <p>Opp. Bankers Heart Institute,</p>
                      <p>Vadodara, Gujarat – 390015</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 rounded-full mr-4 mt-1 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Phone:</h3>
                    <p className="text-gray-700">+91 81606 79917</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 rounded-full mr-4 mt-1 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Mail:</h3>
                    <p className="text-gray-700">info@bizcivitas.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <ContactFormWrapper onFormSubmit={handleFormSubmit} />
          </div>
        </div>
        <div className="rounded-3xl w-screen max-w-[1440px] p-8">
        <div style={{maxWidth:"1440px", borderRadius : "32px"}}><iframe width="100%" height="600" scrolling="yes" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Pancham%20Highstreet,%20304,%20Old%20Padra%20Rd,%20opp.%20Bankers%20Heart%20Institute,%20Sheetal%20Nagar,%20Akota,%20Vadodara,%20Gujarat%20390015,%20India+(Bizcivitas%20Office)&amp;t=p&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/collections/sports-gps/">Cycling gps</a></iframe></div>
      </div></div>
    </div>
  );
}
