import type { Metadata } from "next";
import TopSection from "@/components/TopSection";
import ContentSection from "@/components/ContentSection";
import Image from "next/image";
import Card from "@/components/Card";
import {LetsConnect2} from "@/components/Home/LetsConnect";
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

  const title: string[] = ['Trust and Integrity', 'Authentic Networking Experience', 'Inclusive Development',
    'Diversity and Inclusion', 'Innovation', 'Teamwork and Collaboration'
  ]
  const description: string[] = ['Building organic trust among members is essential. Our platform focuses on promoting transparency, ethical behavior, and honest communication to maintain a professional and reliable network.', 'A platform where genuine, lasting relationships through natural bonding and shared experiences are created, resulting in abundant opportunities for the business.', 'We believe that personal and professional development is the only way an individual can grow and develop the business and ensure inclusive contribution to society',
    'Encouraging different perspectives and backgrounds contributes to a richer and more innovative network. Inclusion fosters a welcoming environment for people of various professions, industries, and cultures.', 'Growth is fueled by innovation – a journey of curated experience and continuous improvement motivates us to go the extra mile.', 'Our people – team, and members – are our strengths, and effective collaboration is the key to our success.'
  ]
  const title_2: string[] = ['Explore Global Destinations', 'Connect with Like-Minded Professionals', 'Collaborate on Exciting Projects',
    'Learn from Industry Experts'
  ]
  const description_2: string[] = ['Curated trips blend adventure with meaningful opportunities.', 'Build genuine relationships with entrepreneurs, executives, and innovators.', 'Bring your ideas to life with talented peers across industries.',
    'Gain mentorship and actionable insights from seasoned leaders.'
  ]
  const title_3: string[] = ['Curated Experiences', 'Accelerated Networking', 'Global Reach',
    'Expert Facilitation', 'Follow-Up Support'
  ]
  const description_3: string[] = ['Carefully crafted itineraries combine adventure and professional growth.', 'Build deeper connections in shorter, impactful time frames.', 'Expand your network with peers from around the world.',
    'Discussions and collaborations are guided by experienced professionals.', 'Maintain and grow your connections beyond the trips.'
  ]

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
        <div className="max-w-[1440px] mx-auto px-4 py-8">

          <div className="w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-1 lg:gap-8 md:gap-2 items-center justify-center">
            <Image
              src="/discovery/1.svg"
              alt="Discovery step 1"
              width={0}
              height={0}
              className="w-auto h-auto max-w-full max-h-80 object-contain"
            />
            <Image
              src="/discovery/2.svg"
              alt="Discovery step 2"
              width={0}
              height={0}
              className="w-auto h-auto max-w-full max-h-80 object-contain"
            />
            <Image
              src="/discovery/3.svg"
              alt="Discovery step 3"
              width={0}
              height={0}
              className="w-auto h-auto max-w-full max-h-80 object-contain"
            />
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 py-8 flex items-center justify-center flex-col gap-10">
          <h3 className="text-5xl font-semibold text-orange-500">Core Values of Bizcivitas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {title.map((i, index) => (
              <Card
                key={i}
                title={`${i}`}
                description={`${description[index]}.`}
                logo={`/discovery/d${index + 1}_1.svg`}
                direction="column"
                imageAlt={`Discovery step ${i}`}
                className="w-full align-start justify-start"
              />
            ))}
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 py-8 flex items-center justify-center flex-col gap-10">
          <h3 className="text-5xl font-semibold text-blue-500">Discover the Power of Experiential Networking</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {title_2.map((i, index) => (
              <Card
                key={i}
                title={`${i}`}
                description={`${description_2[index]}.`}
                logo={`/discovery/d${index + 1}_2.svg`}
                direction="row"
                imageAlt={`Discovery step ${i}`}
                className="w-full p-12"
              />
            ))}
          </div>


        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 py-8 flex items-center justify-center flex-col gap-10">
          <h3 className="text-5xl font-semibold text-green-500">Why Bizcivitas</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {title_3.map((i, index) => (
              <Card
                key={i}
                title={`${i}`}
                description={`${description_3[index]}.`}
                logo={`/discovery/d${index + 1}_3.svg`}
                direction="column"
                columnCenter={true}
                imageAlt={`Discovery step ${i}`}
                className="max-w-[450px] w-full p-6 flex flex-col items-center justify-center"
              />
            ))}
          </div>
        </div>

          
        <LetsConnect2 />
      </div>
    </>
  );
} 