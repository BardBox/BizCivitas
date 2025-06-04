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
  popularBadge?: string;
  ctaText: string;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'core',
    name: 'BizCivitas Core Membership',
    slug: 'core',
    tagline: 'Connect. Collaborate. Transform.',
    description: 'The BizCivitas Core Membership offers driven entrepreneurs and professionals a transformative networking experience that combines business growth with travel, learning, and purposeful connections. More than just a movement, this membership provides structured meetings every alternate week, exclusive domestic and international travel experiences, and access to a thriving pan-India community to help you expand your network and unlock exponential growth.',
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
      'Targeted Networking: Join a curated network of purpose-driven professionals',
      'Collaborative Learning: Engage in interactive, agenda-driven sessions designed to spark ideas and share strategies',
      'Domestic & International Trips: Blend business with leisure (Bleisure) through annual travel retreats—4 days/3 nights domestic and 6 days/5 nights international',
      'Personal Development: Access expert-led workshops, mastermind circles, and transformative events',
      'Platform Access: Stay connected year-round with the exclusive BizCivitas platform',
      'Structured networking with purpose-driven professionals',
      'Annual domestic and international travel experiences',
      'Expert-led workshops and mastermind circles',
      'Year-round platform access for continuous connection',
      'Transformative business growth opportunities'
    ],
    benefits: [
      'Targeted Networking with curated professionals',
      'Collaborative Learning through interactive sessions',
      'Business + Leisure Travel Experiences',
      'Personal Development through expert workshops',
      'Exclusive Platform Access'
    ],
    highlights: [
      'Structured meetings every alternate week for consistent growth',
      'Annual travel retreats combining business with leisure',
      'Pan-India community of driven entrepreneurs',
      'Minimum 75% attendance requirement ensures meaningful engagement',
      'Expert-led workshops and transformative events'
    ],
    meetingStructure: [
      '20 sessions per year strategically planned',
      '6 sessions before domestic trip',
      '8 sessions between domestic and international trips', 
      '6 sessions post international trip',
      'Minimum 75% attendance required for meaningful engagement'
    ],
    images: ['/memberships/core-membership.jpg'],
    color: {
      primary: '#3b82f6',
      secondary: '#dbeafe'
    },
    ctaText: 'Join Core Movement'
  },
  {
    id: 'digital',
    name: 'Bizcivitas Digital Membership',
    slug: 'digital',
    tagline: 'Your First Step Into a Smarter Business World',
    description: 'The Bizcivitas Digital Membership is your entry into a thriving business ecosystem—designed for entrepreneurs, solopreneurs, professionals, and creators who want to grow smarter, faster, and with purpose. For just ₹6,999/year + GST, you gain access to the tools, insights, and connections needed to grow confidently, stay visible, and generate meaningful leads—all from one simple app.',
    price: {
      amount: 6999,
      currency: '₹',
    },
    features: [
      'Share updates, offers, and needs on the Community Feed',
      'Monthly 1-on-1 Smart Matchmaking sessions',
      'Access to the dynamic Member Directory',
      'Quarterly expert-led masterclasses',
      'Full access to the on-demand Knowledge Hub',
      'Weekly business tips, success stories & actionables',
      'Weekly Referral Threads for business exchange',
      'Get featured as Member of the Month',
      'Advanced Smart Search Tools to find ideal clients',
      'Priority access to events and trips',
      'Discounts on conclaves and retreats',
      'Invite 3 members to earn a free renewal or offline event pass',
      'Unlock Experiential Membership through active digital engagement'
    ],
    benefits: [
      'Network Smarter: Community Feed, Monthly 1-on-1 Smart Matchmaking, Dynamic Member Directory',
      'Learn What Works: Quarterly expert-led masterclasses, On-demand Knowledge Hub, Weekly business tips',
      'Grow with Visibility & Referrals: Weekly Referral Threads, Member of the Month features, Smart Search Tools',
      'Member-Only Perks: Priority event access, Discounts on conclaves, Invite rewards, Experiential Membership unlock'
    ],
    highlights: [
      'Affordable and accessible gateway to the Bizcivitas ecosystem',
      'Designed to deliver value without distractions',
      'No obligations—only strategic tools and genuine connections',
      'Ideal for early-stage and growth-focused professionals',
      'Start small. Grow big. Stay connected.',
      'Access to tools, insights, and connections from one simple app'
    ],
    images: ['/memberships/digital-membership.jpg'],
    color: {
      primary: '#22c55e',
      secondary: '#dcfce7'
    },
    ctaText: 'Start Digital Journey'
  },
  {
    id: 'flagship',
    name: 'BizCivitas Flagship Membership',
    slug: 'flagship',
    tagline: 'Where Ventures and Voyages Intersect',
    description: 'BizCivitas redefines business networking by blending professional growth with immersive travel experiences. The Flagship Membership offers entrepreneurs and professionals a unique platform to expand their network, explore new markets, and build meaningful collaborations beyond the boardroom.',
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
      '20 strategic meetings per year for consistent networking',
      '1 domestic networking trip to explore local markets',
      '1 international networking trip for global expansion',
      'Access to exclusive BizCivitas events and digital platform',
      'Informal yet focused networking in vibrant settings',
      'Learning and development through workshops and keynote sessions',
      'High-value referrals and business collaboration opportunities',
      'Trust-based networking with growth-oriented professionals',
      'Fresh perspectives from diverse business backgrounds',
      'Opportunities that go beyond traditional borders',
      'Curated community of innovators and business leaders',
      'Dynamic networking in scenic environments'
    ],
    benefits: [
      'Strategic Annual Meetings with structured networking',
      'Domestic & International Travel Experiences',
      'Exclusive Events and Digital Platform Access',
      'Workshop and Keynote Learning Sessions',
      'High-Value Referral Opportunities'
    ],
    highlights: [
      'Perfect blend of professional growth and travel experiences',
      'Curated community of innovators and business leaders',
      'Trust-based networking in vibrant, scenic settings',
      'Ideal for growth-oriented entrepreneurs and professionals',
      'Opportunities for market exploration and global expansion'
    ],
    meetingStructure: [
      '20 strategic meetings per year for consistent growth',
      '1 domestic networking trip to explore local opportunities',
      '1 international networking trip for global market access',
      'Exclusive access to BizCivitas events and digital platform',
      'Workshops and keynote sessions for continuous learning'
    ],
    images: ['/memberships/flagship-membership.jpg'],
    color: {
      primary: '#8b5cf6',
      secondary: '#e9d5ff'
    },
    ctaText: 'Join Flagship Journey'
  },
  {
    id: 'industria',
    name: 'Bizcivitas Industria Membership',
    slug: 'industria',
    tagline: 'Powering Industrial Connections. Fueling Global Growth.',
    description: 'Bizcivitas Industria is an exclusive networking ecosystem built for manufacturers, exporters, OEMs, and B2B industrial leaders (₹5 Cr+ turnover). This premium membership goes beyond conventional networking—blending high-value referral meetings, curated industrial tours, and global expansion pathways into one powerful platform.',
    price: {
      amount: 350000,
      currency: '₹',
      breakdown: {
        registration: 25000,
        meeting: 25000,
        annual: 300000
      }
    },
    features: [
      'Connect only with verified industrialists, decision-makers, and B2B business owners',
      '20+ business-first meetings annually, focused on structured lead sharing',
      'Spotlight sessions, recognition, and thought leadership within the community',
      'Join domestic and global visits to expos, plants, and JV partners (India, UAE, U.S.)',
      'Stay ahead with insights on trends, tech, and industrial innovation',
      'Business education tailored for industrial entrepreneurs',
      'Launch your own regional Bizcivitas chapter',
      'Join the Civitas Growth Council',
      'Earn by leading industrial community growth'
    ],
    benefits: [
      'Qualified Circle: Connect only with verified industrialists, decision-makers, and B2B business owners',
      'Referral-Driven Networking: 20+ business-first meetings annually, focused on structured lead sharing',
      'Brand Visibility: Spotlight sessions, recognition, and thought leadership within the community',
      'Industrial Delegations: Join domestic and global visits to expos, plants, and JV partners (India, UAE, U.S.)',
      'Knowledge Conclaves: Stay ahead with insights on trends, tech, and industrial innovation',
      'Learning Tools: Business education tailored for industrial entrepreneurs'
    ],
    highlights: [
      'Exclusive networking for ₹5 Cr+ turnover businesses',
      'High-value referral meetings and lead sharing',
      'Global industrial tours and expansion opportunities',
      'Leadership and chapter development opportunities',
      '₹3,50,000 total investment – for priceless returns on relationships'
    ],
    eligibility: [
      'Industrial business owners, partners, or CXOs',
      'Manufacturers, OEMs, B2B solution providers, exporters',
      'Minimum business turnover: ₹5 Cr+',
      'Long-term, ethical, and collaboration-driven mindset'
    ],
    images: ['/memberships/industria-membership.jpg'],
    color: {
      primary: '#f97316',
      secondary: '#fed7aa'
    },
    popularBadge: 'Most Popular',
    ctaText: 'Join Industria Elite'
  }
];

export function getAllMemberships(): MembershipPlan[] {
  return membershipPlans;
}

export function getMembershipBySlug(slug: string): MembershipPlan | null {
  return membershipPlans.find(plan => plan.slug === slug) || null;
}