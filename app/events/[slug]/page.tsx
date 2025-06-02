import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventBySlug, getAllEvents, getEventSEOData } from "@/lib/events";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateISO(dateString: string) {
  return new Date(dateString).toISOString();
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
            <video
              className="w-full h-full object-cover"
              src="http://deeppink-starling-710457.hostingersite.com/wp-content/uploads/2025/05/Think-your-next-big-idea-is-stuck-in-a-boardroom_-Think-again.-_airbnb-_uber-_solarcity-_business1080P_HD.mp4"
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              preload="auto"
              poster="/video-poster.jpg"
              aria-label="Business innovation video showing successful companies like Airbnb, Uber, and SolarCity"
            />
          </div>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {event.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Register Now
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200">
                  Share Event
                </button>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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

                    {/* Image Gallery */}
                    {event.image_urls && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Event Gallery
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {event.image_urls.map((imageUrl, index) => (
                            <div
                              key={index}
                              className="relative h-32 rounded-lg overflow-hidden"
                            >
                              <Image
                                src={imageUrl.trim()}
                                alt={`${event.event_name} gallery image ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* YouTube Videos */}
                    {event.youtube_links && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Event Videos
                        </h3>
                        <div className="space-y-4">
                          {event.youtube_links.map((youtubeLink, index) => {
                            const videoId = youtubeLink
                              .trim()
                              .split("v=")[1]
                              ?.split("&")[0];
                            return (
                              <div
                                key={index}
                                className="relative aspect-video rounded-lg overflow-hidden"
                              >
                                <iframe
                                  src={`https://www.youtube.com/embed/${videoId}`}
                                  title={`${event.event_name} video ${index + 1}`}
                                  className="w-full h-full"
                                  allowFullScreen
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
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
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Register for Event
                    </button>
                    <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                      Add to Calendar
                    </button>
                  </div>

                  {/* Social Share */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-3">
                      Share this event
                    </p>
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                        Facebook
                      </button>
                      <button className="flex-1 bg-blue-400 text-white py-2 px-3 rounded text-sm hover:bg-blue-500 transition-colors">
                        Twitter
                      </button>
                      <button className="flex-1 bg-blue-700 text-white py-2 px-3 rounded text-sm hover:bg-blue-800 transition-colors">
                        LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
              <Link
                href="/events"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View All Events
              </Link>
              <Link
                href="/"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Learn More About BizCivitas
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
