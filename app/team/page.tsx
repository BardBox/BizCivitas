import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { getAllTeamMembers } from '@/lib/team';

export const metadata: Metadata = {
  title: "Our Team | BizCivitas - Meet Our Business Experts",
  description: "Meet the expert team behind BizCivitas. Our professionals bring years of experience in business consulting, digital growth, photography, and more to help your business succeed.",
  keywords: ["BizCivitas team", "business experts", "team members", "business consultants", "professional team", "business leaders", "company team"],
  openGraph: {
    title: "Our Team | BizCivitas - Meet Our Business Experts",
    description: "Meet the expert team behind BizCivitas. Our professionals bring years of experience to help your business succeed.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/team`,
    images: [
      {
        url: "/og-team.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Team - Business Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | BizCivitas - Meet Our Business Experts",
    description: "Meet the expert team behind BizCivitas. Our professionals bring years of experience to help your business succeed.",
  },
  alternates: {
    canonical: "/team",
  },
  other: {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
};

export default async function TeamPage() {
  const teamMembers = await getAllTeamMembers();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Our Team | BizCivitas",
    "description": "Meet the expert team behind BizCivitas. Our professionals bring years of experience in business consulting and growth.",
    "url": "https://bizcivitas.com/team",
    "mainEntity": {
      "@type": "Organization",
      "name": "BizCivitas",
      "url": "https://bizcivitas.com",
      "employee": teamMembers.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.designation,
        "image": member.img_url,
        "url": `https://bizcivitas.com/team/${member.slug}`,
        "worksFor": {
          "@type": "Organization",
          "name": member.company_name || "BizCivitas"
        }
      }))
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
        {/* Hero Section */}
        <section className="py-20" style={{ backgroundColor: '#f39c12' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Meet Our{' '}
              <span className="text-white">
                Expert Team
              </span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Get to know the passionate professionals who drive BizCivitas forward and help businesses transform their visions into reality.
            </p>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Core Team Members
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our diverse team brings together expertise from various domains to provide comprehensive business solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Link key={member.id} href={`/team/${member.slug}`} className="block group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group-hover:scale-105">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={member.img_url || '/placeholder-team.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="full-width absolute inset-0 hero-overlay"></div>
                    </div>

                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-3">
                        {member.designation}
                      </p>
                      {member.leading_in_domain && (
                        <p className="text-gray-600 text-sm mb-4">
                          {member.leading_in_domain}
                        </p>
                      )}
                      {member.company_name && (
                        <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                          {member.company_logo && (
                            <Image
                              src={member.company_logo}
                              alt={member.company_name}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          )}
                          <span>{member.company_name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {teamMembers.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white rounded-xl p-8 shadow-sm border max-w-md mx-auto">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-lg text-gray-600">Team members will be added soon.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}