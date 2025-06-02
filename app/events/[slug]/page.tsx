import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getEventBySlug, getAllEvents } from '@/lib/events';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

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
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl m-5 overflow-hidden shadow-lg">
          {/* Event Banner */}
          <div 
            className="relative w-full min-h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
            style={{ backgroundImage: `url('${event.cover_url}')` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
            <div className="relative z-20 p-5">
              <h1 className="text-5xl font-bold text-yellow-400 uppercase tracking-wider mb-3 md:text-3xl">
                {event.event_name}
              </h1>
              <div className="text-xl text-gray-300 mt-4 bg-black bg-opacity-50 px-4 py-1 rounded inline-block md:text-base">
                {formatDate(event.date)} • {event.location}
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div className="p-8 md:p-5">
            <div className="text-base text-gray-600 leading-relaxed mb-5">
              {event.long_description || event.description}
            </div>

            <Link 
              href="/events" 
              className="inline-block px-5 py-2.5 bg-green-600 text-white border-none rounded cursor-pointer text-base no-underline transition-colors duration-300 hover:bg-green-700 mt-5"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}