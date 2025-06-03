
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTeamMembers } from "@/lib/team";
import Script from "next/script";
import TeamPageClient from "@/components/TeamPageClient";

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
        </section></div>

        {/* Team Members Section */}
        <TeamPageClient 
          groupedMembers={groupedMembers}
          sortedPositions={sortedPositions}
          positionDisplayNames={positionDisplayNames}
        />
    </>
  );
}
