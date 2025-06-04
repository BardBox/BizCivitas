
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
    tagline: "Your Foundational Access to the BizCivitas Business Community",
    description: "Perfect for emerging entrepreneurs and startups looking to establish their business foundation with one-time registration fee and structured participation.",
    fullDescription: "The Core Membership is your foundational access to the BizCivitas business community. With a one-time registration fee and structured participation, those that join us will connect for professionals who want to engage meaningfully in curated core meetings, events, and community launches. It offers a streamlined path to get involved, connect, and grow with a like-minded network while maximizing flexibility in your participation.",
    features: [
      "One-time membership fee for encouraging and activating your BizCivitas membership",
      "Annual subscription fee granting access to exclusive BizCivitas communities, events, and benefits",
      "Recurring charge for attending structured BizCivitas networking meetings and events",
      "Total comprehensive access"
    ],
    benefits: [
      "Connect with 500+ entrepreneurs",
      "Access to exclusive content",
      "Monthly skill-building workshops",
      "Peer-to-peer learning sessions",
      "Industry trend reports"
    ],
    price: {
      monthly: 29500, // Total from image
      yearly: 354000, // Annual subscription
      currency: "₹"
    },
    images: [
      "/memberships/core-1.jpg",
      "/memberships/core-2.jpg",
      "/memberships/core-3.jpg",
      "/memberships/core-4.jpg"
    ],
    highlights: [
      "One-time registration: ₹29,500",
      "Annual membership: ₹3,54,000",
      "Meeting fees: ₹29,500",
      "Perfect for startups"
    ],
    ctaText: "Pay Now",
    color: {
      primary: "#F97316",
      secondary: "#FED7AA",
      gradient: "from-orange-500 to-orange-600"
    }
  },
  {
    id: "flagship",
    name: "Flagship Membership",
    slug: "flagship",
    tagline: "Premium Business Acceleration for Growth-Focused Professionals",
    description: "Designed for growth-focused professionals who want to fully immerse themselves in the BizCivitas network.",
    fullDescription: "The Flagship Membership is designed for growth-focused professionals who want to fully immerse themselves in the BizCivitas network. This plan includes a one-time registration fee along with Core Membership access and participation in key meetings and events. It's ideal for those who are ready to actively contribute, collaborate, and consistently show up where meaningful business conversations happen.",
    features: [
      "All Core Membership benefits",
      "One-time registration fee",
      "Annual subscription for granting access to exclusive BizCivitas communities, events, and benefits",
      "Recurring charge for attending structured BizCivitas networking meetings and events",
      "Community Launch Fees for one member (free for launching community)",
      "Priority access to partnerships"
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
      monthly: 29500, // Registration fee shown
      yearly: 354000, // Annual subscription
      currency: "₹"
    },
    images: [
      "/memberships/flagship-1.jpg",
      "/memberships/flagship-2.jpg",
      "/memberships/flagship-3.jpg",
      "/memberships/flagship-4.jpg"
    ],
    highlights: [
      "One-time registration: ₹29,500",
      "Annual membership: ₹3,54,000", 
      "Meeting fees: ₹29,500",
      "Community launch: ₹3,54,000"
    ],
    ctaText: "Pay Now",
    popularBadge: "Most Popular",
    color: {
      primary: "#F97316",
      secondary: "#FED7AA",
      gradient: "from-orange-500 to-orange-600"
    }
  },
  {
    id: "industria",
    name: "Industria Membership", 
    slug: "industria",
    tagline: "Industry-Specific Excellence for Manufacturing & Enterprise",
    description: "Designed for growth-focused professionals who want to fully immerse themselves in the BizCivitas network with industry-specific focus.",
    fullDescription: "The Industria Membership is designed for growth-focused professionals who want to fully immerse themselves in the BizCivitas network. This plan includes a one-time registration fee along with Core Membership access and participation in key meetings and events. It's ideal for those who represent actively contribute, collaborate, and consistently show up where meaningful business conversations happen in manufacturing and industrial sectors.",
    features: [
      "Industry-specific networking focus",
      "One-time registration fee for encouraging and activating your BizCivitas membership",
      "Manufacturing and industrial sector expertise",
      "Supply chain optimization workshops",
      "Regulatory compliance updates",
      "Technology integration seminars"
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
      monthly: 8299, // One-time registration fee from image
      yearly: 8299,
      currency: "₹"
    },
    images: [
      "/memberships/industria-1.jpg",
      "/memberships/industria-2.jpg", 
      "/memberships/industria-3.jpg",
      "/memberships/industria-4.jpg"
    ],
    highlights: [
      "One-time registration: ₹8,299",
      "Industry-focused approach",
      "Manufacturing expertise",
      "Compliance support"
    ],
    ctaText: "Pay Now",
    color: {
      primary: "#F97316",
      secondary: "#FED7AA", 
      gradient: "from-orange-500 to-orange-600"
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
