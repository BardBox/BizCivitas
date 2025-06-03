import type { Metadata } from "next";
import Link from 'next/link';
import { theme } from '@/lib/theme';
import ContentSection from '@/components/ContentSection';
import EnhancedCTA from '@/components/EnhancedCTA';

export const metadata: Metadata = {
  title: "BizCivitas - Where Ventures and Voyages Intersect | Business Networking Platform",
  description: "The world is your network. Expand your business by exploring new destinations and forming meaningful collaborations. Join BizCivitas for networking, events, and business growth opportunities.",
  keywords: ["BizCivitas", "business networking", "ventures", "voyages", "business travel", "entrepreneur networking", "corporate networking", "business community", "professional development", "business collaborations", "networking events"],
  openGraph: {
    title: "BizCivitas - Where Ventures and Voyages Intersect",
    description: "The world is your network. Expand your business by exploring new destinations and forming meaningful collaborations.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas - Where Ventures and Voyages Intersect",
      },
    ],
    videos: [
      {
        url: "http://deeppink-starling-710457.hostingersite.com/wp-content/uploads/2025/05/Think-your-next-big-idea-is-stuck-in-a-boardroom_-Think-again.-_airbnb-_uber-_solarcity-_business1080P_HD.mp4",
        width: 1920,
        height: 1080,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizCivitas - Where Ventures and Voyages Intersect",
    description: "The world is your network. Expand your business by exploring new destinations and forming meaningful collaborations.",
  },
};

export default function HomePage() {
  // Content section configuration - change these variables to update content
  const networkingSectionData = {
    title: "The New Era Of Networking",
    description: "Leo tellus id sit vitae rhoncus sagittis. Egestas non facilisis mauris varius condimentum. Magna pharetra pellent esque nulla risus metus massa viverra adipiscing ut. Ornare pellentesque augue pellentesque eras sed ultrices. Tincidunt massa ac tincidunt sed. Enim ornare rutrum tempor bibendum accumsan.",
    buttonText: "Explore US",
    buttonHref: "/discover",
    imageSrc: "/placeholder-event.jpg", // Replace with actual image path
    imageAlt: "Professional networking event with diverse business people",
    imagePosition: "right" as const,
    backgroundColor: "bg-flat-surface"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BizCivitas",
    "description": "Where ventures and voyages intersect. Business networking platform for events, business travel, and professional growth through meaningful collaborations.",
    "url": "https://bizcivitas.com",
    "logo": "https://bizcivitas.com/logo.png",
    "slogan": "Where Ventures and Voyages Intersect",
    "sameAs": [
      "https://linkedin.com/company/bizcivitas",
      "https://twitter.com/bizcivitas"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        suppressHydrationWarning
      />

      <div className="bg-flat-bg min-h-screen">
        {/* Hero Section with Video Background */}
        <section className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video
              className="w-full h-full object-cover"
              src="http://deeppink-starling-710457.hostingersite.com/wp-content/uploads/2025/05/Think-your-next-big-idea-is-stuck-in-a-boardroom_-Think-again.-_airbnb-_uber-_solarcity-_business1080P_HD.mp4"
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload nofullscreen noremoteplaybook"
              disablePictureInPicture
              preload="metadata"
              poster="/video-poster.jpg"
              aria-label="Business innovation video showcasing successful companies"
              suppressHydrationWarning
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">  <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl">
              <div className="mb-8">
                <p className="text-5xl font-light mb-4 tracking-wider italic" >
                  Welcome to BizCivitas !
                </p>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  Where <span className="text-flat-btn-primary">Ventures</span> and <span className="text-flat-btn-primary">Voyages</span> Intersect
                </h1>
              </div>
              <p className="text-xl lg:text-2xl mb-12 text-white max-w-4xl mx-auto leading-relaxed">
                The world is your network. Expand your business by exploring new destinations and forming meaningful collaborations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <EnhancedCTA href="/events" variant="primary" size="lg">
                  Join Us
                </EnhancedCTA>
                <EnhancedCTA href="/insights" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Learn More
                </EnhancedCTA>
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

        {/* Content Section - The New Era Of Networking */}
        <ContentSection
          title={networkingSectionData.title}
          description={networkingSectionData.description}
          buttonText={networkingSectionData.buttonText}
          buttonHref={networkingSectionData.buttonHref}
          imageSrc={networkingSectionData.imageSrc}
          imageAlt={networkingSectionData.imageAlt}
          imagePosition={networkingSectionData.imagePosition}
          backgroundColor={networkingSectionData.backgroundColor}
        />

        {/* Features Section */}
        <section className="py-16 bg-flat-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-flat-text-primary mb-4 flat-text-heading">
                Why Choose BizCivitas?
              </h2>
              <p className="text-lg text-flat-text-secondary max-w-2xl mx-auto flat-text-body">
                We provide the platform and community you need to transform ideas into successful ventures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
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
                  Connect with like-minded professionals and industry leaders at our exclusive networking events.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flat-card p-8 text-center">
                <div className="w-16 h-16 bg-flat-btn-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-flat-text-primary mb-3 flat-text-heading">
                  Business Insights
                </h3>
                <p className="text-flat-text-secondary flat-text-body">
                  Access expert analysis, industry trends, and actionable insights to drive your business forward.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flat-card p-8 text-center">
                <div className="w-16 h-16 bg-flat-btn-warning rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-flat-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-flat-text-primary mb-3 flat-text-heading">
                  Expert Team
                </h3>
                <p className="text-flat-text-secondary flat-text-body">
                  Learn from experienced professionals who have successfully built and scaled businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-flat-btn-primary text-flat-text-inverse">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 flat-text-heading">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 flat-text-body">
              Join our community of entrepreneurs and business leaders who are turning their visions into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedCTA href="/events" variant="secondary" size="lg">
                Join Our Events
              </EnhancedCTA>
              <EnhancedCTA href="/team" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-flat-btn-primary">
                Meet Our Team
              </EnhancedCTA>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-flat-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="flat-card p-6">
                <div className="text-3xl font-bold text-flat-btn-primary mb-2">500+</div>
                <div className="text-flat-text-secondary">Members</div>
              </div>
              <div className="flat-card p-6">
                <div className="text-3xl font-bold text-flat-btn-success mb-2">50+</div>
                <div className="text-flat-text-secondary">Events</div>
              </div>
              <div className="flat-card p-6">
                <div className="text-3xl font-bold text-flat-btn-warning mb-2">100+</div>
                <div className="text-flat-text-secondary">Insights</div>
              </div>
              <div className="flat-card p-6">
                <div className="text-3xl font-bold text-flat-btn-danger mb-2">25+</div>
                <div className="text-flat-text-secondary">Partners</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}