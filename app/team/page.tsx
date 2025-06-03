import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTeamMembers } from "@/lib/team";
import { FaLinkedin, FaGlobe } from "react-icons/fa";
import "./team-styles.css";

export const metadata: Metadata = {
  title: "Our Team | BizCivitas - Meet Our Business Experts & Leaders",
  description:
    "Meet the expert team behind BizCivitas. Our professionals bring years of experience in business consulting, digital growth, strategy, and innovation to help your business succeed.",
  keywords: [
    "BizCivitas team",
    "business experts",
    "team members",
    "business consultants",
    "professional team",
    "business leaders",
    "company team",
    "founders",
    "consulting directors",
    "business strategy experts",
    "innovation leaders",
    "digital growth specialists"
  ],
  openGraph: {
    title: "Our Team | BizCivitas - Meet Our Business Experts & Leaders",
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
    title: "Our Team | BizCivitas - Meet Our Business Experts & Leaders",
    description:
      "Meet the expert team behind BizCivitas. Our professionals bring years of experience to help your business succeed.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/team`,
  },
  other: {
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "og:locale": "en_US",
    "og:site_name": "BizCivitas",
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
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/team`,
    mainEntity: {
      "@type": "Organization",
      name: "BizCivitas",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com",
      employee: teamMembers.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.designation,
        description: member.leading_in_domain,
        image: member.img_url,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/team/${member.slug}`,
        worksFor: {
          "@type": "Organization",
          name: member.company_name || "BizCivitas",
          logo: member.company_logo || member.company_logo_url,
        },
        sameAs: [
          member.linkedin_link,
          member.website_link
        ].filter(Boolean),
        knowsAbout: member.leading_in_domain
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
          name: "Team",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com"}/team`,
        },
      ],
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <header className="py-20 bg-gradient-to-br from-orange-400 to-orange-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 flat-text-heading">
              Our Team
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto flat-text-body">
              The world is your network. Expand your business by exploring new destinations and forming meaningful collaborations.
            </p>
          </div>
        </header>

        {/* Team Members Section */}
        <main className="py-16 bg-flat-surface">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {sortedPositions.length > 0 ? (
              sortedPositions.map((position) => {
                const members = groupedMembers[position];
                const displayName = positionDisplayNames[position] || position;

                return (
                  <section key={position} className="mb-20">
                    {/* Position Title */}
                    <header className="text-center mb-12">
                      <h2 className="text-2xl lg:text-3xl font-bold text-flat-text-primary mb-6 flat-text-heading">
                        {displayName}
                      </h2>
                    </header>

                    {/* Members Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {members.map((member) => (
                        <article key={member.id} className="team-member-card group">
                          <Link 
                            href={`/team/${member.slug}`}
                            className="block h-full"
                            aria-label={`View ${member.name}'s profile`}
                          >
                            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 h-full flex flex-col">
                              {/* Member Image */}
                              <div className="relative p-6 pb-4">
                                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                  <Image
                                    src={member.img_url || "/placeholder-team.jpg"}
                                    alt={`${member.name} - ${member.designation} at ${member.company_name || 'BizCivitas'}`}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    sizes="96px"
                                  />
                                </div>
                              </div>

                              {/* Member Info */}
                              <div className="px-6 pb-4 text-center flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-flat-text-primary mb-2 group-hover:text-flat-btn-primary transition-colors duration-300 flat-text-heading">
                                  {member.name}
                                </h3>

                                {member.designation && (
                                  <p className="text-flat-btn-primary font-medium text-sm mb-2">
                                    {member.designation}
                                  </p>
                                )}

                                {member.leading_in_domain && (
                                  <p className="text-flat-text-secondary text-sm mb-4 leading-relaxed flex-1">
                                    {member.leading_in_domain}
                                  </p>
                                )}

                                {/* Company Info with Logo */}
                                {(member.company_name || member.company_logo || member.company_logo_url) && (
                                  <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-center space-x-3">
                                      {(member.company_logo || member.company_logo_url) && (
                                        <div className="relative w-8 h-8 flex-shrink-0">
                                          <Image
                                            src={member.company_logo || member.company_logo_url || "/placeholder-company.png"}
                                            alt={`${member.company_name || 'Company'} Logo`}
                                            fill
                                            className="object-contain rounded"
                                            sizes="32px"
                                          />
                                        </div>
                                      )}
                                      {member.company_name && (
                                        <span className="text-xs text-flat-text-secondary font-medium">
                                          {member.company_name}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Social Links */}
                                {(member.linkedin_link || member.website_link) && (
                                  <div className="flex items-center justify-center space-x-4 mt-4 pt-3 border-t border-gray-100">
                                    {member.linkedin_link && (
                                      <a
                                        href={member.linkedin_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-flat-btn-primary hover:text-flat-btn-primary/80 transition-colors duration-300"
                                        aria-label={`${member.name}'s LinkedIn`}
                                      >
                                        <FaLinkedin className="w-4 h-4" />
                                      </a>
                                    )}
                                    {member.website_link && (
                                      <a
                                        href={member.website_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-flat-btn-primary hover:text-flat-btn-primary/80 transition-colors duration-300"
                                        aria-label={`${member.name}'s Website`}
                                      >
                                        <FaGlobe className="w-4 h-4" />
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })
            ) : (
              <section className="text-center py-16">
                <div className="bg-white rounded-xl p-8 shadow-sm border max-w-md mx-auto">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h2 className="text-lg text-flat-text-primary font-semibold mb-2">
                    Team members will be added soon.
                  </h2>
                  <p className="text-sm text-flat-text-secondary">
                    Check back soon to meet our expert team!
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  );
}