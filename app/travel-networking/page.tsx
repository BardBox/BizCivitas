import type { Metadata } from "next";
import Head from "next/head";
import TopSection from "@/components/TopSection";
import ParagraphSection from "@/components/Networking/ParagraphSection";
import { Paragraph } from "@/types/blogs.types";
import { CarouselItem, InfiniteCarouselProps } from '@/types/carosual.types';
import InfiniteCarousel from "@/components/Carousal";
import Accordion from "@/components/Accordian";

const faqs = [
  {
    question: "What is travel networking?",
    answer: "It involves blending professional networking with the excitement of exploring new destinations, fostering authentic connections through shared experiences.",
  },
  {
    question: "How can travel networking help my business?",
    answer: "By building authentic relationships, expanding your global reach, and uncovering unique collaboration opportunities.",
  },
  {
    question: "What types of events are available?",
    answer: "Business summits, immersive travel experiences, entrepreneur meetups, and cultural exchange trips.",
  },
  {
    question: "How can entrepreneurs benefit from travel groups?",
    answer: "They gain exposure to diverse perspectives, form trusted partnerships, and expand their professional influence.",
  },
  {
    question: "How do I join your travel networking platform?",
    answer: "Visit our platform and sign up to access curated trips, premium events, and professional resources.",
  },
];

export const metadata: Metadata = {
  title: "Travel Networking Events & Groups | BizCivitas - Professional Travel Communities",
  description: "Join BizCivitas travel networking events and entrepreneur travel groups. Connect with professionals while exploring new destinations. Build meaningful business relationships through shared travel experiences.",
  keywords: [
    "travel networking",
    "travel networking events",
    "entrepreneur travel groups",
    "professional travel meetups",
    "business travel networking",
    "travel networking platform",
    "cultural exchange networking",
    "global business expansion",
    "networking while traveling",
    "travel networking community",
    "business travel groups",
    "entrepreneur travel meetups",
    "professional travel experiences",
    "travel networking opportunities",
    "international networking events",
    "travel-based networking",
    "destination networking",
    "nomad networking",
    "travel business community",
    "networking adventures"
  ],
  openGraph: {
    title: "Travel Networking Events & Groups | BizCivitas - Professional Travel Communities",
    description: "Connect with professionals while exploring the world. Join BizCivitas travel networking events and build meaningful business relationships through shared experiences.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/travel-networking`,
    images: [
      {
        url: "/og-travel-networking.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Travel Networking Events - Professional Travel Communities",
      },
    ],
    siteName: "BizCivitas",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Networking Events & Groups | BizCivitas",
    description: "Connect with professionals while exploring the world. Join our travel networking community and build business relationships through shared experiences.",
    site: "@BizCivitas",
    creator: "@BizCivitas",
    images: ["/og-travel-networking.jpg"],
  },
  alternates: {
    canonical: "/travel-networking",
  },
  other: {
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "BizCivitas",
      "url": "https://bizcivitas.com",
      "logo": "https://bizcivitas.com/logo.png",
      "sameAs": [
        "https://twitter.com/BizCivitas",
        "https://www.linkedin.com/company/bizcivitas",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://bizcivitas.com/travel-networking#webpage",
      "url": "https://bizcivitas.com/travel-networking",
      "name": "Travel Networking Events & Groups | BizCivitas - Professional Travel Communities",
      "description": "Join BizCivitas travel networking events and entrepreneur travel groups. Connect with professionals while exploring new destinations. Build meaningful business relationships through shared travel experiences.",
      "isPartOf": {
        "@id": "https://bizcivitas.com#website",
      },
      "publisher": {
        "@id": "https://bizcivitas.com#organization",
      },
      "datePublished": "2025-06-09",
      "dateModified": "2025-06-09",
      "breadcrumb": {
        "@id": "https://bizcivitas.com/travel-networking#breadcrumb",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "Article",
      "@id": "https://bizcivitas.com/travel-networking#article",
      "headline": "Travel Networking Events & Groups | BizCivitas",
      "description": "Learn how BizCivitas travel networking events and entrepreneur travel groups help professionals connect and build meaningful business relationships through shared travel experiences.",
      "author": {
        "@type": "Organization",
        "name": "BizCivitas",
        "@id": "https://bizcivitas.com#organization",
      },
      "publisher": {
        "@type": "Organization",
        "name": "BizCivitas",
        "@id": "https://bizcivitas.com#organization",
      },
      "datePublished": "2025-06-09",
      "dateModified": "2025-06-09",
      "mainEntityOfPage": {
        "@id": "https://bizcivitas.com/travel-networking#webpage",
      },
      "image": "https://bizcivitas.com/og-travel-networking.jpg",
      "articleSection": ["Travel Networking", "Professional Communities"],
      "keywords": "travel networking, entrepreneur travel groups, business networking, cultural exchange",
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://bizcivitas.com/travel-networking#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bizcivitas.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Travel Networking",
          "item": "https://bizcivitas.com/travel-networking",
        },
      ],
    },
  ],
};

const Paragraph_1: Partial<Paragraph> = {
  contentTop: "By BizCivitas",
  listItems: [
    "In today’s fast-paced world, work has become a never-ending cycle of back-to-back meetings, robotic small talk, and boardroom monotony. The spark? Gone. The excitement? Fading. But here’s the game-changer: travel networking.",
    "Think of it as networking with a twist—where connections are built over shared adventures, real conversations, and unforgettable experiences. It’s not just about exchanging business cards; it’s about forging meaningful relationships that drive real growth. Because let’s be honest—business isn’t just about deals; it’s about people. And travel networking brings that human touch back into the equation.",
    "We live in a world that is continuously evolving. With globalization blurring the lines between borders with each passing day, why not evolve your networking?",
    "The answer to that: travel networking. It is THE evolution that will, one day, revolutionize your business.",
    "No forced networking. No boring board meetings. No more robotic small talk. But what does it offer? Only beautiful sceneries, fun conversations, and unlimited potential for personal and professional growth! This is travel networking for you.",
  ],
};

const Paragraph_2: Partial<Paragraph> = {
  title: "Expand Your Horizons with Travel Networking",
  contentTop: "Travel groups for entrepreneurs are what take corporate networking to the next level. With a smooth segue from robotic conversations to spirited and animated conversations, corporate networking and travel groups bring two essential elements together: authentic connections and adventure.",
};

const Paragraph_3: Partial<Paragraph> = {
  title: "Why Travel Networking is Essential for Growth?",
  listItems: [
    "Global Business Expansion: It facilitates global business expansion by building relationships, uncovering new opportunities, and fostering trust.",
    "Cultural Exchange: It facilitates cultural exchange by connecting people from different backgrounds and fostering shared experiences.",
    "Opportunity Discovery: It leads to opportunities by expanding your professional and personal network, fostering collaborations.",
    "Strategic Partnerships: Especially in business contexts, fosters strategic partnerships by facilitating face-to-face interactions that build trust, rapport, and mutual understanding.",
  ],
  listItemIcon: "blogs/UL-icon-green.svg",
  contentBottom:
    "For instance, Starbucks’ global expansion was fueled by travel networking. Through extensive networking with international suppliers, real estate developers, and local business leaders, Starbucks expanded globally.",
};

const Paragraph_4: Partial<Paragraph> = {
  imageUrl_1: "/blogs/left-cn.png",
  imageUrl_2: "/blogs/right-cn.svg",
  listItems: [
    "Business Travel Networking: Connect with executives and corporate travelers to build strategic partnerships.",
    "Entrepreneur Travel Groups: Join startup travel communities or networking groups to share insights, explore investments, and collaborate with like-minded entrepreneurs in various entrepreneur travel meetups.",
    "Professional Travel Meetups: Engage with industry professionals, exchange knowledge, and discover new business opportunities while traveling.",
    "Cultural Immersion Trips: Experience new cultures, gain local insights, and network in a relaxed yet meaningful setting.",
  ],
  listItemIcon: "blogs/UL-icon-green.svg",
  contentBottom:
    "For instance, Starbucks’ global expansion was fueled by travel networking. Through extensive networking with international suppliers, real estate developers, and local business leaders, Starbucks expanded globally.",
};

const Paragraph_5: Partial<Paragraph> = {
  title: "Benefits of Joining Our Travel Networking Platform",
  contentTop: `Networking is not just about sharing business cards, is it? It is about forming real and meaningful conversations that propel growth. This is exactly what BizCivitas brings to the table.
Growth? Fun conversations? Meaningful networking? Adventure? BizCivitas is the sure-shot answer to all!
Below are some of the many unique features it provides:`,
  listItems: [
    "Curated Experiences for Professional Growth: Each journey is meticulously planned to promote authentic connections and facilitate your professional development.",
    "Business Connections Through Shared Adventures: Engage in meaningful business relationships fostered by shared travel experiences, sparking insightful conversations and collaborations.",
    "Global Networking Opportunities: Connect with professionals from around the world, unlocking opportunities that transcend borders and expanding your global reach.",
    "Exclusive Access to High-Impact Events: Gain invitations to premium networking events, entrepreneur meetups, and industry-specific gatherings designed to foster valuable business relationships.",
    "Cultural Immersion for Deeper Connections: Experience new cultures firsthand, allowing you to build trust and rapport with global professionals in a more meaningful way.",
    "Personal and Professional Growth: Enhance your skills, expand your mindset, and unlock new opportunities through curated travel experiences that blend business networking with adventure.",
  ],
};

const Paragraph_6: Partial<Paragraph> = {
  title: "Benefits of Joining Our Travel Networking Platform",
  contentTop: `Networking is not just about sharing business cards, is it? It is about forming real and meaningful conversations that propel growth. This is exactly what BizCivitas brings to the table.
Growth? Fun conversations? Meaningful networking? Adventure? BizCivitas is the sure-shot answer to all!
Below are some of the many unique features it provides:`,
  listItems: [
    "Curated Experiences for Professional Growth: Each journey is meticulously planned to promote authentic connections and facilitate your professional development.",
    "Business Connections Through Shared Adventures: Engage in meaningful business relationships fostered by shared travel experiences, sparking insightful conversations and collaborations.",
    "Global Networking Opportunities: Connect with professionals from around the world, unlocking opportunities that transcend borders and expanding your global reach.",
    "Exclusive Access to High-Impact Events: Gain invitations to premium networking events, entrepreneur meetups, and industry-specific gatherings designed to foster valuable business relationships.",
    "Cultural Immersion for Deeper Connections: Experience new cultures firsthand, allowing you to build trust and rapport with global professionals in a more meaningful way.",
    "Personal and Professional Growth: Enhance your skills, expand your mindset, and unlock new opportunities through curated travel experiences that blend business networking with adventure.",
  ],
};

const Paragraph_7: Partial<Paragraph> = {
  title: "How to Maximize Your Travel Networking Experience?",
  contentTop: "",
  listItems: [
    "Be Proactive and Engaged: Take the initiative to introduce yourself, ask questions, and participate in conversations to make meaningful connections.",
    "Follow Up and Stay Connected: Exchange contact details and nurture relationships by following up through emails, social media, or scheduled calls after networking events.",
    "Offer Value to Your Network: Networking is a two-way street; share insights, resources, or potential opportunities to build strong, mutually beneficial relationships.",
    "Leverage Digital Platforms: Use online adventure networking communities, LinkedIn, and industry-specific forums to maintain connections and discover new opportunities.",
    "Attend Diverse Events: Participate in a variety of networking events, including business summits, cultural immersion trips, and professional meetups, to broaden your exposure.",
    "Be Authentic and Open-Minded: Approach networking with genuine curiosity and a willingness to learn from different cultures, industries, and perspectives.",
    "Optimize Your Travel Itinerary: Plan ahead to attend relevant meetups and conferences while traveling, ensuring you maximize your time and networking potential.",
  ],
};

const Paragraph_8: Partial<Paragraph> = {
  title: "Start Building Your Global Travel Network Today",
  contentTop: "Embarking on a journey with BizCivitas means stepping into a world where travel and professional growth intertwine seamlessly. Here's how you can start building your global travel network today:",
  listItems: [
    "Join the BizCivitas Community: Become a part of a vibrant network of professionals who value authentic connections and shared experiences. Our community is designed to foster meaningful relationships that transcend traditional networking.",
    "Participate in Curated Travel Experiences: Our meticulously planned journeys are crafted to promote genuine interactions among members. By sharing adventures, you create bonds that lead to lasting personal and professional relationships.",
    "Engage in Enriching Activities: From immersive cultural experiences to collaborative workshops, our activities are tailored to inspire growth and learning. Engage with peers in settings that encourage open dialogue and knowledge exchange.",
    "Access Exclusive Networking Events: Gain invitations to premium events where you can connect with industry leaders, entrepreneurs, and innovators. These gatherings provide platforms to expand your network and explore new opportunities.",
  ],
};

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "CouchSurfing",
    subtitle: "A Community Built on Travel Connections",
    description: "Casey Fenton's spontaneous trip to Iceland sparked the idea for CouchSurfing, where travelers connect, share homes, and experience cultures authentically.",
  },
  {
    id: 2,
    title: "Lonely Planet",
    subtitle: "Travel-Fueled Networking Turns into a Global Brand",
    description: "Tony and Maureen Wheeler's backpacking adventures inspired them to share travel tips. Through word-of-mouth and travel networks, Lonely Planet became a global guidebook giant.",
  },
  {
    id: 3,
    title: "Remote Year",
    subtitle: "Building Professional Networks While Traveling",
    description: "By connecting digital nomads, Remote Year created a movement where professionals work remotely while traveling, forming lifelong business and personal relationships.",
  },
  {
    id: 4,
    title: "Selina",
    subtitle: "Travel-Driven Co-working & Hospitality",
    description: "By staying in hostels and meeting digital nomads, Selina founders saw the need for work-friendly accommodations, leading to a network of co-living and co-working spaces.",
  },
  {
    id: 5,
    title: "Nomad List",
    subtitle: "Digital Nomads Connecting Through Tech",
    description: "Pieter Levels traveled while working remotely and saw the need for a resource to connect nomads. Nomad List now helps thousands find work-friendly cities and communities.",
  },
];

export default function TravelNetworkingPage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <main className="flex flex-col items-start justify-center">
        <TopSection
          heading="Travel Networking"
          subheading="Connect with like-minded professionals while exploring the world. Our travel networking events offer unique opportunities to build relationships, share experiences, and create lasting connections."
          backgroundImage="/blogs/greenSection.svg"
        />
        <div className="py-6"></div>
        <h1 className="text-4xl font-bold px-4 sm:px-10 lg:px-14 pt-14 text-green-500">
          Expand Your Horizons with Travel Networking
        </h1>
        <ParagraphSection paragraph={Paragraph_1} className="text-green-500" />
        <ParagraphSection paragraph={Paragraph_2} className="" />
        <ParagraphSection paragraph={Paragraph_3} className="text-green-500" />

        <div className="py-6"></div>
        <div className="w-screen py-14 bg-[#BBE7C7]">
          <ParagraphSection paragraph={Paragraph_4} className="text-green-500" />
        </div>

        <div className="py-6"></div>
        <ParagraphSection paragraph={Paragraph_5} className="" />
        <ParagraphSection paragraph={Paragraph_7} className="" />

        <div className="py-6"></div>
        <InfiniteCarousel
          items={carouselItems}
          title="Success Stories that Go with Our Motto"
          speed={25}
          pauseOnHover={true}
          backgroundColor="bg-orange-100"
          cardBackgroundColor="bg-white"
          titleColor="text-orange-500"
          textColor="text-gray-700"
          mainTitleColor="text-orange-500"
          gap={6}
        />

        <div className="py-6"></div>
        <ParagraphSection paragraph={Paragraph_8} className="" />

        <h1 className="text-4xl font-bold px-4 sm:px-10 lg:px-14 pt-14 text-green-500">
          FAQ's
        </h1>
        <Accordion items={faqs} />

        <div className="py-6"></div>
      </main>
    </>
  );
}