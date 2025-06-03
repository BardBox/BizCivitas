import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMemberBySlug, getAllTeamMembers, getTeamMemberSEOData } from '@/lib/team';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enable ISR with 3600-second (1 hour) revalidation for team members
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    return {
      title: "Team Member Not Found - BizCivitas",
      description: "The requested team member could not be found.",
    };
  }

  const seoData = getTeamMemberSEOData(member);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      type: "profile",
      url: `https://bizcivitas.com/team/${member.slug}`,
      images: [
        {
          url: seoData.ogImage,
          width: 1200,
          height: 630,
          alt: member.name,
        },
      ],
      siteName: "BizCivitas",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: [seoData.twitterImage],
    },
    alternates: {
      canonical: `/team/${member.slug}`,
    },
    other: {
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'profile:first_name': member.name.split(' ')[0],
      'profile:last_name': member.name.split(' ').slice(1).join(' '),
      'og:locale': 'en_US',
      'og:site_name': 'BizCivitas',
    },
  };
}

export async function generateStaticParams() {
  const teamMembers = await getAllTeamMembers();
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.designation,
    "description": member.description,
    "image": member.img_url,
    "url": `https://bizcivitas.com/team/${member.slug}`,
    "sameAs": [
      member.website_link,
      member.linkedin_link
    ].filter(Boolean),
    "worksFor": {
      "@type": "Organization",
      "name": member.company_name || "BizCivitas",
      "url": "https://bizcivitas.com"
    },
    "knowsAbout": member.leading_in_domain,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bizcivitas.com/team/${member.slug}`
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
          "name": "Team",
          "item": "https://bizcivitas.com/team"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": member.name,
          "item": `https://bizcivitas.com/team/${member.slug}`
        }
      ]
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/team" className="hover:text-blue-600 transition-colors">
                Team
              </Link>
              <span>/</span>
              <span className="text-gray-900">{member.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src={member.img_url || '/placeholder-team.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                    priority
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {member.name}
                </h1>
                <h2 className="text-2xl text-blue-600 font-semibold mb-6">
                  {member.designation}
                </h2>

                {member.leading_in_domain && (
                  <div className="mb-6">
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      Expert in {member.leading_in_domain}
                    </span>
                  </div>
                )}

                {member.company_name && (
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                    {member.company_logo && (
                      <Image
                        src={member.company_logo}
                        alt={member.company_name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    )}
                    <span className="text-lg text-gray-700 font-medium">
                      {member.company_name}
                    </span>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-4">
                  {member.website_link && (
                    <a
                      href={member.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      aria-label={`Visit ${member.name}'s website`}
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </a>
                  )}

                  {member.linkedin_link && (
                    <a
                      href={member.linkedin_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      aria-label={`Connect with ${member.name} on LinkedIn`}
                    >
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        {member.description && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">About {member.name}</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: member.description }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Back to Team */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/team"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}