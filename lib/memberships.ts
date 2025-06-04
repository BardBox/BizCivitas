
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
    description: 'The BizCivitas Core Membership offers driven entrepreneurs and professionals a transformative networking experience that combines business growth with travel, learning, and purposeful connections. More than just a membership—this is a movement.',
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
    description: 'The Bizcivitas Digital Membership is your entry into a thriving business ecosystem—designed for entrepreneurs, solopreneurs, professionals, and creators who want to grow smarter, faster, and with purpose.',
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
      'Network Smarter with Community Feed and Matchmaking',
      'Learn What Works with expert masterclasses',
      'Grow with Visibility & Referrals',
      'Member-Only Perks and discounts'
    ],
    highlights: [
      'Affordable and accessible gateway to the Bizcivitas ecosystem',
      'Designed to deliver value without distractions',
      'No obligations—only strategic tools and genuine connections',
      'Ideal for early-stage and growth-focused professionals'
    ],
    images: ['/memberships/digital-membership.jpg'],
    color: {
      primary: '#22c55e',
      secondary: '#dcfce7'
    },
    ctaText: 'Start Digital Journey'
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
      'Qualified Circle of verified industrial leaders',
      'Referral-Driven Networking with 20+ annual meetings',
      'Brand Visibility and thought leadership',
      'Industrial Delegations to global markets',
      'Knowledge Conclaves and learning tools',
      'Leadership Opportunities in community growth'
    ],
    highlights: [
      'Exclusive networking for ₹5 Cr+ turnover businesses',
      'High-value referral meetings and lead sharing',
      'Global industrial tours and expansion opportunities',
      'Leadership and chapter development opportunities'
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
