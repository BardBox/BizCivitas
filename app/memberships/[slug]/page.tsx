import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMembershipBySlug, getAllMemberships } from "@/lib/memberships";
import MembershipPurchaseBox from "@/components/MembershipPurchaseBox";
import MembershipImageGallery from "@/components/MembershipImageGallery";
import { PhoneIcon, EmailIcon, WebsiteIcon } from "@/components/Icons";
import { Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const memberships = getAllMemberships();
  return memberships.map((membership) => ({
    slug: membership.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const membership = getMembershipBySlug(slug);

  if (!membership) {
    return {
      title: "Membership Not Found - BizCivitas",
      description: "The requested membership plan could not be found.",
    };
  }

  return {
    title: `${membership.name} - BizCivitas`,
    description: membership.description,
    keywords: [`${membership.name}`, "BizCivitas membership", "business networking", "entrepreneur community"],
    openGraph: {
      title: `${membership.name} - BizCivitas`,
      description: membership.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/memberships/${slug}`,
      images: [
        {
          url: membership.images[0] || "/og-memberships.jpg",
          width: 1200,
          height: 630,
          alt: membership.name,
        },
      ],
    },
  };
}

export default async function MembershipPage({ params }: PageProps) {
  const { slug } = await params;
  const membership = getMembershipBySlug(slug);

  if (!membership) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: membership.name,
    description: membership.description,
    offers: {
      "@type": "Offer",
      price: membership.price.amount,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Organization",
      name: "BizCivitas",
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com',
      sameAs: [
        "https://www.youtube.com/@BizCivitas",
        "https://www.linkedin.com/company/bizcivitas/",
        "https://www.facebook.com/bizcivitas/",
        "https://www.instagram.com/bizcivitas/"
      ],
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
        <section 
          className="relative py-20 bg-gradient-to-r text-white"
          style={{ background: `linear-gradient(135deg, ${membership.color.primary}, ${membership.color.primary}dd)` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="mb-4">
                  <Link
                    href="/memberships"
                    className="text-white/80 hover:text-white inline-flex items-center transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Memberships
                  </Link>
                </div>
                <h1 className="text-5xl font-bold mb-4">{membership.name}</h1>
                <p className="text-2xl text-white/90 mb-6">{membership.tagline}</p>
                <p className="text-lg text-white/80 mb-8">{membership.description}</p>
                <div className="flex items-center gap-6">
                  <div className="text-3xl font-bold">
                    {membership.price.currency}{membership.price.amount.toLocaleString()}
                  </div>
                  <div className="text-lg text-white/80">
                    Total Investment
                  </div>
                </div>

                {/* Contact Info for all memberships */}
                <div className="mt-6 space-y-2 text-white/90">
                  <p className="flex items-center">
                    <PhoneIcon className="mr-2" size={18} />
                    {membership.id === 'digital' || membership.id === 'industria' ? '+91 81606 79917' : '+91 80000 23786'}
                  </p>
                  <p className="flex items-center">
                    <EmailIcon className="mr-2" size={18} />
                    info@bizcivitas.com
                  </p>
                  <p className="flex items-center">
                    <WebsiteIcon className="mr-2" size={18} />
                    www.bizcivitas.com
                  </p>
                  {membership.id === 'digital' && (
                    <div className="mt-4">
                      <p className="text-white/80 mb-2">Follow us:</p>
                      <p className="text-white/90">Instagram | LinkedIn | Facebook | YouTube</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <Image
                    src={membership.images[0] || "/placeholder-membership.jpg"}
                    alt={membership.name}
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="lg:w-2/3">
                {/* Key Benefits */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243A6 6 0 0121 9z" />
                    </svg>
                    Key Benefits
                  </h2>
                  <ul className="space-y-4">
                    {membership.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div 
                            className="w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: membership.color.primary }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        <span className="text-gray-700 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meeting Structure for Core */}
                {membership.meetingStructure && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Meeting Structure
                    </h3>
                    <ul className="space-y-4">
                      {membership.meetingStructure.map((structure, index) => (
                        <li key={index} className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: membership.color.primary }}
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{structure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Features & Highlights */}
                <div className="grid md:grid-cols-2 gap-12 mb-12 items-start">
                  <div className="flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Features Included</h3>
                    <ul className="space-y-4 flex-1">
                      {membership.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: membership.color.primary }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose {membership.name}?</h3>
                    <div className="grid gap-4 flex-1">
                      {membership.highlights.map((highlight, index) => (
                        <div 
                          key={index}
                          className="p-6 rounded-lg border-l-4 flex items-center min-h-[80px]"
                          style={{ 
                            borderLeftColor: membership.color.primary,
                            backgroundColor: membership.color.secondary 
                          }}
                        >
                          <p className="text-gray-700 leading-relaxed">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Who Should Join (for Industria) */}
                {membership.eligibility && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Should Join?</h3>
                    <ul className="space-y-4">
                      {membership.eligibility.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: membership.color.primary }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Leadership Opportunities (for Industria) */}
                {membership.id === 'industria' && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Leadership Opportunities</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div 
                        className="p-6 rounded-lg border-l-4"
                        style={{ 
                          borderLeftColor: membership.color.primary,
                          backgroundColor: membership.color.secondary 
                        }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">Regional Chapter</h4>
                        <p className="text-gray-700">Launch your own regional Bizcivitas chapter</p>
                      </div>
                      <div 
                        className="p-6 rounded-lg border-l-4"
                        style={{ 
                          borderLeftColor: membership.color.primary,
                          backgroundColor: membership.color.secondary 
                        }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">Growth Council</h4>
                        <p className="text-gray-700">Join the Civitas Growth Council</p>
                      </div>
                      <div 
                        className="p-6 rounded-lg border-l-4"
                        style={{ 
                          borderLeftColor: membership.color.primary,
                          backgroundColor: membership.color.secondary 
                        }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">Community Growth</h4>
                        <p className="text-gray-700">Earn by leading industrial community growth</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
              </div>

              {/* Sticky Purchase Box */}
              <div className="lg:w-1/3">
                <div className="lg:sticky lg:top-8">
                  <MembershipPurchaseBox membership={membership} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special message for Core membership */}
        {membership.id === 'core' && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join a tribe of passionate entrepreneurs on a mission
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                To travel, transform, and grow. BizCivitas is where your network becomes your net worth.
              </p>
            </div>
          </section>
        )}

        {/* Special message for Flagship membership */}
        {membership.id === 'flagship' && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to grow with purpose?
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                BizCivitas is ideal for growth-oriented entrepreneurs and professionals who value trust-based networking, fresh perspectives, and opportunities that go beyond borders.
              </p>
            </div>
          </section>
        )}

        {/* Special message for Digital membership */}
        {membership.id === 'digital' && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start small. Grow big. Stay connected.
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Apply now or book a discovery call to begin your journey in the Bizcivitas ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918160679917"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                >
                  <PhoneIcon className="mr-2" size={18} />
                  Call +91 81606 79917
                </a>
                <a
                  href="mailto:info@bizcivitas.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition-colors"
                >
                  <EmailIcon className="mr-2" size={18} />
                  Email Us
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Special message for Industria membership */}
        {membership.id === 'industria' && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Apply now or schedule a discovery call
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Join an exclusive network of industrial leaders and accelerate your business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="tel:+918160679917"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
                >
                  <PhoneIcon className="mr-2" size={18} />
                  Call +91 81606 79917
                </a>
                <a
                  href="mailto:info@bizcivitas.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-orange-600 text-orange-600 font-semibold hover:bg-orange-600 hover:text-white transition-colors"
                >
                  <EmailIcon className="mr-2" size={18} />
                  Email Us
                </a>
              </div>
              <div className="text-gray-600">
                <p className="mb-2 flex items-center justify-center">
                  <WebsiteIcon className="mr-2" size={16} />
                  www.bizcivitas.com
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Follow us:</span>
                  <a
                    href="https://www.instagram.com/bizcivitas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                    aria-label="Follow BizCivitas on Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/bizcivitas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Connect with BizCivitas on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/bizcivitas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-700 transition-colors"
                    aria-label="Follow BizCivitas on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@bizcivitas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    aria-label="Subscribe to BizCivitas on YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section 
          className="py-16 text-white"
          style={{ background: `linear-gradient(135deg, ${membership.color.primary}, ${membership.color.primary}dd)` }}
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Into {membership.name}?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join our community of successful entrepreneurs and take your business to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
                style={{ color: membership.color.primary }}
              >
                {membership.ctaText}
              </button>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Have Questions?
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}