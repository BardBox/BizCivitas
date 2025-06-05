import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventBySlug, getAllEvents, getEventSEOData } from "@/lib/events";
import ImageCarousel from "@/components/ImageCarousel";
import ShareButton from "@/components/ShareButton";
import EnhancedCTA from "@/components/EnhancedCTA";
import EventRegistrationButton from "@/components/EventRegistrationButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enable ISR with 300-second (5 minutes) revalidation for individual events
export const revalidate = 30;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  console.log(event);
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
      robots:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      "article:author": "BizCivitas",
      "article:section": "Events",
      "article:tag": event.event_name,
    },
  };
}

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.event_name,
    description: event.description,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: event.cover_url,
    organizer: {
      "@type": "Organization",
      name: "BizCivitas",
      url: "https://bizcivitas.com",
    },
    url: `https://bizcivitas.com/events/${event.slug}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    video: {
      "@type": "VideoObject",
      name: "Business Innovation - Transform Your Vision Into Reality",
      description:
        "Inspiring video showcasing how great business ideas like Airbnb, Uber, and SolarCity transformed from concepts to successful companies.",
      contentUrl:
        "http://deeppink-starling-710457.hostingersite.com/wp-content/uploads/2025/05/Think-your-next-big-idea-is-stuck-in-a-boardroom_-Think-again.-_airbnb-_uber-_solarcity-_business1080P_HD.mp4",
      thumbnailUrl: "/video-poster.jpg",
      uploadDate: "2025-01-24",
      duration: "PT30S",
    },
  };

  return (
    <>
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Video Section */}
        <section className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {event.cover_url && (
              <div className="h-screen relative">
                <Image
                  src={event.cover_url}
                  alt={event.event_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                />
              </div>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.62)' }}>
            <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="inline-flex items-center bg-blue-600/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(event.date)}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {event.event_name}
              </h1>
              {event.location && (
                <div className="text-white/90 text-lg mb-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </div>
              )}
              {event.description && (
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto line-clamp-3">
                  {event.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {event.type === "upcoming" ? (
                  <EventRegistrationButton
                    eventName={event.event_name}
                    eventSlug={event.slug}
                    variant="orange-rounded"
                    size="md"
                  />
                ) : null}
                <ShareButton
                  url={`https://bizcivitas.com/events/${event.slug}`}
                  title={event.event_name}
                  description={event.description}
                  className="enhanced-share-white"
                />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={event.type === "upcoming" ? "grid grid-cols-1 lg:grid-cols-3 gap-12" : ""}>
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {event.cover_url && (
                    <div className="h-64 relative">
                      <Image
                        src={event.cover_url}
                        alt={event.event_name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      About This Event
                    </h2>
                    {event.description && (
                      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                        {event.description
                          .split("\n")
                          .map((paragraph, index) => (
                            <p key={index} className="mb-4">
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    )}

                    {/* Image Gallery with Framer Motion Carousel */}
                    {event.image_urls && (
                      <ImageCarousel
                        images={Array.isArray(event.image_urls)
                          ? event.image_urls
                          : event.image_urls.split(",").map(url => url.trim()).filter(url => url.length > 0)}
                        eventName={event.event_name}
                      />
                    )}

                    {/* YouTube Videos */}
                    {event.youtube_links ? (
                      <div className="mt-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Event Videos...
                          </h3>
                        <div className="space-y-6">
                          {(() => {
                            const links = event.youtube_links instanceof Array
                              ? event.youtube_links
                              : event.youtube_links.split(",");

                            return links.map((youtubeLink, index) => {
                              const linkStr = typeof youtubeLink === "string"
                                ? youtubeLink.trim()
                                : String(youtubeLink).trim();

                              // Extract video ID from various YouTube URL formats
                              let videoId = '';

                              if (linkStr.includes('youtu.be/')) {
                                videoId = linkStr.split('youtu.be/')[1]?.split('?')[0];
                              } else if (linkStr.includes('youtube.com/watch?v=')) {
                                videoId = linkStr.split('v=')[1]?.split('&')[0];
                              } else if (linkStr.includes('youtube.com/embed/')) {
                                videoId = linkStr.split('embed/')[1]?.split('?')[0];
                              }

                              if (!videoId) return null;

                              return (
                                <div key={index} className="bg-gray-50 rounded-xl p-4">
                                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
                                    <iframe
                                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`}
                                      title={`${event.event_name} video ${index + 1}`}
                                      className="w-full h-full"
                                      allowFullScreen
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="mt-3 flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                      Video {index + 1} of {links.length}
                                    </p>
                                    <a
                                      href={linkStr}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                      Watch on YouTube
                                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              );
                            }).filter(Boolean);
                          })()}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              {event.type === "upcoming" ? (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Event Details
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-3 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <div>
                          <p className="font-medium text-gray-900">Date & Time</p>
                          <p className="text-gray-600">
                            {formatDate(event.date)}
                          </p>
                        </div>
                      </div>

                      {event.location && (
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-3 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">Location</p>
                            <p className="text-gray-600">{event.location}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-3 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div>
                          <p className="font-medium text-gray-900">Organizer</p>
                          <p className="text-gray-600">BizCivitas</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <EventRegistrationButton
                        eventName={event.event_name}
                        eventSlug={event.slug}
                        variant="primary"
                        size="md"
                        className="w-full"
                      />
                    </div>

                    {/* Social Share */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex justify-center">
                        <ShareButton
                          url={`https://bizcivitas.com/events/${event.slug}`}
                          title={event.event_name}
                          description={event.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}


            </div>
          </div>
        </section>

        {/* Related Events or CTA Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join BizCivitas events and connect with industry leaders,
              innovators, and like-minded professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedCTA href="/events" variant="primary" size="lg">
                View All Events
              </EnhancedCTA>
              <EnhancedCTA href="/" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                Learn More About BizCivitas
              </EnhancedCTA>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}