
export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  images: string[];
  testimonials?: {
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar?: string;
  }[];
  highlights: string[];
  ctaText: string;
  popularBadge?: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "core",
    name: "Core Membership",
    slug: "core",
    tagline: "Essential Foundation for Growth",
    description: "Perfect for emerging entrepreneurs and startups looking to establish their business foundation.",
    fullDescription: "Our Core Membership is designed for ambitious entrepreneurs who are ready to take their business to the next level. With access to fundamental networking opportunities, essential business resources, and a supportive community of like-minded individuals, you'll have everything you need to build a strong foundation for your entrepreneurial journey.",
    features: [
      "Monthly networking events",
      "Access to business resource library",
      "Digital community platform",
      "Newsletter with industry insights",
      "Basic mentorship opportunities"
    ],
    benefits: [
      "Connect with 500+ entrepreneurs",
      "Access to exclusive content",
      "Monthly skill-building workshops",
      "Peer-to-peer learning sessions",
      "Industry trend reports"
    ],
    price: {
      monthly: 99,
      yearly: 990,
      currency: "₹"
    },
    images: [
      "/memberships/core-1.jpg",
      "/memberships/core-2.jpg",
      "/memberships/core-3.jpg",
      "/memberships/core-4.jpg"
    ],
    highlights: [
      "Perfect for startups",
      "Community-driven",
      "Affordable entry point",
      "Essential resources"
    ],
    ctaText: "Join Core Membership",
    color: {
      primary: "#3B82F6",
      secondary: "#EBF4FF",
      gradient: "from-blue-500 to-blue-600"
    }
  },
  {
    id: "flagship",
    name: "Flagship Membership",
    slug: "flagship",
    tagline: "Premium Business Acceleration",
    description: "Comprehensive membership for serious entrepreneurs seeking rapid business growth and premium networking.",
    fullDescription: "The Flagship Membership represents the pinnacle of business networking and growth acceleration. Designed for established entrepreneurs and business leaders who demand excellence, this membership provides unparalleled access to industry leaders, exclusive events, and transformative business opportunities that can reshape your entire business trajectory.",
    features: [
      "All Core Membership benefits",
      "VIP networking events",
      "1-on-1 executive coaching",
      "Exclusive masterclasses",
      "Priority access to partnerships",
      "Annual business retreat",
      "Direct access to investors"
    ],
    benefits: [
      "Connect with C-level executives",
      "Access to venture capital network",
      "Personal brand development",
      "Strategic business planning",
      "International networking opportunities",
      "Thought leadership platform"
    ],
    price: {
      monthly: 299,
      yearly: 2990,
      currency: "₹"
    },
    images: [
      "/memberships/flagship-1.jpg",
      "/memberships/flagship-2.jpg",
      "/memberships/flagship-3.jpg",
      "/memberships/flagship-4.jpg"
    ],
    highlights: [
      "Executive-level networking",
      "Investment opportunities",
      "Personal coaching",
      "Global connections"
    ],
    ctaText: "Unlock Flagship Benefits",
    popularBadge: "Most Popular",
    color: {
      primary: "#F59E0B",
      secondary: "#FEF3C7",
      gradient: "from-orange-500 to-yellow-500"
    }
  },
  {
    id: "industria",
    name: "Industria Membership",
    slug: "industria",
    tagline: "Industry-Specific Excellence",
    description: "Specialized membership tailored for manufacturing, industrial, and enterprise-level businesses.",
    fullDescription: "Industria Membership is crafted specifically for leaders in manufacturing, industrial sectors, and large-scale enterprises. This membership focuses on sector-specific challenges, regulatory compliance, supply chain optimization, and creating synergies between traditional industries and modern business practices.",
    features: [
      "Industry-specific networking",
      "Supply chain optimization workshops",
      "Regulatory compliance updates",
      "Technology integration seminars",
      "Manufacturing excellence programs",
      "Industrial partnership facilitation",
      "Sustainability consulting"
    ],
    benefits: [
      "Connect with industry veterans",
      "Access to sector-specific insights",
      "Regulatory compliance support",
      "Technology adoption guidance",
      "Sustainability transformation",
      "Export-import facilitation"
    ],
    price: {
      monthly: 499,
      yearly: 4990,
      currency: "₹"
    },
    images: [
      "/memberships/industria-1.jpg",
      "/memberships/industria-2.jpg",
      "/memberships/industria-3.jpg",
      "/memberships/industria-4.jpg"
    ],
    highlights: [
      "Industry-focused",
      "Manufacturing expertise",
      "Compliance support",
      "Technology integration"
    ],
    ctaText: "Join Industria Elite",
    color: {
      primary: "#10B981",
      secondary: "#D1FAE5",
      gradient: "from-green-500 to-emerald-600"
    }
  },
  {
    id: "digital",
    name: "Digital Membership",
    slug: "digital",
    tagline: "Future-Ready Digital Transformation",
    description: "Cutting-edge membership for tech entrepreneurs, digital innovators, and forward-thinking businesses.",
    fullDescription: "Digital Membership is designed for the new age of entrepreneurs who live and breathe technology. Whether you're building the next unicorn startup, leading digital transformation, or creating innovative solutions, this membership connects you with the most forward-thinking minds in the digital ecosystem.",
    features: [
      "Tech startup networking",
      "Digital transformation workshops",
      "AI & emerging tech seminars",
      "Startup pitch competitions",
      "Tech talent recruitment support",
      "Digital marketing mastery",
      "Blockchain & Web3 insights"
    ],
    benefits: [
      "Connect with tech innovators",
      "Access to latest tech trends",
      "Startup funding opportunities",
      "Digital skills development",
      "Innovation labs access",
      "Tech partnership facilitation"
    ],
    price: {
      monthly: 199,
      yearly: 1990,
      currency: "₹"
    },
    images: [
      "/memberships/digital-1.jpg",
      "/memberships/digital-2.jpg",
      "/memberships/digital-3.jpg",
      "/memberships/digital-4.jpg"
    ],
    highlights: [
      "Tech-focused",
      "Innovation-driven",
      "Startup ecosystem",
      "Future technologies"
    ],
    ctaText: "Go Digital Now",
    color: {
      primary: "#8B5CF6",
      secondary: "#EDE9FE",
      gradient: "from-purple-500 to-indigo-600"
    }
  }
];

export function getMembershipBySlug(slug: string): MembershipPlan | undefined {
  return membershipPlans.find(plan => plan.slug === slug);
}

export function getAllMemberships(): MembershipPlan[] {
  return membershipPlans;
}
