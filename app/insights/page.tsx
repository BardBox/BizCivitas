
import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogs, Blog } from '@/lib/blogs';

export const metadata: Metadata = {
  title: "Business Insights & Blogs | BizCivitas - Expert Analysis & Trends",
  description: "Discover expert business insights, industry analysis, and thought leadership articles from BizCivitas. Stay updated with the latest trends, strategies, and innovation in the business world.",
  keywords: ["business insights", "business blog", "industry analysis", "business trends", "thought leadership", "business strategy", "BizCivitas insights", "professional development"],
  openGraph: {
    title: "Business Insights & Blogs | BizCivitas - Expert Analysis & Trends",
    description: "Discover expert business insights, industry analysis, and thought leadership articles from BizCivitas.",
    type: "website",
    url: "https://bizcivitas.com/insights",
    images: [
      {
        url: "/og-insights.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Business Insights - Expert Analysis & Trends",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Insights & Blogs | BizCivitas - Expert Analysis & Trends",
    description: "Discover expert business insights, industry analysis, and thought leadership articles from BizCivitas.",
  },
  alternates: {
    canonical: "/insights",
  },
  other: {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default async function InsightsPage() {
  const blogs = await getAllBlogs();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Business Insights | BizCivitas",
    "description": "Discover expert business insights, industry analysis, and thought leadership articles from BizCivitas.",
    "url": "https://bizcivitas.com/insights",
    "mainEntity": {
      "@type": "Blog",
      "name": "BizCivitas Insights",
      "description": "Expert business insights and thought leadership",
      "publisher": {
        "@type": "Organization",
        "name": "BizCivitas",
        "url": "https://bizcivitas.com"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bizcivitas.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Insights",
          "item": "https://bizcivitas.com/insights"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Business <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Stay ahead with expert analysis, industry trends, and thought leadership from the world of business innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {blogs.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center text-gray-600 shadow-sm border">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Insights Available</h3>
                <p className="text-lg">Check back soon for the latest business insights and thought leadership articles!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link key={blog.id} href={`/insights/${blog.slug}`} className="block group">
                    <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 h-full">
                      {blog.cover_url && (
                        <div className="h-48 relative overflow-hidden">
                          <Image
                            src={blog.cover_url}
                            alt={blog.topic_name || 'Blog post'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        {blog.type_of_topic && (
                          <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                            {blog.type_of_topic}
                          </div>
                        )}
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.topic_name || 'Untitled Post'}
                        </h3>
                        
                        {blog.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {blog.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          {blog.author_name && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>{blog.author_name}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(blog.date)}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
