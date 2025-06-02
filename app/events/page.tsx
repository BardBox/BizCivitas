
import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { getAllEvents, getUpcomingEvents, getPastEvents, Event } from '@/lib/events';

export const metadata: Metadata = {
  title: "Business Events | BizCivitas - Transform Your Vision Into Reality",
  description: "Discover upcoming and past business networking events at BizCivitas. Join industry leaders for professional development, networking opportunities, and strategic business discussions.",
  keywords: ["business events", "networking events", "professional development", "BizCivitas events", "business networking", "corporate events", "business innovation", "startup events", "entrepreneur networking"],
  openGraph: {
    title: "Business Events | BizCivitas - Transform Your Vision Into Reality",
    description: "Join BizCivitas events for networking, professional development, and business growth opportunities.",
    type: "website",
    url: "https://bizcivitas.com/events",
    images: [
      {
        url: "/og-events.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Business Events - Networking and Innovation",
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
    title: "Business Events | BizCivitas - Transform Your Vision Into Reality",
    description: "Join BizCivitas events for networking, professional development, and business growth opportunities.",
  },
  alternates: {
    canonical: "/events",
  },
  other: {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default async function EventsPage() {
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = await getPastEvents();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Business Events | BizCivitas",
    "description": "Discover upcoming and past business networking events at BizCivitas.",
    "url": "https://bizcivitas.com/events",
    "mainEntity": {
      "@type": "VideoObject",
      "name": "Business Innovation - Transform Your Vision Into Reality",
      "description": "Inspiring video showcasing how great business ideas transform into successful companies.",
      "contentUrl": "http://deeppink-starling-710457.hostingersite.com/wp-content/uploads/2025/05/Think-your-next-big-idea-is-stuck-in-a-boardroom_-Think-again.-_airbnb-_uber-_solarcity-_business1080P_HD.mp4",
      "thumbnailUrl": "/video-poster.jpg",
      "uploadDate": "2025-01-24",
      "duration": "PT30S",
      "publisher": {
        "@type": "Organization",
        "name": "BizCivitas",
        "url": "https://bizcivitas.com"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bizcivitas.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Events",
          "item": "https://bizcivitas.com/events"
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

      <div className="bg-flat-bg">
        {/* Hero Video Section */}
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
              preload="auto"
              poster="/video-poster.jpg"
              aria-label="Business innovation video showing successful companies like Airbnb, Uber, and SolarCity"
            />
          </div>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-flat-text-primary bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-flat-text-inverse px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight flat-text-heading">
                Business <span className="text-flat-btn-primary">Events</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-flat-text-inverse max-w-3xl mx-auto flat-text-body">
                Join our exclusive networking events designed to connect professionals, share insights, and drive business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flat-btn flat-btn-primary">
                  Register for Events
                </button>
                <button className="flat-btn flat-btn-outline">
                  Learn More
                </button>
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

        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Upcoming Events Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-flat-text-primary mb-8 flat-text-heading">
                Upcoming Events
              </h2>
              <div className="space-y-6">
                {upcomingEvents.length === 0 ? (
                  <div className="flat-card p-8 text-center text-flat-text-secondary">
                    <svg className="w-16 h-16 text-flat-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg flat-text-heading">No upcoming events available at this time.</p>
                    <p className="text-sm text-flat-text-muted mt-2">Check back soon for new exciting events!</p>
                  </div>
                ) : (
                  upcomingEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.slug}`} className="block">
                      <div className="flat-card overflow-hidden group">
                        <div className="flex flex-col lg:flex-row">
                          <div className="lg:w-1/3">
                            <div className="h-64 lg:h-full relative overflow-hidden">
                              <Image
                                src={event.cover_url || '/placeholder-event.jpg'}
                                alt={event.event_name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                              />
                            </div>
                          </div>
                          <div className="lg:w-2/3 p-8">
                            <div className="text-sm text-flat-btn-primary font-semibold mb-2">
                              {formatDate(event.date)}
                            </div>
                            <h3 className="text-2xl font-bold text-flat-text-primary mb-3 group-hover:text-flat-btn-primary transition-colors flat-text-heading">
                              {event.event_name}
                            </h3>
                            {event.location && (
                              <div className="text-flat-text-secondary mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-flat-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </div>
                            )}
                            {event.description && (
                              <p className="text-flat-text-secondary leading-relaxed line-clamp-3 flat-text-body">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>

            {/* Past Events Section */}
            <section>
              <h2 className="text-3xl font-bold text-flat-text-primary mb-8 flat-text-heading">
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.length === 0 ? (
                  <div className="col-span-full flat-card p-8 text-center text-flat-text-secondary">
                    <svg className="w-16 h-16 text-flat-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-lg flat-text-heading">No past events available.</p>
                  </div>
                ) : (
                  pastEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.slug}`} className="block">
                      <div className="flat-card overflow-hidden group">
                        <div className="h-48 relative overflow-hidden">
                          <Image
                            src={event.cover_url || '/placeholder-event.jpg'}
                            alt={event.event_name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-sm text-flat-text-muted font-medium mb-2">
                            {formatDate(event.date)}
                          </div>
                          <h3 className="text-xl font-semibold text-flat-text-primary mb-2 group-hover:text-flat-btn-primary transition-colors line-clamp-2 flat-text-heading">
                            {event.event_name}
                          </h3>
                          {event.location && (
                            <div className="text-flat-text-secondary text-sm mb-3 flex items-center">
                              <svg className="w-4 h-4 mr-1 text-flat-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {event.location}
                            </div>
                          )}
                          {event.description && (
                            <p className="text-flat-text-secondary text-sm leading-relaxed line-clamp-3 flat-text-body">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
