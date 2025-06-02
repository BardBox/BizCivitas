
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
      <div className="container">
        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2>Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="no-events">
                No upcoming events available at this time.
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="event-card-link">
                  <div className="event-card">
                    <div className="event-image">
                      <Image
                        src={event.cover_url}
                        alt={event.event_name}
                        width={480}
                        height={260}
                        className="event-image-img"
                        priority={event.id <= 2}
                      />
                    </div>
                    <div className="event-content">
                      <div className="event-date">
                        {formatDate(event.date)}
                      </div>
                      <div className="event-name">
                        {event.event_name}
                      </div>
                      <div className="event-location">
                        {event.location}
                      </div>
                      <div className="event-description">
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
          <h2>Past Events</h2>
          <div className="space-y-6">
            {pastEvents.length === 0 ? (
              <div className="no-events">
                No past events available at this time.
              </div>
            ) : (
              pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="event-card-link">
                  <div className="event-card">
                    <div className="event-image">
                      <Image
                        src={event.cover_url}
                        alt={event.event_name}
                        width={480}
                        height={260}
                        className="event-image-img"
                      />
                    </div>
                    <div className="event-content">
                      <div className="event-date">
                        {formatDate(event.date)}
                      </div>
                      <div className="event-name">
                        {event.event_name}
                      </div>
                      <div className="event-location">
                        {event.location}
                      </div>
                      <div className="event-description">
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

      <styles>{`
        .container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 20px;
        }

        h2 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 30px;
          color: #2c3e50;
          text-align: center;
          border-bottom: 2px solid #28a745;
          display: inline-block;
          padding-bottom: 5px;
          background: #E6E6E6;
          width: 100%;
          color: #000000;
          border: none;
          font-size: 20px;
          padding: 8px;
        }

        .event-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .event-card {
          display: flex;
          background-color: #ffffff;
          border-radius: 24px;
          margin-bottom: 20px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          cursor: pointer;
          padding: 24px 24px 24px 24px;
          border: 3px solid #e6e6e6;
        }

        .event-card:hover {
          transform: scale(1.02);
          box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
          background-color: #333333;
          color: #fff;
          border: none;
        }

        .event-card:hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.1);
          z-index: 1;
          transition: background-color 0.3s ease;
        }

        .event-image {
          flex: 0 0 480px;
          background-size: cover;
          background-position: center;
          min-height: 150px;
          border-radius: 16px;
          overflow: hidden;
        }

        .event-image-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-content {
          flex: 1;
          padding: 20px;
          position: relative;
          z-index: 2;
        }

        .event-date {
          font-size: 14px;
          color: #7f8c8d;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .event-card:hover .event-date {
          color: #ccc;
        }

        .event-name {
          font-size: 26px;
          font-weight: 600;
          color: #28a745;
          margin: 0 0 8px;
        }

        .event-card:hover .event-name {
          color: #fff;
        }

        .event-location {
          font-size: 16px;
          color: #34495e;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }

        .event-location::before {
          content: "📍";
          margin-right: 5px;
        }

        .event-card:hover .event-location {
          color: #ddd;
        }

        .event-description {
          font-size: 14px;
          color: #5c6b73;
          line-height: 1.6;
        }

        .event-card:hover .event-description {
          color: #ccc;
        }

        .no-events {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          color: #e74c3c;
          font-size: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }

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

          h2 {
            font-size: 18px;
            padding: 6px;
          }
        }
      `}</styles>
    </div>
  );
}
