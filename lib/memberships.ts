export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    breakdown?: {
      registration?: number;
      annual?: number;
      meeting?: number;
    };
  };
  features: string[];
  benefits: string[];
  highlights: string[];
  eligibility?: string[];
  meetingStructure?: string[];
  images: string[];
  color: {
    primary: string;
    secondary: string;
  };
  ctaText: string;
  popularBadge?: string;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'core',
    name: 'BizCivitas Core Membership',
    slug: 'core',
    tagline: 'Connect. Collaborate. Transform.',
    description: 'Join a curated network of purpose-driven professionals and engage in transformative experiences that blend business with personal growth.',
    price: {
      amount: 350000,
      currency: '₹'
    },
    features: [
      'Targeted Networking: Join a curated network of purpose-driven professionals',
      'Collaborative Learning: Engage in interactive, agenda-driven sessions designed to spark ideas and share strategies',
      'Domestic & International Trips: Blend business with leisure (Bleisure) through annual travel retreats—4 days/3 nights domestic and 6 days/5 nights international',
      'Personal Development: Access expert-led workshops, mastermind circles, and transformative events'
    ],
    benefits: [
      'Network with like-minded entrepreneurs',
      'Access to exclusive events and workshops',
      'Annual domestic and international trips',
      'Personal and professional development'
    ],
    highlights: [
      'Curated professional network',
      'Bleisure travel experiences',
      'Expert-led development sessions',
      'Interactive learning environments'
    ],
    meetingStructure: [
      '2 hours per meeting with structured agenda',
      'Monthly networking sessions with focused discussions',
      'Quarterly masterclasses with industry experts',
      'Annual retreat combining business and leisure activities'
    ],
    images: ['/memberships/core-membership.jpg'],
    color: {
      primary: '#3b82f6',
      secondary: '#dbeafe'
    },
    ctaText: 'Join Core Community'
  },
  {
    id: 'flagship',
    name: 'BizCivitas Flagship Membership',
    slug: 'flagship',
    tagline: 'Where Ventures and Voyages Intersect',
    description: 'BizCivitas redefines business networking by blending professional growth with immersive travel experiences. The Flagship Membership offers entrepreneurs and professionals a unique platform to expand their network, explore new markets, and build meaningful collaborations beyond the boardroom.',
    price: {
      amount: 750000,
      currency: '₹',
      breakdown: {
        registration: 25000,
        annual: 300000,
        meeting: 25000,
        community: 300000
      }
    },
    features: [
      '20 strategic meetings per year',
      '1 domestic and 1 international networking trip',
      'Access to exclusive BizCivitas events and digital platform',
      'Informal yet focused networking in vibrant settings',
      'Learning and development through workshops and keynote sessions',
      'High-value referrals and collaboration opportunities'
    ],
    benefits: [
      'C-suite level networking',
      'Investment opportunities',
      'Personal mentoring and advisory',
      'Global business connections',
      'Luxury experiences and events'
    ],
    highlights: [
      'Access to industry titans and decision makers',
      'Exclusive investment and partnership opportunities',
      'Personal board of advisors for strategic guidance',
      'Global network spanning multiple industries',
      'Premium experiences and luxury events'
    ],
    images: ['/memberships/flagship-membership.jpg'],
    color: {
      primary: '#7c3aed',
      secondary: '#ede9fe'
    },
    ctaText: 'Apply for Flagship',
    popularBadge: 'Most Popular'
  },
  {
    id: 'industria',
    name: 'BizCivitas Industria Membership',
    slug: 'industria',
    tagline: 'Built for Industry Leaders.',
    description: 'Designed exclusively for manufacturing leaders, industrialists, and B2B innovators. Connect with verified industrial decision-makers and grow your business through qualified referrals.',
    price: {
      amount: 350000,
      currency: '₹',
      breakdown: {
        registration: 25000,
        annual: 300000,
        meeting: 25000
      }
    },
    features: [
      'Qualified Circle: Connect only with verified industrialists',
      'Referral-Driven Networking: 20+ business-first meetings annually',
      'Spotlight sessions, recognition, and thought leadership within the community',
      'Join domestic and global visits to expos, plants, and JV partners (India, UAE, U.S.)',
      'Stay ahead with insights on trends, tech, and industrial innovation',
      'Business education tailored for industrial entrepreneurs'
    ],
    benefits: [
      'Qualified Circle: Connect only with verified industrialists',
      'Referral-Driven Networking: 20+ business-first meetings annually',
      'Brand Visibility: Spotlight sessions and recognition',
      'Industrial Delegations: Join domestic and global visits',
      'Knowledge Conclaves: Stay ahead with industry insights',
      'Learning Tools: Business education for entrepreneurs'
    ],
    highlights: [
      'Exclusive access to verified industrial leaders and decision-makers',
      'Structured referral meetings focused on generating quality business leads',
      'Global expansion opportunities through international delegations',
      'Industry-specific knowledge sharing and trend analysis',
      'Leadership opportunities within the industrial community'
    ],
    eligibility: [
      'Industrial business owners, partners, or CXOs',
      'Manufacturers, OEMs, B2B solution providers, exporters',
      'Minimum business turnover: ₹5 Cr+',
      'Long-term, ethical, and collaboration-driven mindset'
    ],
    images: ['/memberships/industria-membership.jpg'],
    color: {
      primary: '#ea580c',
      secondary: '#fed7aa'
    },
    ctaText: 'Apply for Industria'
  },
  {
    id: 'digital',
    name: 'Bizcivitas Digital Membership',
    slug: 'digital',
    tagline: 'Your First Step Into a Smarter Business World',
    description: 'The Digital Membership is your gateway to the BizCivitas ecosystem. Perfect for emerging entrepreneurs and growing businesses, this membership provides essential networking tools, online resources, and community access to help you build meaningful connections and accelerate your business growth.',
    price: {
      amount: 25000,
      currency: '₹'
    },
    features: [
      'Access to exclusive online networking events',
      'Digital business directory and member connections',
      'Monthly virtual workshops and webinars',
      'Business growth resources and templates',
      'Community forum access for peer-to-peer learning',
      'Email newsletters with industry insights',
      'Basic business consultation support'
    ],
    benefits: [
      'Cost-effective entry into BizCivitas community',
      'Flexible online networking opportunities',
      'Access to business growth resources',
      'Connect with like-minded entrepreneurs',
      'Monthly learning sessions'
    ],
    highlights: [
      'Perfect starting point for new entrepreneurs',
      'Fully digital and accessible from anywhere',
      'Affordable investment in your business network',
      'Pathway to premium memberships',
      'Community-driven growth approach'
    ],
    images: ['/memberships/digital-membership.jpg'],
    color: {
      primary: '#22c55e',
      secondary: '#dcfce7'
    },
    ctaText: 'Start Digital Journey'
  }
];

// Helper functions
export function getAllMemberships(): MembershipPlan[] {
  return membershipPlans;
}

export function getMembershipBySlug(slug: string): MembershipPlan | null {
  return membershipPlans.find(plan => plan.slug === slug) || null;
}