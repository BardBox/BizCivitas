  import type { Metadata } from "next";
  import Image from "next/image";
  import Link from "next/link";
  import { getAllTeamMembers } from "@/lib/team";
  import { FaLinkedin, FaGlobe } from "react-icons/fa";
  import "./team-styles.css";
  import Footer from "@/components/Footer";

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
          <header className="py-20 bg-[#FF9D00]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 ">
                Our Team
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto ">
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
                      <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-10 max-w-7xl mx-auto">
                        {members.map((member) => (
                          <article key={member.id} className="team-member-card group w-full max-w-[300px] flex-shrink-0">
                            <Link 
                              href={`/team/${member.slug}`}
                              className="block h-full"
                              aria-label={`View ${member.name}'s profile`}
                            >
                              <div className="bg-white rounded-2xl  transition-all duration-300 overflow-hidden h-full flex flex-col p-6">
                                {/* Member Image */}
                                <div className="relative mb-4">
                                  <div className="relative w-[250px] team-member-img h-[250px] mx-auto rounded-full overflow-hidden">
                                    <Image
                                      src={member.img_url || "/placeholder-team.jpg"}
                                      alt={`${member.name} - ${member.designation} at ${member.company_name || 'BizCivitas'}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>

                                {/* Member Info */}
                                <div className="text-center flex-1 flex flex-col">
                                  <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                                    {member.name}
                                  </h3>

                                  {member.designation && (
                                    <p className="text-orange-600 font-medium text-sm mb-3 line-clamp-2">
                                      {member.designation}
                                    </p>
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
                  <div className="bg-white rounded-xl p-8 max-w-md mx-auto">
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