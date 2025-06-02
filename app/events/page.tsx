
import type { Metadata } from "next";
import { NextSEO } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { getAllEvents, getUpcomingEvents, getPastEvents, Event } from '@/lib/events';

export const metadata: Metadata = {
  title: "Events | BizCivitas - Business Networking Events",
  description: "Discover upcoming and past business networking events at BizCivitas. Join industry leaders for professional development, networking opportunities, and strategic business discussions.",
  keywords: ["business events", "networking events", "professional development", "BizCivitas events", "business networking", "corporate events"],
  openGraph: {
    title: "Business Events | BizCivitas",
    description: "Join BizCivitas events for networking, professional development, and business growth opportunities.",
    type: "website",
    url: "https://bizcivitas.com/events",
    images: [
      {
        url: "/og-events.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Events | BizCivitas",
    description: "Join BizCivitas events for networking, professional development, and business growth opportunities.",
  },
  alternates: {
    canonical: "/events",
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto p-5">
        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-8 text-center bg-gray-200 w-full text-black border-none p-2 md:text-lg md:p-1.5">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-red-600 text-base shadow-sm">
                No upcoming events available at this time.
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="block no-underline text-inherit">
                  <div className="flex bg-white rounded-3xl mb-5 overflow-hidden transition-all duration-300 relative cursor-pointer p-6 border-3 border-gray-200 hover:scale-105 hover:shadow-lg hover:bg-gray-800 hover:text-white hover:border-none group">
                    <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <div className="flex-shrink-0 w-120 bg-cover bg-center min-h-36 rounded-2xl overflow-hidden">
                      <Image
                        src={event.cover_url}
                        alt={event.event_name}
                        width={480}
                        height={260}
                        className="w-full h-full object-cover"
                        priority={event.id <= 2}
                      />
                    </div>
                    <div className="flex-1 p-5 relative z-20">
                      <div className="text-sm text-gray-500 font-medium mb-1 group-hover:text-gray-300">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-2xl font-semibold text-green-600 mb-2 group-hover:text-white">
                        {event.event_name}
                      </div>
                      <div className="text-base text-gray-700 mb-2.5 flex items-center before:content-['📍'] before:mr-1 group-hover:text-gray-300">
                        {event.location}
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-300">
                        {event.description}
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
          <h2 className="text-xl font-semibold mb-8 text-center bg-gray-200 w-full text-black border-none p-2 md:text-lg md:p-1.5">
            Past Events
          </h2>
          <div className="space-y-6">
            {pastEvents.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-red-600 text-base shadow-sm">
                No past events available at this time.
              </div>
            ) : (
              pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="block no-underline text-inherit">
                  <div className="flex bg-white rounded-3xl mb-5 overflow-hidden transition-all duration-300 relative cursor-pointer p-6 border-3 border-gray-200 hover:scale-105 hover:shadow-lg hover:bg-gray-800 hover:text-white hover:border-none group md:flex-col md:p-4">
                    <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <div className="flex-shrink-0 w-120 bg-cover bg-center min-h-36 rounded-2xl overflow-hidden md:flex-none md:w-full md:mb-4">
                      <Image
                        src={event.cover_url}
                        alt={event.event_name}
                        width={480}
                        height={260}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-5 relative z-20 md:p-0">
                      <div className="text-sm text-gray-500 font-medium mb-1 group-hover:text-gray-300">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-2xl font-semibold text-green-600 mb-2 group-hover:text-white">
                        {event.event_name}
                      </div>
                      <div className="text-base text-gray-700 mb-2.5 flex items-center before:content-['📍'] before:mr-1 group-hover:text-gray-300">
                        {event.location}
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-300">
                        {event.description}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
