
import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { getAllEvents, getUpcomingEvents, getPastEvents, Event } from '@/lib/events';

export const metadata: Metadata = {
  title: "Business Events | BizCivitas - Transform Your Vision Into Reality",
  description: "Discover upcoming and past business networking events at BizCivitas. Join industry leaders for professional development, networking opportunities, and strategic business discussions. Watch inspiring stories of companies like Airbnb, Uber, and SolarCity.",
  keywords: ["business events", "networking events", "professional development", "BizCivitas events", "business networking", "corporate events", "business innovation", "startup events", "entrepreneur networking"],
  openGraph: {
    title: "Business Events | BizCivitas - Transform Your Vision Into Reality",
    description: "Join BizCivitas events for networking, professional development, and business growth opportunities. Discover how great ideas become successful businesses.",
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
    "description": "Discover upcoming and past business networking events at BizCivitas. Join industry leaders for professional development and strategic business discussions.",
    "url": "https://bizcivitas.com/events",
    "mainEntity": {
      "@type": "VideoObject",
      "name": "Business Innovation - Transform Your Vision Into Reality",
      "description": "Inspiring video showcasing how great business ideas like Airbnb, Uber, and SolarCity transformed from concepts to successful companies.",
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
      
      <div className="bg-gray-50">
    <div className="bg-gray-50">
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
            onError={() => console.error('Video failed to load')}
          />
        </div>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Business <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Events</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Join our exclusive networking events designed to connect professionals, share insights, and drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Register for Events
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-600 shadow-sm border">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg">No upcoming events available at this time.</p>
                <p className="text-sm text-gray-500 mt-2">Check back soon for new exciting events!</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="block">
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group">
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
                        <div className="text-sm text-blue-600 font-semibold mb-2">
                          {formatDate(event.date)}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {event.event_name}
                        </h3>
                        {event.location && (
                          <div className="text-gray-600 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </div>
                        )}
                        {event.description && (
                          <p className="text-gray-600 leading-relaxed line-clamp-3">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.length === 0 ? (
              <div className="col-span-full bg-white rounded-xl p-8 text-center text-gray-600 shadow-sm border">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-lg">No past events available.</p>
              </div>
            ) : (
              pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="block">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group">
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
                      <div className="text-sm text-gray-500 font-medium mb-2">
                        {formatDate(event.date)}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {event.event_name}
                      </h3>
                      {event.location && (
                        <div className="text-gray-600 text-sm mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                      )}
                      {event.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
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
