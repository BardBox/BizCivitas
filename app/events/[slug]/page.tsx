
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getEventBySlug, getAllEvents, getEventSEOData } from '@/lib/events';

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

  const seoData = getEventSEOData(event);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      type: "article",
      url: `https://bizcivitas.com/events/${event.slug}`,
      images: [
        {
          url: seoData.ogImage,
          width: 1200,
          height: 630,
          alt: event.event_name,
        },
      ],
      publishedTime: event.date,
      siteName: "BizCivitas",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: [seoData.twitterImage],
    },
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    other: {
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'article:author': 'BizCivitas',
      'article:section': 'Events',
      'article:tag': event.event_name,
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

function formatDateISO(dateString: string) {
  return new Date(dateString).toISOString();
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.event_name,
    "description": event.description,
    "startDate": formatDateISO(event.date),
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": event.location
    },
    "image": event.cover_url || '/placeholder-event.jpg',
    "organizer": {
      "@type": "Organization",
      "name": "BizCivitas",
      "url": "https://bizcivitas.com"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://bizcivitas.com/events/${event.slug}`,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative">
          <div className="h-[60vh] min-h-[400px] relative overflow-hidden">
            <Image
              src={event.cover_url || '/placeholder-event.jpg'}
              alt={event.event_name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center bg-blue-600/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.date)}
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {event.event_name}
                  </h1>
                  {event.location && (
                    <div className="flex items-center text-white/90 text-lg mb-6">
                      <svg className="w-5 h-5 mr-2 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 lg:p-12">
                  <header className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  </header>
                  
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      {event.description && (
                        <div>
                          <p className="text-xl leading-relaxed font-medium text-gray-800 mb-6">
                            {event.description}
                          </p>
                        </div>
                      )}
                      
                      {event.long_description && (
                        <div className="space-y-4">
                          {event.long_description.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                              <p key={index} className="text-gray-700 leading-relaxed">
                                {paragraph.trim()}
                              </p>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Event Details Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Event Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-gray-500">Date</dt>
                        <dd className="text-lg font-semibold text-gray-900">{formatDate(event.date)}</dd>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <dt className="text-sm font-medium text-gray-500">Location</dt>
                          <dd className="text-lg font-semibold text-gray-900">{event.location}</dd>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-gray-500">Organizer</dt>
                        <dd className="text-lg font-semibold text-gray-900">BizCivitas</dd>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-blue-100 mb-6">
                    Don't miss out on future networking opportunities and exclusive events.
                  </p>
                  <Link
                    href="/memberships"
                    className="inline-flex items-center justify-center w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Explore Memberships
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                href="/events"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Events
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">Share:</span>
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
