
import type { Metadata } from "next";
import { theme } from '@/lib/theme';
import { redirect } from 'next/navigation';

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

async function submitInquiry(formData: FormData) {
  'use server';
  
  const name = formData.get('name') as string;
  const lastName = formData.get('lastName') as string;
  const contact = formData.get('contact') as string;
  const email = formData.get('email') as string;
  const howFindUs = formData.get('howFindUs') as string;
  const message = formData.get('message') as string;
  
  // Combine first and last name
  const fullName = `${name} ${lastName}`.trim();
  
  try {
    const response = await fetch('https://backend.bizcivitas.com/api/v1/inquiry/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fullName,
        contact: contact,
        email: email,
        howFindUs: howFindUs,
        message: message
      }),
    });

    if (response.ok) {
      redirect('/contact?success=true');
    } else {
      redirect('/contact?error=true');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    redirect('/contact?error=true');
  }
}

interface ContactPageProps {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const success = params.success;
  const error = params.error;

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
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form action={submitInquiry} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter Your Last Name"
                    />
                  </div>
                </div>

                {/* Contact and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                      Numbers <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter Your Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter Your Email"
                    />
                  </div>
                </div>

                {/* How Did You Find Us */}
                <div>
                  <label htmlFor="howFindUs" className="block text-sm font-medium text-gray-700 mb-2">
                    How can we help? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="howFindUs"
                    name="howFindUs"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">How can we help?</option>
                    <option value="google">Google</option>
                    <option value="social_media">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="event">Event</option>
                    <option value="website">Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter message"
                  ></textarea>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                      I would like to sign up to receive BizCivitas's monthly newsletter, BNI SuccessNet™
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      required
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="ml-3 text-sm text-gray-700">
                      I agree to be contacted by BizCivitas according to the Privacy Policy and Terms and Conditions. <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
