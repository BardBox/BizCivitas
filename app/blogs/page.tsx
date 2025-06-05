import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogs, formatBlogDate, getBlogReadTime, type Blog } from "@/lib/blogs";
import { Suspense } from "react";
import SearchAndRecentPosts from "@/components/SearchAndRecentPost";
import "./blog-cards.css";
import TopSection from "@/components/TopSection";
import { generateSEOTags, generateOptimizedImageSizes } from "@/lib/seo-utils";

// Enhanced ISR with 30-second revalidation for better freshness
export const revalidate = 30;

export const metadata: Metadata = {
  title: "Business Blogs | BizCivitas - Expert Analysis & Industry Insights",
  description:
    "Discover expert business blogs, industry analysis, and growth strategies from BizCivitas. Stay ahead with our latest articles on entrepreneurship, business innovation, and professional development.",
  keywords: [
    "business blogs",
    "industry analysis",
    "business insights",
    "entrepreneurship blogs",
    "business growth strategies",
    "startup blogs",
    "BizCivitas blogs",
    "business strategy articles",
    "professional development",
    "business innovation",
    "thought leadership",
    "business advice"
  ],
  openGraph: {
    title: "Business Blogs | BizCivitas - Expert Analysis & Industry Insights",
    description:
      "Discover expert business blogs, industry analysis, and growth strategies from BizCivitas.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/blogs`,
    images: [
      {
        url: "/og-blogs.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Business Blogs - Expert Analysis",
      },
    ],
    siteName: "BizCivitas",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Blogs | BizCivitas - Expert Analysis & Industry Insights",
    description:
      "Discover expert business blogs, industry analysis, and growth strategies from BizCivitas.",
    site: "@BizCivitas",
    creator: "@BizCivitas",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/blogs`,
  },
  other: {
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "og:locale": "en_US",
    "og:site_name": "BizCivitas",
  },
};

// Define topic types matching your enum
const TOPIC_TYPES = [
  "All",
  "Blogs",
  "BizCivitas",
  "Business Travel",
  "Networking",
  "Tech",
  "Business",
  "Marketing",
  "Design",
  "others",
];

interface BlogsPageProps {
  searchParams: Promise<{ topic?: string; search?: string }>;
}

export default async function BlogsPage({
  searchParams,
}: BlogsPageProps) {
  const params = await searchParams;
  const selectedTopic = params.topic || "All";
  const searchQuery = params.search || "";

  const allBlogs = await getAllBlogs();

  // Filter blogs based on selected topic and search query
  let filteredBlogs = selectedTopic === "All"
    ? allBlogs
    : allBlogs.filter((blog) => blog.type_of_topic === selectedTopic);

  // Apply search filter if search query exists
  if (searchQuery) {
    filteredBlogs = filteredBlogs.filter((blog) =>
      (blog.topic_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (blog.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (blog.author_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );
  }

  // Get recent posts (latest 5)
  const recentPosts = allBlogs.slice(0, 5);

  // Count blogs per topic for tab counters
  const topicCounts = TOPIC_TYPES.reduce(
    (acc, topic) => {
      if (topic === "All") {
        acc[topic] = allBlogs.length;
      } else {
        acc[topic] = allBlogs.filter(
          (blog) => blog.type_of_topic === topic,
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Business Blogs | BizCivitas",
    description:
      "Expert business blogs, industry analysis, and growth strategies from BizCivitas.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/blogs`,
    publisher: {
      "@type": "Organization",
      name: "BizCivitas",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com",
      sameAs: [
        "https://www.youtube.com/@BizCivitas",
        "https://www.linkedin.com/company/bizcivitas/",
        "https://www.facebook.com/bizcivitas/",
        "https://www.instagram.com/bizcivitas/"
      ],
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: filteredBlogs.length,
      itemListElement: filteredBlogs.slice(0, 10).map((blog, index) => ({
        "@type": "Article",
        position: index + 1,
        name: blog.topic_name || "Untitled Article",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/blogs/${blog.slug}`,
        author: {
          "@type": "Person",
          name: blog.author_name || "BizCivitas",
        },
        datePublished: blog.date,
        image: blog.cover_url || "/placeholder-event.jpg",
      })),
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
          name: "Blogs",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"
            }/blogs`,
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
        {/* Hero Video Section */}
        <TopSection
          heading="Blogs"
          subheading="Stay up to date with the most recent blogs, insights, trends, articles, and news from Bizcivitas around the world."
          backgroundImage="/blogs/heroBlogs.png"
        />

        {/* Mobile Search Bar - Only visible on mobile, positioned at top */}
        <div className="lg:hidden px-4 sm:px-6 py-4 bg-white border-b border-gray-200">
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>}>
            <SearchAndRecentPosts 
              recentPosts={recentPosts}
              currentSearch={searchQuery}
              currentTopic={selectedTopic}
            />
          </Suspense>
        </div>

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
                    href={
                      topic === "All"
                        ? "/blogs"
                        : `/blogs?topic=${encodeURIComponent(topic)}`
                    }
                    className={`
                      inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${isActive
                        ? "bg-flat-btn-primary text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-flat-btn-primary hover:text-white"
                      }
                    `}
                  >
                    {topic}
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-300 text-gray-600"
                        }`}
                    >
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-8 lg:py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Area */}
              <div className="flex-1">
                {/* Results Summary */}
                <header className="mb-6 lg:mb-8 text-center lg:text-left">
                  <p className="text-gray-600 text-sm lg:text-base">
                    {searchQuery ? (
                      <>
                        Showing {filteredBlogs.length} results for "{searchQuery}"
                        {selectedTopic !== "All" && ` in "${selectedTopic}"`}
                      </>
                    ) : selectedTopic === "All" ? (
                      `Showing all ${filteredBlogs.length} blogs`
                    ) : (
                      `Showing ${filteredBlogs.length} blogs in "${selectedTopic}"`
                    )}
                  </p>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                        {searchQuery ? (
                          `No blogs found for "${searchQuery}"`
                        ) : selectedTopic === "All" ? (
                          "No blogs available at this time."
                        ) : (
                          `No blogs found in "${selectedTopic}" category.`
                        )}
                      </h2>
                      <p className="text-sm text-gray-500 mt-2">
                        {searchQuery ? (
                          "Try adjusting your search terms or browse all insights."
                        ) : selectedTopic === "All" ? (
                          "Check back soon for new expert blogs!"
                        ) : (
                          "Try selecting a different category or view all blogs."
                        )}
                      </p>
                      {(selectedTopic !== "All" || searchQuery) && (
                        <Link
                          href="/blogs"
                          className="inline-block mt-4 px-4 py-2 bg-flat-btn-primary text-white rounded-lg hover:bg-flat-btn-primary/90 transition-colors"
                        >
                          View All Blogs
                        </Link>
                      )}
                    </div>
                  ) : (
                    filteredBlogs.map((blog) => (
                      <article key={blog.id}>
                        <Link href={`/blogs/${blog.slug}`} className="block">
                          <div className="custom-blog-card">
                            <div className="image-container">
                              <Image
                                src={blog.cover_url || "/placeholder-event.jpg"}
                                alt={blog.topic_name || "Blog post"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading="lazy"
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
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16.7714 16.7702V1.30797M16.7714 1.30797H1.30922M16.7714 1.30797L1.30922 16.7702"
                                      stroke="white"
                                      strokeWidth="3.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <h3>{blog.topic_name || "Untitled Article"}</h3>
                              {blog.description && <p>{blog.description}</p>}
                              <div className="meta-info">
                                <div>
                                  By {blog.author_name || "BizCivitas"} on{" "}
                                  {formatBlogDate(blog.date)}
                                </div>
                                {blog.content && (
                                  <div className="mt-1">
                                    {getBlogReadTime(blog.content)} min read
                                  </div>
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

              {/* Desktop Sidebar - Hidden on mobile */}
              <aside className="hidden lg:block lg:w-80">
                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}>
                  <SearchAndRecentPosts
                    recentPosts={recentPosts}
                    currentSearch={searchQuery}
                    currentTopic={selectedTopic}
                  />
                </Suspense>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}