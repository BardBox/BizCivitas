import type { Metadata } from "next";
import TopSection from "@/components/TopSection";
import ContentSection from "@/components/ContentSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Discover BizCivitas - Explore Our Business Community",
  description: "Discover what makes BizCivitas unique. Explore our business community, networking opportunities, events, insights, and membership benefits that help turn visions into reality.",
  keywords: ["discover BizCivitas", "business community", "networking platform", "business opportunities", "community features", "explore BizCivitas"],
  openGraph: {
    title: "Discover BizCivitas - Explore Our Business Community",
    description: "Discover what makes BizCivitas unique. Explore our business community, networking opportunities, and membership benefits.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/discover`,
    images: [
      {
        url: "/og-discover.jpg",
        width: 1200,
        height: 630,
        alt: "Discover BizCivitas - Business Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover BizCivitas - Explore Our Business Community",
    description: "Discover what makes BizCivitas unique. Explore our business community, networking opportunities, and membership benefits.",
  },
  alternates: {
    canonical: "/discover",
  },
};

export default function DiscoverPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Discover BizCivitas",
    description: "Explore BizCivitas business community, networking opportunities, and membership benefits",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/discover`,
    mainEntity: {
      "@type": "Organization",
      name: "BizCivitas",
      description: "Business networking platform for professional growth and community building",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-flat-bg min-h-screen">
        <TopSection
          heading="Discover BizCivitas"
          subheading="We empower businesses to thrive and build stronger communities through connection, innovation, and collaboration."
          backgroundImage="/heroDis.png"
        />

        <ContentSection
          title="The Heart of BizCivitas"
          description="BizCivitas began as a dream shared by three passionate travelers who discovered the magic of authentic connections during their journeys. From bustling cities to serene landscapes, they saw that transformative business relationships are not formed in boardrooms—they are born around campfires, under starlit skies, and amidst the thrill of new discoveries. Today, BizCivitas reimagines networking by creating immersive travel experiences that foster genuine relationships, collaborative growth, and personal fulfillment. BizCivitas: Changing the Way the World Does Business®."
          videoTitle="Discover BizCivitas"
          videoUrl="https://youtu.be/mT8QUb86B1w"
          backgroundColor="#EDEFE7"
        />

        <div className="max-w-[1440px] mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <Image
            src="/discovery/1.svg"
            alt="Discovery step 1"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
          <Image
            src="/discovery/2.svg"
            alt="Discovery step 2"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
          <Image
            src="/discovery/3.svg"
            alt="Discovery step 3"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
        </div>
      </div>
    </>
  );
} 