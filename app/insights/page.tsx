
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogs, formatBlogDate, getBlogReadTime } from "@/lib/blogs";
import "./blog-cards.css";

// Enable ISR with 60-second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Business Insights | BizCivitas - Expert Analysis & Trends",
  description:
    "Discover expert business insights, industry analysis, and growth strategies from BizCivitas. Stay ahead with our latest articles on entrepreneurship and business innovation.",
  keywords: [
    "business insights",
    "industry analysis",
    "business trends",
    "entrepreneurship",
    "business growth",
    "startup insights",
    "BizCivitas insights",
    "business strategy",
  ],
  openGraph: {
    title: "Business Insights | BizCivitas - Expert Analysis & Trends",
    description:
      "Stay ahead with expert business insights and industry analysis from BizCivitas.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/insights`,
    images: [
      {
        url: "/og-insights.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Business Insights - Expert Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Insights | BizCivitas - Expert Analysis & Trends",
    description:
      "Stay ahead with expert business insights and industry analysis from BizCivitas.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/insights`,
  },
  other: {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'og:locale': 'en_US',
    'og:site_name': 'BizCivitas',
  },
};

// Define topic types matching your enum
const TOPIC_TYPES = [
  'All',
  'Blogs',
  'BizCivitas',
  'Business Travel',
  'Networking',
  'Tech',
  'Business',
  'Marketing',
  'Design',
  'others'
];

interface InsightsPageProps {
  searchParams: Promise<{ topic?: string }>;
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const params = await searchParams;
  const selectedTopic = params.topic || 'All';
  
  const allBlogs = await getAllBlogs();
  
  // Filter blogs based on selected topic
  const filteredBlogs = selectedTopic === 'All' 
    ? allBlogs 
    : allBlogs.filter(blog => blog.type_of_topic === selectedTopic);

  // Count blogs per topic for tab counters
  const topicCounts = TOPIC_TYPES.reduce((acc, topic) => {
    if (topic === 'All') {
      acc[topic] = allBlogs.length;
    } else {
      acc[topic] = allBlogs.filter(blog => blog.type_of_topic === topic).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Business Insights | BizCivitas",
    description:
      "Expert business insights, industry analysis, and growth strategies from BizCivitas.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/insights`,
    publisher: {
      "@type": "Organization",
      name: "BizCivitas",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/logo.png`
      }
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: filteredBlogs.length,
      itemListElement: filteredBlogs.slice(0, 10).map((blog, index) => ({
        "@type": "Article",
        position: index + 1,
        name: blog.topic_name,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/insights/${blog.slug}`,
        author: {
          "@type": "Person",
          name: blog.author_name || "BizCivitas"
        },
        datePublished: blog.date,
        image: blog.cover_url
      }))
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Insights",
          item: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"
          }/insights`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 flat-text-heading">
                Business <span className="text-flat-btn-primary">Insights</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto flat-text-body">
                Expert analysis, industry trends, and actionable insights to
                drive your business forward.
              </p>
            </div>
          </div>
        </section>

        {/* Topic Filter Tabs */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {TOPIC_TYPES.map((topic) => {
                const isActive = selectedTopic === topic;
                const count = topicCounts[topic] || 0;
                
                return (
                  <Link
                    key={topic}
                    href={topic === 'All' ? '/insights' : `/insights?topic=${encodeURIComponent(topic)}`}
                    className={`
                      inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-flat-btn-primary text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-flat-btn-primary hover:text-white'
                      }
                    `}
                  >
                    {topic}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Insights Grid */}
        <section className="py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Summary */}
            <header className="mb-8 text-center">
              <p className="text-gray-600">
                {selectedTopic === 'All' 
                  ? `Showing all ${filteredBlogs.length} insights`
                  : `Showing ${filteredBlogs.length} insights in "${selectedTopic}"`
                }
              </p>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.length === 0 ? (
                <div className="col-span-full bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h2 className="text-lg text-gray-900 font-semibold">
                    {selectedTopic === 'All' 
                      ? 'No insights available at this time.'
                      : `No insights found in "${selectedTopic}" category.`
                    }
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedTopic === 'All' 
                      ? 'Check back soon for new expert insights!'
                      : 'Try selecting a different category or view all insights.'
                    }
                  </p>
                  {selectedTopic !== 'All' && (
                    <Link 
                      href="/insights" 
                      className="inline-block mt-4 px-4 py-2 bg-flat-btn-primary text-white rounded-lg hover:bg-flat-btn-primary/90 transition-colors"
                    >
                      View All Insights
                    </Link>
                  )}
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <article key={blog.id}>
                    <Link
                      href={`/insights/${blog.slug}`}
                      className="block"
                    >
                      <div className="custom-blog-card">
                        <div className="image-container">
                          <Image
                            src={blog.cover_url || "/placeholder-event.jpg"}
                            alt={blog.topic_name || "Blog post"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="content">
                          <div className="hori">
                            {blog.type_of_topic && (
                              <div className="type-label">
                                {blog.type_of_topic}
                              </div>
                            )}
                            <div className="icon-circle">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.7714 16.7702V1.30797M16.7714 1.30797H1.30922M16.7714 1.30797L1.30922 16.7702" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          <h3>{blog.topic_name}</h3>
                          {blog.description && (
                            <p>{blog.description}</p>
                          )}
                          <div className="meta-info">
                            <div>By {blog.author_name || "BizCivitas"} on {formatBlogDate(blog.date)}</div>
                            {blog.content && (
                              <div className="mt-1">{getBlogReadTime(blog.content)} min read</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))
              )}
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
