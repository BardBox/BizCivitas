
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTeamMembers } from "@/lib/team";
import Script from "next/script";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Our Team | BizCivitas - Meet Our Business Experts",
  description:
    "Meet the expert team behind BizCivitas. Our professionals bring years of experience in business consulting, digital growth, photography, and more to help your business succeed.",
  keywords: [
    "BizCivitas team",
    "business experts",
    "team members",
    "business consultants",
    "professional team",
    "business leaders",
    "company team",
  ],
  openGraph: {
    title: "Our Team | BizCivitas - Meet Our Business Experts",
    description:
      "Meet the expert team behind BizCivitas. Our professionals bring years of experience to help your business succeed.",
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
    description:
      "Meet the expert team behind BizCivitas. Our professionals bring years of experience to help your business succeed.",
  },
  alternates: {
    canonical: "/team",
  },
  other: {
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

// Enable ISR with 60-second revalidation
export const revalidate = 60;

export default async function TeamPage() {
  const teamMembers = await getAllTeamMembers();

  // Group team members by position
  const groupedMembers = teamMembers.reduce((groups, member) => {
    const position = member.position || 'Other';
    if (!groups[position]) {
      groups[position] = [];
    }
    groups[position].push(member);
    return groups;
  }, {} as Record<string, typeof teamMembers>);

  // Define position order for display (matching the enum)
  const positionOrder = [
    'Founder',
    'Co-Founders',
    'Consulting Directors',
    'Core-Team-Members',
    'Team-Member'
  ];

  // Display names for positions
  const positionDisplayNames: Record<string, string> = {
    'Founder': 'Founders',
    'Co-Founders': 'Founders',
    'Consulting Directors': 'Consulting Directors',
    'Core-Team-Members': 'Core Team Members',
    'Team-Member': 'Team Members'
  };

  // Sort positions according to defined order
  const sortedPositions = positionOrder.filter(position => groupedMembers[position]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Our Team | BizCivitas",
    description:
      "Meet the expert team behind BizCivitas. Our professionals bring years of experience in business consulting and growth.",
    url: "https://bizcivitas.com/team",
    mainEntity: {
      "@type": "Organization",
      name: "BizCivitas",
      url: "https://bizcivitas.com",
      employee: teamMembers.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.designation,
        image: member.img_url,
        url: `https://bizcivitas.com/team/${member.slug}`,
        worksFor: {
          "@type": "Organization",
          name: member.company_name || "BizCivitas",
        },
      })),
    },
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
          name: "Team",
          item: "https://bizcivitas.com/team",
        },
      ],
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-blue-600">Expert Team</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Get to know the passionate professionals who drive BizCivitas
              forward and help businesses transform their visions into reality.
            </p>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {sortedPositions.length > 0 ? (
              sortedPositions.map((position) => {
                const members = groupedMembers[position];
                const displayName = positionDisplayNames[position] || position;
                
                return (
                  <div key={position} className="mb-20">
                    {/* Position Title */}
                    <div className="text-center mb-12">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                        {displayName}
                      </h2>
                    </div>

                    {/* Members Grid - Enhanced layout */}
                    <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                      {members.map((member) => (
                        <div key={member.id} className="group">
                          {/* Enhanced Team Member Card */}
                          <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 w-96 transform group-hover:-translate-y-2">
                            {/* Background gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative p-8">
                              {/* Header Section */}
                              <div className="flex items-start space-x-6 mb-6">
                                {/* Member Image */}
                                <div className="flex-shrink-0">
                                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white group-hover:ring-blue-100 transition-all duration-300">
                                    <Image
                                      src={member.img_url || "/placeholder-team.jpg"}
                                      alt={member.name}
                                      fill
                                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                                      sizes="96px"
                                    />
                                  </div>
                                </div>

                                {/* Member Info */}
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                    {member.name}
                                  </h3>
                                  {member.designation && (
                                    <p className="text-blue-600 font-semibold text-sm mb-3 bg-blue-50 px-3 py-1 rounded-full inline-block">
                                      {member.designation}
                                    </p>
                                  )}
                                  
                                  {/* Leading Domain Badge */}
                                  {member.leading_in_domain && (
                                    <div className="mb-3">
                                      <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                                        Expert in {member.leading_in_domain}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Company Logo */}
                                {member.company_logo && (
                                  <div className="flex-shrink-0">
                                    <div className="relative w-16 h-16 flex items-center justify-center bg-gray-50 rounded-xl p-2">
                                      <Image
                                        src={member.company_logo}
                                        alt={`${member.company_name || 'Company'} Logo`}
                                        fill
                                        className="object-contain"
                                        sizes="64px"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Company Info */}
                              {(member.company_name && member.company_name !== 'BizCivitas') && (
                                <div className="mb-4">
                                  <div className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span className="text-sm font-medium">{member.company_name}</span>
                                  </div>
                                </div>
                              )}

                              {/* Description Preview */}
                              {member.description && (
                                <div className="mb-6">
                                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                    {member.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                  </p>
                                </div>
                              )}

                              {/* Social Links */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  {member.website_link && (
                                    <Link
                                      href={member.website_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-500 hover:text-blue-600 transition-colors duration-300 p-2 hover:bg-blue-50 rounded-lg"
                                      aria-label={`${member.name}'s Website`}
                                    >
                                      <FaGlobe className="w-5 h-5" />
                                    </Link>
                                  )}
                                  {member.linkedin_link && (
                                    <Link
                                      href={member.linkedin_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-500 hover:text-blue-600 transition-colors duration-300 p-2 hover:bg-blue-50 rounded-lg"
                                      aria-label={`${member.name}'s LinkedIn`}
                                    >
                                      <FaLinkedin className="w-5 h-5" />
                                    </Link>
                                  )}
                                </div>

                                {/* View Profile Button */}
                                <Link
                                  href={`/team/${member.slug}`}
                                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                  View Profile
                                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <div className="bg-white rounded-xl p-8 shadow-sm border max-w-md mx-auto">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-lg text-gray-600">
                    Team members will be added soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
