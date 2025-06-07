import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { getBlogBySlug, getAllBlogs, getBlogSEOData } from '@/lib/blogs';
import { generateSEOTags, generateOptimizedImageSizes } from '@/lib/seo-utils';
import { generateBlogPostSchema } from '@/lib/structured-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enhanced ISR with 180-second (3 minutes) revalidation for individual blogs
export const revalidate = 180;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found - BizCivitas Blogs",
      description: "The requested blog post could not be found.",
    };
  }

  const seoData = getBlogSEOData(blog);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/blogs/${blog.slug}`,
      images: [
        {
          url: seoData.ogImage,
          width: 1200,
          height: 630,
          alt: blog.topic_name || 'Blog post',
        },
      ],
      publishedTime: blog.date,
      modifiedTime: blog.updated_at || blog.date,
      authors: blog.author_name ? [blog.author_name] : undefined,
      siteName: "BizCivitas",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: [seoData.twitterImage],
      creator: blog.author_name ? `@${blog.author_name.replace(/\s+/g, '')}` : '@BizCivitas',
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    other: {
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'article:author': blog.author_name || 'BizCivitas',
      'article:section': 'Business Insights',
      'article:tag': blog.type_of_topic || 'Business',
      'article:published_time': blog.date,
      'article:modified_time': blog.updated_at || blog.date,
      'og:locale': 'en_US',
      'og:site_name': 'BizCivitas',
    },
  };
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Extract text content for word count and reading time
  const textContent = blog.content ? blog.content.replace(/<[^>]*>/g, '') : '';
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

  // Enhanced structured data for blog post
  const blogPostSchema = generateBlogPostSchema({
    title: blog.topic_name || 'Untitled Post',
    description: blog.description || 'Business insights and analysis',
    slug: blog.slug,
    publishedAt: blog.date,
    updatedAt: blog.updated_at,
    author: blog.author_name || 'BizCivitas Team',
    imageUrl: blog.cover_url || "https://bizcivitas.com/og-blog.jpg",
    tags: [blog.type_of_topic, blog.topic_name].filter(Boolean) as string[]
  });

  // Additional structured data for comprehensive SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.topic_name || 'Untitled Post',
    "description": blog.description || 'Business insights and analysis',
    "datePublished": blog.date,
    "dateModified": blog.updated_at || blog.date,
    "author": {
      "@type": "Person",
      "name": blog.author_name || "BizCivitas Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BizCivitas",
      "url": "https://bizcivitas.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bizcivitas.com/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": blog.cover_url || "https://bizcivitas.com/og-blog.jpg",
      "width": 1200,
      "height": 630
    },
    "url": `https://bizcivitas.com/blogs/${blog.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bizcivitas.com/blogs/${blog.slug}`
    },
    "articleSection": blog.type_of_topic || "Business Insights",
    "keywords": [blog.topic_name, blog.type_of_topic, "business insights", "BizCivitas"].filter(Boolean).join(", "),
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "articleBody": textContent.substring(0, 300) + "...",
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
          "name": "Blogs",
          "item": "https://bizcivitas.com/blogs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": blog.topic_name || 'Untitled Post',
          "item": `https://bizcivitas.com/blogs/${blog.slug}`
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/blogs" className="text-blue-600 hover:text-blue-800">Blogs</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 truncate">{blog.topic_name}</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Article Header */}
            <header className="text-center mb-12">
              {blog.type_of_topic && (
                <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {blog.type_of_topic}
                </div>
              )}

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.topic_name || 'Untitled Post'}
              </h1>

              {blog.description && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {blog.description}
                </p>
              )}

              <div className="flex items-center justify-center space-x-6 text-gray-500 flex-wrap">
                {blog.author_name && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">{blog.author_name}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(blog.date)}</span>
                </div>

                {wordCount > 0 && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{readingTime} min read</span>
                  </div>
                )}

                {wordCount > 0 && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{wordCount.toLocaleString()} words</span>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {blog.cover_url && (
              <div className="mb-12">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={blog.cover_url}
                    alt={blog.topic_name || 'Blog post cover'}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
              {blog.content ? (
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-headings:font-semibold
                    prose-p:text-gray-800 prose-p:leading-relaxed
                    prose-a:text-flat-btn-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900
                    prose-ul:text-gray-800 prose-ol:text-gray-800
                    prose-li:text-gray-800
                    prose-blockquote:text-gray-700 prose-blockquote:border-flat-btn-primary
                    prose-code:text-flat-btn-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200
                    [&>*]:text-gray-800 [&_*]:text-gray-800"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">Content coming soon...</p>
                </div>
              )}
            </div>

          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Business Blogs</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get the latest business trends, expert analysis, and thought leadership delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blogs" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Read More Blogs
              </Link>
              <Link 
                href="/events" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Join Our Events
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}