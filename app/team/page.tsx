
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

                    {/* Members Grid - Centered layout */}
                    <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                      {members.map((member) => (
                        <div key={member.id} className="group">
                          {/* Team Member Card - Horizontal Layout */}
                          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 w-80">
                            <div className="flex p-6">
                              {/* Left Side - Member Image */}
                              <div className="flex-shrink-0 mr-6">
                                <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg">
                                  <Image
                                    src={member.img_url || "/placeholder-team.jpg"}
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    sizes="80px"
                                  />
                                </div>
                              </div>

                              {/* Middle - Member Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                  {member.name}
                                </h3>
                                {member.designation && (
                                  <p className="text-gray-600 text-sm mb-2">
                                    {member.designation}
                                  </p>
                                )}
                                
                                {/* Social Links */}
                                <div className="flex items-center space-x-3 mb-3">
                                  {member.website_link && (
                                    <Link
                                      href={member.website_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm"
                                      aria-label={`${member.name}'s Website`}
                                    >
                                      <FaGlobe className="w-4 h-4 mr-1" />
                                      Website
                                    </Link>
                                  )}
                                  {member.linkedin_link && (
                                    <Link
                                      href={member.linkedin_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm"
                                      aria-label={`${member.name}'s LinkedIn`}
                                    >
                                      <FaLinkedin className="w-4 h-4 mr-1" />
                                      LinkedIn
                                    </Link>
                                  )}
                                </div>

                                {/* Company Info */}
                                {(member.company_name && member.company_name !== 'BizCivitas') && (
                                  <div className="text-xs text-gray-500">
                                    {member.company_name}
                                  </div>
                                )}
                              </div>

                              {/* Right Side - Company Logo */}
                              {member.company_logo && (
                                <div className="flex-shrink-0 ml-4">
                                  <div className="relative w-16 h-16 flex items-center justify-center">
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

                            {/* Description Preview */}
                            {member.description && (
                              <div className="px-6 pb-4">
                                <div className="text-xs text-gray-500 line-clamp-2 border-t pt-3">
                                  {member.description.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Link to full profile page */}
                          <div className="text-center mt-3">
                            <Link
                              href={`/team/${member.slug}`}
                              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                              View Full Profile →
                            </Link>
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
