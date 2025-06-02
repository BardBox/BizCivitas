
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getEventBySlug, getAllEvents } from '@/lib/events';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  
  if (!event) {
    return {
      title: "Event Not Found - BizCivitas",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: `${event.event_name} | BizCivitas Events`,
    description: event.description,
    keywords: [`${event.event_name}`, "business event", "networking", "BizCivitas", event.location],
    openGraph: {
      title: `${event.event_name} | BizCivitas`,
      description: event.description,
      type: "article",
      url: `https://bizcivitas.com/events/${event.slug}`,
      images: [
        {
          url: event.cover_url,
          width: 1200,
          height: 400,
          alt: event.event_name,
        },
      ],
      publishedTime: event.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.event_name} | BizCivitas`,
      description: event.description,
      images: [event.cover_url],
    },
    alternates: {
      canonical: `/events/${event.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="event-details">
          {/* Event Banner */}
          <div className="event-details-banner" style={{ backgroundImage: `url('${event.cover_url}')` }}>
            <div className="event-details-banner-content">
              <h1 className="event-title">{event.event_name}</h1>
              <div className="date-location">
                {formatDate(event.date)} • {event.location}
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div className="event-details-content">
            <div className="description">
              {event.long_description || event.description}
            </div>
            
            <Link href="/events" className="back-button">
              Back to Events
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .event-details {
          background-color: #ffffff;
          border-radius: 12px;
          margin: 20px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .event-details-banner {
          position: relative;
          width: 100%;
          min-height: 400px;
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #fff;
        }

        .event-details-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        .event-details-banner-content {
          position: relative;
          z-index: 2;
          padding: 20px;
        }

        .event-title {
          font-size: 3rem;
          font-weight: 700;
          color: #f5a623;
          text-transform: uppercase;
          margin-bottom: 10px;
          letter-spacing: 2px;
        }

        .date-location {
          font-size: 1.2rem;
          color: #ddd;
          margin-top: 15px;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 5px 15px;
          border-radius: 5px;
          display: inline-block;
        }

        .event-details-content {
          padding: 30px;
        }

        .description {
          font-size: 1rem;
          color: #5c6b73;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .back-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #28a745;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          margin-top: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 16px;
          text-decoration: none;
        }

        .back-button:hover {
          background-color: #218838;
        }

        @media (max-width: 768px) {
          .event-details {
            margin: 10px;
          }

          .event-details-banner {
            min-height: 300px;
          }

          .event-title {
            font-size: 2rem;
          }

          .date-location {
            font-size: 1rem;
          }

          .event-details-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
