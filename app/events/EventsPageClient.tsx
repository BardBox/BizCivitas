
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Event {
  id: number;
  slug: string;
  event_name: string;
  date: string;
  location: string;
  description: string;
  cover_url: string;
  type: string;
}

interface EventsPageClientProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function EventsPageClient({ upcomingEvents, pastEvents }: EventsPageClientProps) {
  const router = useRouter();

  const handleEventClick = (slug: string) => {
    router.push(`/events/${slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center border-b-2 border-green-600 inline-block pb-2">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="bg-white rounded-lg p-6 text-center text-red-600 shadow-sm">
                No upcoming events available at this time.
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card group cursor-pointer"
                  onClick={() => handleEventClick(event.slug)}
                >
                  <div className="event-image">
                    <Image
                      src={event.cover_url}
                      alt={event.event_name}
                      width={480}
                      height={260}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="event-content">
                    <div className="event-date text-gray-500 text-sm font-medium mb-2">
                      {formatDate(event.date)}
                    </div>
                    <div className="event-name text-2xl font-semibold text-green-600 mb-2 group-hover:text-white">
                      {event.event_name}
                    </div>
                    <div className="event-location text-gray-700 mb-3 flex items-center group-hover:text-gray-300">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </div>
                    <div className="event-description text-gray-600 text-sm leading-relaxed group-hover:text-gray-300">
                      {event.description}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center border-b-2 border-green-600 inline-block pb-2">
            Past Events
          </h2>
          <div className="space-y-6">
            {pastEvents.length === 0 ? (
              <div className="bg-white rounded-lg p-6 text-center text-red-600 shadow-sm">
                No past events available at this time.
              </div>
            ) : (
              pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card group cursor-pointer"
                  onClick={() => handleEventClick(event.slug)}
                >
                  <div className="event-image">
                    <Image
                      src={event.cover_url}
                      alt={event.event_name}
                      width={480}
                      height={260}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="event-content">
                    <div className="event-date text-gray-500 text-sm font-medium mb-2">
                      {formatDate(event.date)}
                    </div>
                    <div className="event-name text-2xl font-semibold text-green-600 mb-2 group-hover:text-white">
                      {event.event_name}
                    </div>
                    <div className="event-location text-gray-700 mb-3 flex items-center group-hover:text-gray-300">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </div>
                    <div className="event-description text-gray-600 text-sm leading-relaxed group-hover:text-gray-300">
                      {event.description}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        .event-card {
          display: flex;
          background-color: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          position: relative;
          padding: 24px;
          border: 3px solid #e6e6e6;
        }

        .event-card:hover {
          transform: scale(1.02);
          box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
          background-color: #333333;
          border: none;
        }

        .event-image {
          flex: 0 0 480px;
          min-height: 150px;
          border-radius: 16px;
          overflow: hidden;
        }

        .event-content {
          flex: 1;
          padding: 20px;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .event-card {
            flex-direction: column;
            padding: 16px;
          }

          .event-image {
            flex: none;
            width: 100%;
            min-height: 150px;
            margin-bottom: 16px;
          }

          .event-content {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}
