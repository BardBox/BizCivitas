import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTeamMembers } from "@/lib/team";
import Script from "next/script";
import { FaLinkedin, FaGlobe, FaArrowRight } from "react-icons/fa";

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
                          <style jsx>{`
                            .modern-team-card {
                              background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                              border-radius: 20px;
                              padding: 2rem;
                              width: 380px;
                              position: relative;
                              overflow: hidden;
                              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                              border: 1px solid rgba(255, 255, 255, 0.2);
                            }

                            .modern-team-card::before {
                              content: '';
                              position: absolute;
                              top: 0;
                              left: -100%;
                              width: 100%;
                              height: 100%;
                              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                              transition: left 0.5s ease;
                            }

                            .modern-team-card:hover::before {
                              left: 100%;
                            }

                            .modern-team-card:hover {
                              transform: translateY(-10px);
                              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                            }

                            .member-avatar {
                              width: 120px;
                              height: 120px;
                              border-radius: 50%;
                              margin: 0 auto 1.5rem;
                              position: relative;
                              overflow: hidden;
                              border: 4px solid #ffffff;
                              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                              transition: all 0.3s ease;
                            }

                            .member-avatar:hover {
                              transform: scale(1.05);
                              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                            }

                            .avatar-ring {
                              position: absolute;
                              top: -8px;
                              left: -8px;
                              right: -8px;
                              bottom: -8px;
                              border-radius: 50%;
                              background: conic-gradient(from 0deg, #667eea, #764ba2, #667eea);
                              z-index: -1;
                              animation: ring-rotate 3s linear infinite;
                              opacity: 0;
                              transition: opacity 0.3s ease;
                            }

                            .modern-team-card:hover .avatar-ring {
                              opacity: 1;
                            }

                            @keyframes ring-rotate {
                              from { transform: rotate(0deg); }
                              to { transform: rotate(360deg); }
                            }

                            .member-info {
                              text-align: center;
                            }

                            .member-name {
                              font-size: 1.5rem;
                              font-weight: 700;
                              color: #1a202c;
                              margin-bottom: 0.5rem;
                              transition: color 0.3s ease;
                            }

                            .modern-team-card:hover .member-name {
                              background: linear-gradient(135deg, #667eea, #764ba2);
                              -webkit-background-clip: text;
                              -webkit-text-fill-color: transparent;
                              background-clip: text;
                            }

                            .member-title {
                              color: #4a5568;
                              font-weight: 500;
                              margin-bottom: 1rem;
                              font-size: 1rem;
                            }

                            .expertise-tag {
                              background: linear-gradient(135deg, #667eea, #764ba2);
                              color: white;
                              padding: 0.5rem 1rem;
                              border-radius: 20px;
                              font-size: 0.875rem;
                              font-weight: 500;
                              display: inline-block;
                              margin-bottom: 1.5rem;
                              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                              transition: all 0.3s ease;
                            }

                            .modern-team-card:hover .expertise-tag {
                              transform: translateY(-2px);
                              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                            }

                            .company-badge {
                              background: rgba(102, 126, 234, 0.1);
                              color: #667eea;
                              padding: 0.5rem 1rem;
                              border-radius: 15px;
                              font-size: 0.875rem;
                              font-weight: 500;
                              display: inline-flex;
                              align-items: center;
                              gap: 0.5rem;
                              margin-bottom: 1.5rem;
                            }

                            .social-section {
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                              margin-top: 1.5rem;
                            }

                            .social-links {
                              display: flex;
                              gap: 0.75rem;
                            }

                            .social-link {
                              width: 40px;
                              height: 40px;
                              border-radius: 50%;
                              background: rgba(102, 126, 234, 0.1);
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              color: #667eea;
                              transition: all 0.3s ease;
                              border: 2px solid transparent;
                            }

                            .social-link:hover {
                              background: #667eea;
                              color: white;
                              transform: translateY(-2px);
                              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                            }

                            .view-profile-btn {
                              background: linear-gradient(135deg, #667eea, #764ba2);
                              color: white;
                              padding: 0.75rem 1.5rem;
                              border-radius: 25px;
                              font-weight: 600;
                              font-size: 0.875rem;
                              text-decoration: none;
                              display: inline-flex;
                              align-items: center;
                              gap: 0.5rem;
                              transition: all 0.3s ease;
                              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                            }

                            .view-profile-btn:hover {
                              transform: translateY(-2px);
                              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                              color: white;
                            }

                            .company-logo-small {
                              width: 24px;
                              height: 24px;
                              border-radius: 4px;
                              background: white;
                              padding: 2px;
                            }
                          `}</style>

                          {/* Modern Team Member Card */}
                          <div className="modern-team-card">
                            {/* Member Avatar */}
                            <div className="member-avatar">
                              <div className="avatar-ring"></div>
                              <Image
                                src={member.img_url || "/placeholder-team.jpg"}
                                alt={member.name}
                                fill
                                className="object-cover"
                                sizes="120px"
                              />
                            </div>

                            {/* Member Info */}
                            <div className="member-info">
                              <h3 className="member-name">{member.name}</h3>
                              <p className="member-title">{member.designation}</p>

                              {/* Expertise Tag */}
                              {member.leading_in_domain && (
                                <div className="expertise-tag">
                                  {member.leading_in_domain}
                                </div>
                              )}

                              {/* Company Badge */}
                              {(member.company_name && member.company_name !== 'BizCivitas') && (
                                <div className="company-badge">
                                  {member.company_logo && (
                                    <Image
                                      src={member.company_logo}
                                      alt={member.company_name}
                                      width={24}
                                      height={24}
                                      className="company-logo-small"
                                    />
                                  )}
                                  {member.company_name}
                                </div>
                              )}

                              {/* Social Links and View Profile */}
                              <div className="social-section">
                                <div className="social-links">
                                  {member.website_link && (
                                    <Link
                                      href={member.website_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="social-link"
                                      aria-label={`${member.name}'s Website`}
                                    >
                                      <FaGlobe className="w-4 h-4" />
                                    </Link>
                                  )}
                                  {member.linkedin_link && (
                                    <Link
                                      href={member.linkedin_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="social-link"
                                      aria-label={`${member.name}'s LinkedIn`}
                                    >
                                      <FaLinkedin className="w-4 h-4" />
                                    </Link>
                                  )}
                                </div>

                                {/* View Profile Button */}
                                <Link href={`/team/${member.slug}`} className="view-profile-btn">
                                  View Profile
                                  <FaArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
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