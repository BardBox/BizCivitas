import type { Metadata } from "next";
import Head from "next/head";
import TopSection from "@/components/TopSection";
import ParagraphSection from "@/components/Networking/ParagraphSection";
import { Paragraph } from "@/types/blogs.types";
import { CarouselItem, InfiniteCarouselProps } from '@/types/carosual.types';
import Accordion from "@/components/Accordian";
import InfiniteCarousel from "@/components/Carousal";


const faqs = [
  {
    question: "What is Entrepeneur networking?",
    answer:
      "It involves blending professional networking with the excitement of exploring new destinations, fostering authentic connections through shared experiences.",
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
  title: "Entrepreneur Networking Groups & Events | BizCivitas - Business Networking Community",
  description: "Join BizCivitas entrepreneur networking groups and business meetups. Connect with startup founders, investors, and business leaders. Access mentorship, resources, and collaboration opportunities for business growth.",
  keywords: [
    "entrepreneur networking",
    "entrepreneur networking groups",
    "business networking community",
    "startup networking events",
    "entrepreneur meetups",
    "business meetups",
    "startup founders networking",
    "entrepreneur community",
    "business networking events",
    "professional networking",
    "entrepreneur collaboration",
    "startup networking groups",
    "business networking platform",
    "entrepreneur networking platform",
    "startup community",
    "business partnerships",
    "entrepreneur mentorship",
    "startup resources",
    "business development networking",
    "entrepreneur support network"
  ],
  openGraph: {
    title: "Entrepreneur Networking Groups & Events | BizCivitas - Business Networking Community",
    description: "Connect with startup founders, investors, and business leaders through BizCivitas entrepreneur networking groups. Access mentorship, resources, and collaboration opportunities.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/entrepreneur-networking`,
    images: [
      {
        url: "/og-entrepreneur-networking.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Entrepreneur Networking Groups - Business Community",
      },
    ],
    siteName: "BizCivitas",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrepreneur Networking Groups & Events | BizCivitas",
    description: "Join our entrepreneur networking community. Connect with startup founders, access mentorship, and discover collaboration opportunities.",
    site: "@BizCivitas",
    creator: "@BizCivitas",
    images: ["/og-entrepreneur-networking.jpg"],
  },
  alternates: {
    canonical: "/entrepreneur-networking",
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
      "@id": "https://bizcivitas.com/entrepreneur-networking#webpage",
      "url": "https://bizcivitas.com/entrepreneur-networking",
      "name": "Entrepreneur Networking Groups & Events | BizCivitas - Business Networking Community",
      "description": "Join BizCivitas entrepreneur networking groups and business meetups. Connect with startup founders, investors, and business leaders. Access mentorship, resources, and collaboration opportunities for business growth.",
      "isPartOf": {
        "@id": "https://bizcivitas.com#website",
      },
      "publisher": {
        "@id": "https://bizcivitas.com#organization",
      },
      "datePublished": "2025-06-09",
      "dateModified": "2025-06-09",
      "breadcrumb": {
        "@id": "https://bizcivitas.com/entrepreneur-networking#breadcrumb",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "Article",
      "@id": "https://bizcivitas.com/entrepreneur-networking#article",
      "headline": "Entrepreneur Networking Groups & Events | BizCivitas",
      "description": "Learn how BizCivitas entrepreneur networking groups can help you connect with startup founders, investors, and business leaders for mentorship, resources, and collaboration opportunities.",
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
        "@id": "https://bizcivitas.com/entrepreneur-networking#webpage",
      },
      "image": "https://bizcivitas.com/og-entrepreneur-networking.jpg",
      "articleSection": ["Entrepreneur Networking", "Business Growth"],
      "keywords": "entrepreneur networking, business networking, startup events, business meetups",
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
      "@id": "https://bizcivitas.com/entrepreneur-networking#breadcrumb",
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
          "name": "Entrepreneur Networking",
          "item": "https://bizcivitas.com/entrepreneur-networking",
        },
      ],
    },
  ],
};


const Paragraph_1: Partial<Paragraph> = {
    //   title: "Expand Your Horizons with Travel Networking",
    contentTop: "By BizCivitas",
    listItems: [
        "Entrepreneur networking groups are more than essential when it comes to growth. Networking with the right people leads to a kind of snowball effect. But here’s the kicker: face-to-face travel networking is the real game-changer. While the world is going all-in on digital, nothing beats the power of real, in-person connections..",
        "It not only builds a foundation of deeper connection but also acts as a launchpad for success in your various endeavours.",
        "It leads to game-changing collaborations, turning handshakes into head starts one collaboration at a time.",
    ],
};
const Paragraph_2: Partial<Paragraph> = {
    title: "Connect & Thrive with Entrepreneur Networking Groups",

    listItems: [
        "Entrepreneur networking groups provide a powerful platform to engage with like-minded professionals, exchange insights, and unlock new opportunities.",
        "These groups foster collaboration, mentorship, and strategic partnerships that can propel your business forward.",
        "Whether you’re a startup founder or an experienced business leader, joining the right network and attending business meetups can be a game-changer.",
    ],
    listItemIcon: "blogs/UL-icon-blue.svg",
    };

const Paragraph_3: Partial<Paragraph> = {
    title: "Why Entrepreneur Networking is Essential",

    listItems: [
        "Access to Resources: Networking connects you to valuable resources. This includes funding opportunities, industry insights, and expert advice. Whether it's finding the right mentor, investor, or service provider, a strong network can provide the tools and knowledge needed to scale your business.",
        "Expand Your Network: Building relationships with fellow entrepreneurs, investors, and industry leaders opens doors to new opportunities. A strong professional network can lead to potential partnerships, client referrals, and valuable connections.",
        "Skill Enhancement: Engaging with experienced professionals helps sharpen your business acumen, leadership abilities, and problem-solving skills. Networking groups often provide workshops, panel discussions, and knowledge-sharing sessions.",
        "Business Collaboration: Collaboration with other entrepreneurs can lead to innovative ideas, joint ventures, and strategic partnerships.By leveraging complementary skills and expertise, businesses can create mutually beneficial relationships that drive long-term success which would all be an ode to business meetups.",
        "Motivation & Support: Entrepreneurship can be challenging, but being part of a supportive network keeps you motivated.Surrounding yourself with like-minded individuals provides encouragement, accountability, and fresh perspectives that help you overcome obstacles and stay focused on your goals."
    ],
    
    listItemIcon: "blogs/UL-icon-blue.svg",
};
const Paragraph_4: Partial<Paragraph> = {
    title: "Why Choose Our Entrepreneur Networking Groups?",

    listItems: [
        "Curated Community: Sign up to become part of an exclusive network of entrepreneurs, business leaders, and industry experts. Our membership process ensures you connect with like-minded professionals who align with your business goals.",
        "Personalized Matchmaking: BizCivitas uses intelligent networking tools to connect you with the right people—whether you're looking for investors, mentors, collaborators, or clients. Our targeted approach ensures meaningful and productive interactions.",
        "Attend Exclusive Events & Workshops: Gain access to high-value networking events, mastermind sessions, and industry-specific workshops. Engage in insightful discussions, expand your knowledge, and build relationships that drive business growth.",
        "Access Expert Mentorship & Resources: Leverage guidance from experienced entrepreneurs and industry specialists through mentorship programs, panel discussions, and one-on-one advisory sessions. BizCivitas provides valuable resources to help you navigate business challenges.",
        "Collaborate & Grow Your Business: Our platform fosters an environment where members can exchange ideas, form strategic partnerships, and explore new opportunities. Whether it’s securing funding, launching a joint venture, or expanding into new markets, BizCivitas helps turn connections into success."
    ],
    
    listItemIcon: "blogs/UL-icon-blue.svg",
};
const Paragraph_5: Partial<Paragraph> = {
    title: "Types of Networking Opportunities Available",

    listItems: [
        "Business Meetups: Casual and structured gatherings where entrepreneurs connect, share ideas and explore collaborations. These meetups provide valuable networking opportunities in an informal setting.",
        "Entrepreneur Network Marketing: Entrepreneur network marketing is a platform for business owners to promote their services, exchange referrals, and build mutually beneficial partnerships. Ideal for those looking to expand their customer base and brand visibility.",
        "Female Entrepreneur Groups: Exclusive communities supporting women in business through mentorship, networking, and skill-building events. These groups foster empowerment, collaboration, and business growth.",
        "Small Business Meetup: Small business meetup designed for small business owners to connect, share experiences, and learn from industry experts.",
        "Networking Events for Entrepreneurs: Networking events for entrepreneurs’ industry-focused events, conferences, and workshops that bring together business leaders and innovators. These events facilitate high-value connections and learning opportunities.",
        "Young Entrepreneurs Network: The Young Entrepreneurs network provides a dynamic space for aspiring and early-stage entrepreneurs to connect, collaborate, and gain mentorship."
    ],
    
    listItemIcon: "blogs/UL-icon-blue.svg",
};


const carouselItems: CarouselItem[] = [
    {
        id: 1,
        title: "CouchSurfing",
        subtitle: "A Community Built on Travel Connections",
        description: "Casey Fenton's spontaneous trip to Iceland sparked the idea for CouchSurfing, where travellers connect, share homes, and experience cultures authentically."
    },
    {
        id: 2,
        title: "Lonely Planet",
        subtitle: "Travel-Fuelled Networking Turns into a Global Brand",
        description: "Tony and Maureen Wheeler's backpacking adventures inspired them to share travel tips. Through word-of-mouth and travel networks, Lonely Planet became a global guidebook giant."
    },
    {
        id: 3,
        title: "Remote Year",
        subtitle: "Building Professional Networks While Traveling",
        description: "By connecting digital nomads, Remote Year created a movement where professionals work remotely while traveling, forming lifelong business and personal relationships."
    },
    {
        id: 4,
        title: "Selina",
        subtitle: "Travel-Driven Co-working & Hospitality",
        description: "By staying in hostels and meeting digital nomads, Selina founders saw the need for work-friendly accommodations, leading to a network of co-living and co-working spaces."
    },
    {
        id: 5,
        title: "Nomad List",
        subtitle: "Digital Nomads Connecting Through Tech",
        description: "Pieter Levels travelled while working remotely and saw the need for a resource to connect nomads. Nomad List now helps thousands find work-friendly cities and communities."
    }
];

export default function EntrepreneurNetworkingPage() {
    return (
        <main className="flex flex-col items-start justify-center">
            <TopSection
                heading="Entrepreneur Networking"
                subheading="Connect with like-minded professionals while exploring the world. Our travel networking events offer unique opportunities to build relationships, share experiences, and create lasting connections."
                backgroundImage="/blogs/purpleSection.svg"
            />
            <div className="py-6"></div>
            <h1 className="text-4xl font-bold px-4 sm:px-10 lg:px-14 pt-14 text-blue-500"> Connect & Thrive with Entrepreneur Networking Groups  </h1>
            <ParagraphSection paragraph={Paragraph_1} className="text-blue-500 " />
            <ParagraphSection paragraph={Paragraph_2} className="" />
            <ParagraphSection paragraph={Paragraph_3} className="text-blue-500" />


            <div className="py-6"></div>
            <ParagraphSection paragraph={Paragraph_4} className="" />
            <ParagraphSection paragraph={Paragraph_5} className="" />
            
            <div className="py-6"></div>
            <InfiniteCarousel
                items={carouselItems}
                title="Success Stories that Go with Our Motto"
                speed={25}
                pauseOnHover={true}
                backgroundColor="bg-[#C7CEE6]"
                cardBackgroundColor="bg-white"
                titleColor="text-blue-500"
                textColor="text-gray-700"
                mainTitleColor="text-blue-500"
                gap={6}
            />
        
            <div className="py-6"></div>
            <h1 className="text-4xl font-bold px-4 sm:px-10 lg:px-14 pt-14 text-blue-500"> FAQ's  </h1>
            <Accordion items={faqs} />
            
            <div className="py-6"></div>
        </main>
    );
}