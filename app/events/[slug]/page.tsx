
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import EventDetailClient from './EventDetailClient';

interface Event {
  id: number;
  slug: string;
  event_name: string;
  date: string;
  location: string;
  description: string;
  cover_url: string;
  type: string;
  long_description?: string;
}

// Mock data - replace with actual database calls
const mockEvents: Event[] = [
  {
    id: 1,
    slug: "quarterly-business-summit-2024",
    event_name: "Quarterly Business Summit 2024",
    date: "2024-03-15",
    location: "Grand Convention Center, NYC",
    description: "Join industry leaders for our quarterly business summit featuring keynote speakers, networking sessions, and strategic discussions about the future of business.",
    cover_url: "https://via.placeholder.com/1200x400?text=Business+Summit",
    type: "upcoming",
    long_description: "Our Quarterly Business Summit brings together the most innovative minds in business for a day of learning, networking, and strategic planning. This premier event features renowned keynote speakers, interactive workshops, and exclusive networking opportunities. Attendees will gain valuable insights into market trends, emerging technologies, and business strategies that drive success in today's competitive landscape. Join us for an unforgettable experience that will transform your approach to business and help you build meaningful professional relationships."
  },
  {
    id: 2,
    slug: "entrepreneur-networking-breakfast",
    event_name: "Entrepreneur Networking Breakfast",
    date: "2024-02-28",
    location: "Downtown Business Club",
    description: "Start your day with fellow entrepreneurs over breakfast. Share insights, discuss challenges, and build meaningful connections.",
    cover_url: "https://via.placeholder.com/1200x400?text=Networking+Breakfast",
    type: "upcoming",
    long_description: "Our monthly Entrepreneur Networking Breakfast provides a relaxed and intimate setting for business owners and entrepreneurs to connect over a delicious meal. This event focuses on building genuine relationships, sharing experiences, and creating opportunities for collaboration. Whether you're a seasoned entrepreneur or just starting your journey, you'll find valuable connections and insights that can help propel your business forward."
  },
  {
    id: 3,
    slug: "annual-gala-2023",
    event_name: "Annual Business Gala 2023",
    date: "2023-12-15",
    location: "Metropolitan Hotel Ballroom",
    description: "Our annual gala celebrating business achievements and recognizing outstanding contributions to the business community.",
    cover_url: "https://via.placeholder.com/1200x400?text=Annual+Gala",
    type: "past",
    long_description: "The Annual Business Gala is our signature event celebrating excellence in business and recognizing the outstanding achievements of our community members. This elegant evening features award presentations, inspiring speeches, and exceptional networking opportunities in a sophisticated atmosphere. Join us as we honor the leaders who have made significant contributions to our business community and enjoy an evening of celebration and recognition."
  }
];

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = mockEvents.find(e => e.slug === params.slug);
  
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
  };
}

export async function generateStaticParams() {
  return mockEvents.map((event) => ({
    slug: event.slug,
  }));
}

export default function EventDetailPage({ params }: PageProps) {
  const event = mockEvents.find(e => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
