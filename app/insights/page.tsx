'use client';

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogs, formatBlogDate, getBlogReadTime } from "@/lib/blogs";


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

export default function InsightsPage() {
  const [blogs, setBlogs] = useState([]);
  const [structuredData, setStructuredData] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await getAllBlogs();
      setBlogs(allBlogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
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
      setStructuredData(structuredData);
    }
  }, [blogs]);


  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

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

        {/* Insights Grid */}
        <section className="py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.length === 0 ? (
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
                    No insights available at this time.
                  </p>
                  <p className="text-sm text-flat-text-muted mt-2">
                    Check back soon for new expert insights!
                  </p>
                </div>
              ) : (
                blogs.map((blog) => (
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