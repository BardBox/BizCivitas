import { Event } from './events';
import { TeamMember } from './team';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  structuredData: object;
  breadcrumbs: Array<{ name: string; url: string }>;
}

export function generateEventSEO(event: Event): SEOData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com';
  
  // Clean description
  const cleanDescription = event.description 
    ? event.description.replace(/<[^>]*>/g, '').trim()
    : `Join us for ${event.event_name}${event.location ? ` at ${event.location}` : ''}. Professional networking and business growth opportunities.`;
  
  const shortDescription = cleanDescription.length > 160 
    ? cleanDescription.substring(0, 157) + '...'
    : cleanDescription;
  
  // Generate comprehensive keywords
  const keywords = [
    event.event_name,
    event.type || 'business event',
    'networking',
    'BizCivitas',
    event.location || 'business networking',
    'professional development',
    'business community',
    new Date(event.date).getFullYear().toString(),
    new Date(event.date).toLocaleDateString('en-US', { month: 'long' }),
  ].filter(Boolean);
  
  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Events', url: '/events' },
    { name: event.event_name, url: `/events/${event.slug}` }
  ];
  
  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.event_name,
    "description": cleanDescription,
    "startDate": event.date,
    "location": event.location ? {
      "@type": "Place",
      "name": event.location
    } : undefined,
    "organizer": {
      "@type": "Organization",
      "name": "BizCivitas",
      "url": baseUrl
    },
    "image": event.cover_url || `${baseUrl}/og-events.jpg`,
    "url": `${baseUrl}/events/${event.slug}`,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}/events/${event.slug}`
    }
  };
  
  return {
    title: `${event.event_name} | BizCivitas Events`,
    description: shortDescription,
    keywords,
    ogImage: event.cover_url || '/og-events.jpg',
    structuredData,
    breadcrumbs
  };
}

export function generateTeamMemberSEO(member: TeamMember): SEOData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com';
  
  // Clean description
  const cleanDescription = member.description 
    ? member.description.replace(/<[^>]*>/g, '').trim()
    : `Meet ${member.name}, ${member.designation} at ${member.company_name || 'BizCivitas'}. ${member.leading_in_domain ? `Expert in ${member.leading_in_domain}.` : 'Business professional.'} Connect with our team member.`;
  
  const shortDescription = cleanDescription.length > 160 
    ? cleanDescription.substring(0, 157) + '...'
    : cleanDescription;
  
  // Generate keywords
  const keywords = [
    member.name,
    member.designation,
    member.leading_in_domain || 'business expert',
    'BizCivitas team',
    'business professional',
    member.company_name || 'BizCivitas',
    'business leader',
    'networking professional'
  ].filter(Boolean);
  
  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Team', url: '/team' },
    { name: member.name, url: `/team/${member.slug}` }
  ];
  
  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.designation,
    "description": cleanDescription,
    "image": member.img_url,
    "url": `${baseUrl}/team/${member.slug}`,
    "worksFor": member.company_name ? {
      "@type": "Organization",
      "name": member.company_name,
      "logo": member.company_logo
    } : {
      "@type": "Organization",
      "name": "BizCivitas",
      "url": baseUrl
    },
    "sameAs": [
      member.linkedin_link,
      member.website_link
    ].filter(Boolean),
    "knowsAbout": member.leading_in_domain
  };
  
  return {
    title: `${member.name} - ${member.designation} | BizCivitas Team`,
    description: shortDescription,
    keywords,
    ogImage: member.img_url || '/og-team.jpg',
    structuredData,
    breadcrumbs
  };
}

export function generateSEOScore(content: string, targetKeywords: string[]): number {
  let score = 0;
  const contentLower = content.toLowerCase();
  
  // Check keyword density
  targetKeywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    const occurrences = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
    const density = occurrences / content.split(' ').length;
    
    if (density >= 0.01 && density <= 0.03) {
      score += 10; // Good keyword density
    } else if (density > 0 && density < 0.06) {
      score += 5; // Acceptable density
    }
  });
  
  // Check content length
  if (content.length >= 300) score += 20;
  if (content.length >= 600) score += 10;
  
  return Math.min(100, score);
}

export function validateSEOData(seoData: Partial<SEOData>): string[] {
  const issues: string[] = [];
  
  if (!seoData.title || seoData.title.length < 30) {
    issues.push('Title should be at least 30 characters long');
  }
  
  if (!seoData.description || seoData.description.length < 120) {
    issues.push('Description should be at least 120 characters long');
  }
  
  if (!seoData.keywords || seoData.keywords.length < 3) {
    issues.push('Should have at least 3 keywords');
  }
  
  return issues;
}

// Advanced SEO optimization utilities
export function generateStructuredData(type: 'article' | 'organization' | 'website' | 'breadcrumb', data: any) {
  const baseStructure = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case 'article':
      return {
        ...baseStructure,
        "@type": "Article",
        headline: data.title,
        description: data.description,
        author: {
          "@type": "Person",
          name: data.author || "BizCivitas Team"
        },
        publisher: {
          "@type": "Organization",
          name: "BizCivitas",
          logo: {
            "@type": "ImageObject",
            url: "https://bizcivitas.com/logo.png"
          }
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        image: data.image,
        url: data.url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url
        }
      };

    case 'organization':
      return {
        ...baseStructure,
        "@type": "Organization",
        name: "BizCivitas",
        url: "https://bizcivitas.com",
        logo: "https://bizcivitas.com/logo.png",
        description: "Professional business networking platform connecting entrepreneurs, executives, and innovators worldwide",
        sameAs: [
          "https://www.linkedin.com/company/bizcivitas",
          "https://www.facebook.com/bizcivitas",
          "https://www.instagram.com/bizcivitas",
          "https://www.youtube.com/@BizCivitas"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-800-BIZCIV",
          contactType: "Customer Service"
        }
      };

    case 'website':
      return {
        ...baseStructure,
        "@type": "WebSite",
        name: "BizCivitas",
        url: "https://bizcivitas.com",
        description: "Professional business networking platform",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://bizcivitas.com/blogs?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };

    case 'breadcrumb':
      return {
        ...baseStructure,
        "@type": "BreadcrumbList",
        itemListElement: data.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };

    default:
      return baseStructure;
  }
}

// Image optimization utilities
export function generateOptimizedImageSizes() {
  return {
    mobile: "(max-width: 768px) 100vw",
    tablet: "(max-width: 1200px) 50vw", 
    desktop: "33vw"
  };
}

// Performance optimization for lazy loading
export function generateLazyLoadingProps(priority: boolean = false) {
  return {
    loading: priority ? "eager" as const : "lazy" as const,
    priority,
    sizes: generateOptimizedImageSizes().mobile + ", " + 
           generateOptimizedImageSizes().tablet + ", " + 
           generateOptimizedImageSizes().desktop
  };
}

// Generate canonical URLs
export function generateCanonicalUrl(path: string, baseUrl?: string) {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://bizcivitas.com";
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}

// SEO-optimized meta tags generator
export function generateSEOTags(config: {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    canonical: config.canonicalUrl,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.canonicalUrl,
      type: config.type || 'website',
      images: config.ogImage ? [{
        url: config.ogImage,
        width: 1200,
        height: 630,
        alt: config.title
      }] : [],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
      siteName: "BizCivitas",
      locale: "en_US"
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      ...(config.ogImage && { images: [config.ogImage] }),
      site: '@BizCivitas',
      creator: '@BizCivitas'
    }
  };
}
