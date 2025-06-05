import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogs, getPaginatedBlogs, formatBlogDate, getBlogReadTime, type Blog } from "@/lib/blogs";
import { Suspense } from "react";
import SearchAndRecentPosts from "@/components/SearchAndRecentPost";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import "./blog-cards.css";
import TopSection from "@/components/TopSection";

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

interface InsightsPageProps {
  searchParams: Promise<{ topic?: string; search?: string; page?: string }>;
}

export default async function InsightsPage({
  searchParams,
}: InsightsPageProps) {
  const params = await searchParams;
  const selectedTopic = params.topic || "All";
  const searchQuery = params.search || "";
  const currentPage = parseInt(params.page || "1", 10);
  const blogsPerPage = 6;

  // Get paginated blogs and recent posts in parallel
  const [paginationResult, allBlogs] = await Promise.all([
    getPaginatedBlogs(currentPage, blogsPerPage, selectedTopic, searchQuery),
    getAllBlogs(5) // Get only 5 for recent posts
  ]);

  const { blogs: paginatedBlogs, totalCount: totalBlogs, totalPages } = paginationResult;
  const recentPosts = allBlogs;

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
    name: "Business Insights | BizCivitas",
    description:
      "Expert business insights, industry analysis, and growth strategies from BizCivitas.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/insights`,
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
      numberOfItems: totalBlogs,
      itemListElement: paginatedBlogs.map((blog, index) => ({
        "@type": "Article",
        position: index + 1,
        name: blog.topic_name || "Untitled Article",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/insights/${blog.slug}`,
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
          name: "Insights",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"
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
        {/* Hero Video Section */}
        <TopSection
          heading="Insights"
          subheading="Stay up to date with the most recent insights, trends, articles, and news from Bizcivitas around the world."
          backgroundImage="/insights/heroInsights.png"
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
                        ? "/insights"
                        : `/insights?topic=${encodeURIComponent(topic)}`
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-gray-600 text-sm lg:text-base">
                      {searchQuery ? (
                        <>
                          Showing {totalBlogs} results for "{searchQuery}"
                          {selectedTopic !== "All" && ` in "${selectedTopic}"`}
                        </>
                      ) : selectedTopic === "All" ? (
                        `Showing all ${totalBlogs} insights`
                      ) : (
                        `Showing ${totalBlogs} insights in "${selectedTopic}"`
                      )}
                    </p>
                    {totalPages > 1 && (
                      <p className="text-gray-500 text-sm">
                        Page {currentPage} of {totalPages}
                      </p>
                    )}
                  </div>
                </header>

                <Suspense 
                  fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                      {Array.from({ length: blogsPerPage }).map((_, i) => (
                        <BlogCardSkeleton key={i} />
                      ))}
                    </div>
                  }
                >
                  <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {paginatedBlogs.length === 0 ? (
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
                            `No insights found for "${searchQuery}"`
                          ) : selectedTopic === "All" ? (
                            "No insights available at this time."
                          ) : (
                            `No insights found in "${selectedTopic}" category.`
                          )}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                          {searchQuery ? (
                            "Try adjusting your search terms or browse all insights."
                          ) : selectedTopic === "All" ? (
                            "Check back soon for new expert insights!"
                          ) : (
                            "Try selecting a different category or view all insights."
                          )}
                        </p>
                        {(selectedTopic !== "All" || searchQuery) && (
                          <Link
                            href="/insights"
                            className="inline-block mt-4 px-4 py-2 bg-flat-btn-primary text-white rounded-lg hover:bg-flat-btn-primary/90 transition-colors"
                          >
                            View All Insights
                          </Link>
                        )}
                      </div>
                    ) : (
                      paginatedBlogs.map((blog, index) => (
                      <article key={blog.id}>
                        <Link href={`/insights/${blog.slug}`} className="block">
                          <div className="custom-blog-card">
                            <div className="image-container">
                              <Image
                                src={blog.cover_url || "/placeholder-event.jpg"}
                                alt={blog.topic_name || "Blog post"}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={index < 3}
                                loading={index < 3 ? "eager" : "lazy"}
                                quality={85}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                </Suspense>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-12 flex justify-center" aria-label="Pagination">
                    <div className="flex items-center space-x-2">
                      {/* Previous Button */}
                      {currentPage > 1 ? (
                        <Link
                          href={`/insights?${new URLSearchParams({
                            ...(selectedTopic !== "All" && { topic: selectedTopic }),
                            ...(searchQuery && { search: searchQuery }),
                            page: (currentPage - 1).toString(),
                          }).toString()}`}
                          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
                        >
                          Previous
                        </Link>
                      ) : (
                        <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
                          Previous
                        </span>
                      )}

                      {/* Page Numbers */}
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          const isCurrentPage = page === currentPage;
                          const showPage = 
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1);

                          if (!showPage) {
                            if (page === currentPage - 2 || page === currentPage + 2) {
                              return (
                                <span key={page} className="px-2 py-2 text-sm text-gray-500">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }

                          return (
                            <Link
                              key={page}
                              href={`/insights?${new URLSearchParams({
                                ...(selectedTopic !== "All" && { topic: selectedTopic }),
                                ...(searchQuery && { search: searchQuery }),
                                page: page.toString(),
                              }).toString()}`}
                              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                isCurrentPage
                                  ? "bg-flat-btn-primary text-white"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      {currentPage < totalPages ? (
                        <Link
                          href={`/insights?${new URLSearchParams({
                            ...(selectedTopic !== "All" && { topic: selectedTopic }),
                            ...(searchQuery && { search: searchQuery }),
                            page: (currentPage + 1).toString(),
                          }).toString()}`}
                          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
                        >
                          Next
                        </Link>
                      ) : (
                        <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
                          Next
                        </span>
                      )}
                    </div>
                  </nav>
                )}
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