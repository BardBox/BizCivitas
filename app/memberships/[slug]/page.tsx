
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMembershipBySlug, getAllMemberships } from "@/lib/memberships";
import MembershipPurchaseBox from "@/components/MembershipPurchaseBox";
import MembershipImageGallery from "@/components/MembershipImageGallery";

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
                    <span className="mr-2">📞</span>
                    {membership.id === 'digital' || membership.id === 'industria' ? '+91 81606 79917' : '+91 80000 23786'}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">✉️</span>
                    info@bizcivitas.com
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">🌐</span>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">🔑 Key Benefits</h2>
                  <ul className="space-y-4">
                    {membership.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div 
                          className="w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: membership.color.primary }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meeting Structure for Core */}
                {membership.meetingStructure && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🧭 Meeting Structure</h3>
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
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Features Included</h3>
                    <ul className="space-y-4">
                      {membership.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: membership.color.primary }}
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose {membership.name}?</h3>
                    <div className="space-y-4">
                      {membership.highlights.map((highlight, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-lg border-l-4"
                          style={{ 
                            borderLeftColor: membership.color.primary,
                            backgroundColor: membership.color.secondary 
                          }}
                        >
                          <p className="text-gray-700">{highlight}</p>
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
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
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
                <MembershipImageGallery images={membership.images} membershipName={membership.name} />
              </div>

              {/* Sticky Purchase Box */}
              <div className="lg:w-1/3">
                <MembershipPurchaseBox membership={membership} />
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
                  📞 Call +91 81606 79917
                </a>
                <a
                  href="mailto:info@bizcivitas.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition-colors"
                >
                  📩 Email Us
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
                  📞 Call +91 81606 79917
                </a>
                <a
                  href="mailto:info@bizcivitas.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-orange-600 text-orange-600 font-semibold hover:bg-orange-600 hover:text-white transition-colors"
                >
                  📩 Email Us
                </a>
              </div>
              <div className="text-gray-600">
                <p className="mb-2">🌐 www.bizcivitas.com</p>
                <p>Follow us: Instagram | LinkedIn | Facebook | YouTube</p>
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
