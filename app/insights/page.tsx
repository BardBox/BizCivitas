
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogs, formatBlogDate, getBlogReadTime } from "@/lib/blogs";

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
    canonical: "/insights",
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
    "@type": "WebPage",
    name: "Business Insights | BizCivitas",
    description:
      "Expert business insights, industry analysis, and growth strategies from BizCivitas.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/insights`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://bizcivitas.com",
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

      <div className="bg-flat-bg">
        {/* Hero Section */}
        <section className="py-16 bg-flat-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-flat-text-primary flat-text-heading">
                Business <span className="text-flat-btn-primary">Insights</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-flat-text-secondary max-w-3xl mx-auto flat-text-body">
                Expert analysis, industry trends, and actionable insights to
                drive your business forward.
              </p>
            </div>
          </div>
        </section>

        {/* Topic Filter Tabs */}
        <section className="py-8 bg-flat-surface border-b border-flat-border">
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
                        : 'bg-flat-bg text-flat-text-secondary hover:bg-flat-btn-primary hover:text-white'
                      }
                    `}
                  >
                    {topic}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-flat-text-muted/10 text-flat-text-muted'
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
            <div className="mb-8 text-center">
              <p className="text-flat-text-secondary">
                {selectedTopic === 'All' 
                  ? `Showing all ${filteredBlogs.length} insights`
                  : `Showing ${filteredBlogs.length} insights in "${selectedTopic}"`
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.length === 0 ? (
                <div className="col-span-full flat-card p-8 text-center text-flat-text-secondary">
                  <svg
                    className="w-16 h-16 text-flat-text-muted mx-auto mb-4"
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
                  <p className="text-lg flat-text-heading">
                    {selectedTopic === 'All' 
                      ? 'No insights available at this time.'
                      : `No insights found in "${selectedTopic}" category.`
                    }
                  </p>
                  <p className="text-sm text-flat-text-muted mt-2">
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
                  <Link
                    key={blog.id}
                    href={`/insights/${blog.slug}`}
                    className="block"
                  >
                    <div className="flat-card overflow-hidden group">
                      <div className="h-48 relative overflow-hidden">
                        <Image
                          src={blog.cover_url || "/placeholder-event.jpg"}
                          alt={blog.topic_name || "Blog post"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between text-sm text-flat-text-muted mb-2">
                          <span>{formatBlogDate(blog.date)}</span>
                          {blog.content && (
                            <span>{getBlogReadTime(blog.content)} min read</span>
                          )}
                        </div>
                        {blog.type_of_topic && (
                          <div className="text-xs text-flat-btn-primary font-semibold mb-2 uppercase tracking-wide">
                            {blog.type_of_topic}
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-flat-text-primary mb-2 group-hover:text-flat-btn-primary transition-colors line-clamp-2 flat-text-heading">
                          {blog.topic_name}
                        </h3>
                        {blog.author_name && (
                          <div className="text-sm text-flat-text-secondary mb-3">
                            By {blog.author_name}
                          </div>
                        )}
                        {blog.description && (
                          <p className="text-flat-text-secondary text-sm leading-relaxed line-clamp-3 flat-text-body">
                            {blog.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
