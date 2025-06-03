
import type { Metadata } from "next";
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: "Discover BizCivitas - Explore Our Business Community",
  description: "Discover what makes BizCivitas unique. Explore our business community, networking opportunities, events, insights, and membership benefits that help turn visions into reality.",
  keywords: ["discover BizCivitas", "business community", "networking platform", "business opportunities", "community features", "explore BizCivitas"],
  openGraph: {
    title: "Discover BizCivitas - Explore Our Business Community",
    description: "Discover what makes BizCivitas unique. Explore our business community, networking opportunities, and membership benefits.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/discover`,
    images: [
      {
        url: "/og-discover.jpg",
        width: 1200,
        height: 630,
        alt: "Discover BizCivitas - Business Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover BizCivitas - Explore Our Business Community",
    description: "Discover what makes BizCivitas unique. Explore our business community, networking opportunities, and membership benefits.",
  },
  alternates: {
    canonical: "/discover",
  },
};

export default function DiscoverPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Discover BizCivitas",
    description: "Explore BizCivitas business community, networking opportunities, and membership benefits",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/discover`,
    mainEntity: {
      "@type": "Organization",
      name: "BizCivitas",
      description: "Business networking platform for professional growth and community building",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="bg-flat-bg min-h-screen">
        {/* Hero Video Section */}
        <section className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video
              className="w-full h-full object-cover"
              src="http://deeppink-starling-710457.hostingersite.com/wp-content/uploads/2025/05/Discover-the-Power-of-Exponential-Networking-_-BizCivitas1080P_HD.mp4"
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload nofullscreen noremoteplaybook"
              disablePictureInPicture
              preload="auto"
              poster="/video-poster.jpg"
              aria-label="Discover the Power of Exponential Networking at BizCivitas"
            />
          </div>

          {/* Flat UI Overlay */}
          <div className="absolute inset-0 bg-flat-text-primary bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-flat-text-inverse px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight flat-text-heading">
                Discover <span className="text-flat-btn-primary">BizCivitas</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-flat-text-inverse max-w-3xl mx-auto flat-text-body">
                Unlock the power of exponential networking and discover endless opportunities 
                for business growth, innovation, and meaningful connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/memberships" 
                  className="flat-btn flat-btn-primary"
                >
                  Join Our Community
                </a>
                <a 
                  href="/events" 
                  className="flat-btn flat-btn-outline"
                >
                  Explore Events
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-flat-text-inverse animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-flat-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-flat-text-primary mb-4 flat-text-heading">
                What We Offer
              </h2>
              <p className="text-lg text-flat-text-secondary max-w-2xl mx-auto flat-text-body">
                Discover the comprehensive ecosystem designed to accelerate your business journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Networking Events */}
              <div className="flat-card p-8 text-center">
                <div className="w-16 h-16 bg-flat-btn-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-flat-text-primary mb-3 flat-text-heading">
                  Networking Events
                </h3>
                <p className="text-flat-text-secondary flat-text-body">
                  Connect with industry leaders and innovative entrepreneurs at our carefully curated events.
                </p>
              </div>

              {/* Business Insights */}
              <div className="flat-card p-8 text-center">
                <div className="w-16 h-16 bg-flat-btn-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-flat-text-primary mb-3 flat-text-heading">
                  Expert Insights
                </h3>
                <p className="text-flat-text-secondary flat-text-body">
                  Access cutting-edge business strategies and market insights from industry experts.
                </p>
              </div>

              {/* Community Access */}
              <div className="flat-card p-8 text-center">
                <div className="w-16 h-16 bg-flat-btn-warning rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-flat-text-primary mb-3 flat-text-heading">
                  Exclusive Community
                </h3>
                <p className="text-flat-text-secondary flat-text-body">
                  Join a select community of ambitious professionals and growth-minded entrepreneurs.
                </p>
              </div>

              {/* Growth Opportunities */}
              <div className="flat-card p-8 text-center">
                <div className="w-16 h-16 bg-flat-btn-danger rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-flat-text-primary mb-3 flat-text-heading">
                  Growth Catalyst
                </h3>
                <p className="text-flat-text-secondary flat-text-body">
                  Accelerate your business growth through strategic partnerships and collaborations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Benefits Section */}
        <section className="py-16 bg-flat-surface-alt">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-flat-text-primary mb-6 flat-text-heading">
                  Why Join Our Community?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-flat-btn-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-flat-text-primary mb-2 flat-text-heading">
                        Strategic Networking
                      </h3>
                      <p className="text-flat-text-secondary flat-text-body">
                        Build meaningful relationships with decision-makers and thought leaders across industries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-flat-btn-success rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-flat-text-primary mb-2 flat-text-heading">
                        Knowledge Sharing
                      </h3>
                      <p className="text-flat-text-secondary flat-text-body">
                        Access exclusive insights, best practices, and innovative strategies from successful entrepreneurs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-flat-btn-warning rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-flat-text-primary mb-2 flat-text-heading">
                        Business Acceleration
                      </h3>
                      <p className="text-flat-text-secondary flat-text-body">
                        Fast-track your business growth through mentorship, partnerships, and collaboration opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flat-card p-8">
                <h3 className="text-2xl font-bold text-flat-text-primary mb-6 flat-text-heading">
                  Community Impact
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-flat-btn-primary mb-2">500+</div>
                    <div className="text-flat-text-secondary">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-flat-btn-success mb-2">50+</div>
                    <div className="text-flat-text-secondary">Monthly Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-flat-btn-warning mb-2">100+</div>
                    <div className="text-flat-text-secondary">Success Stories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-flat-btn-danger mb-2">25+</div>
                    <div className="text-flat-text-secondary">Industry Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-flat-btn-primary text-flat-text-inverse">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 flat-text-heading">
              Ready to Discover Your Potential?
            </h2>
            <p className="text-xl mb-8 flat-text-body">
              Join BizCivitas today and unlock exponential networking opportunities that will transform your business journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/memberships" 
                className="flat-btn bg-flat-text-inverse text-flat-btn-primary hover:bg-flat-surface"
              >
                Become a Member
              </a>
              <a 
                href="/contact" 
                className="flat-btn bg-transparent border-2 border-flat-text-inverse text-flat-text-inverse hover:bg-flat-text-inverse hover:text-flat-btn-primary"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
