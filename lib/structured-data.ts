// Advanced structured data schemas for enhanced SEO
// Includes FAQ, Product, Event, and other schema types

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EventSchema {
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address?: string;
  };
  description: string;
  organizer: {
    name: string;
    url?: string;
  };
  offers?: {
    price: string;
    currency: string;
    availability: string;
  };
}

export interface ProductSchema {
  name: string;
  description: string;
  brand: string;
  offers: {
    price: string;
    currency: string;
    availability: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export interface ServiceSchema {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string;
}

// Generate FAQ Schema
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate Event Schema
export function generateEventSchema(event: EventSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    "name": event.name,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": event.location.address
    },
    "description": event.description,
    "organizer": {
      "@type": "Organization",
      "name": event.organizer.name,
      "url": event.organizer.url
    },
    "offers": event.offers ? {
      "@type": "Offer",
      "price": event.offers.price,
      "priceCurrency": event.offers.currency,
      "availability": `https://schema.org/${event.offers.availability}`
    } : undefined
  };
}

// Generate Product Schema
export function generateProductSchema(product: ProductSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": product.offers.price,
      "priceCurrency": product.offers.currency,
      "availability": `https://schema.org/${product.offers.availability}`
    },
    "aggregateRating": product.aggregateRating ? {
      "@type": "AggregateRating",
      "ratingValue": product.aggregateRating.ratingValue,
      "reviewCount": product.aggregateRating.reviewCount
    } : undefined
  };
}

// Generate Service Schema
export function generateServiceSchema(service: ServiceSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider.name,
      "url": service.provider.url
    },
    "serviceType": service.serviceType,
    "areaServed": service.areaServed
  };
}

// Generate Organization Schema with enhanced details
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BizCivitas",
    "alternateName": "BizCivitas Business Community",
    "url": "https://bizcivitas.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bizcivitas.com/bizcivitas.svg",
      "width": 200,
      "height": 200
    },
    "description": "Empowering businesses through community, insights, and networking opportunities. Professional business networking platform turning visions into reality.",
    "foundingDate": "2020",
    "sameAs": [
      "https://linkedin.com/company/bizcivitas",
      "https://twitter.com/bizcivitas",
      "https://facebook.com/bizcivitas",
      "https://instagram.com/bizcivitas"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English",
        "email": "info@bizcivitas.com"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressLocality": "New York",
      "addressRegion": "NY"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "BizCivitas Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Networking Events",
            "description": "Professional networking events for business growth"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Membership Programs",
            "description": "Exclusive membership programs for business professionals"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Insights",
            "description": "Expert business insights and industry analysis"
          }
        }
      ]
    }
  };
}

// Generate WebSite Schema with enhanced search
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BizCivitas",
    "url": "https://bizcivitas.com",
    "description": "Professional business networking platform empowering businesses through community, insights, and networking opportunities.",
    "inLanguage": "en-US",
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://bizcivitas.com/blogs?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "BizCivitas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bizcivitas.com/bizcivitas.svg"
      }
    }
  };
}

// Generate Blog/Article Schema
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  imageUrl?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": `https://bizcivitas.com/blogs/${post.slug}`,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author || "BizCivitas Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BizCivitas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bizcivitas.com/bizcivitas.svg"
      }
    },
    "image": post.imageUrl ? {
      "@type": "ImageObject",
      "url": post.imageUrl,
      "width": 1200,
      "height": 630
    } : undefined,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bizcivitas.com/blogs/${post.slug}`
    },
    "keywords": post.tags?.join(", "),
    "articleSection": "Business",
    "wordCount": post.description.split(' ').length * 10 // Rough estimate
  };
}

// Generate Local Business Schema (if applicable)
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BizCivitas",
    "image": "https://bizcivitas.com/bizcivitas.svg",
    "url": "https://bizcivitas.com",
    "telephone": "+1-555-BIZCIVITAS",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Ave",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/bizcivitas",
      "https://twitter.com/bizcivitas",
      "https://facebook.com/bizcivitas"
    ]
  };
}

// Common FAQ data for BizCivitas
export const bizCivitasFAQs: FAQItem[] = [
  {
    question: "What is BizCivitas?",
    answer: "BizCivitas is a professional business networking platform that empowers businesses through community, insights, and networking opportunities. We turn visions into reality through seamless execution and unforgettable experiences."
  },
  {
    question: "How can I join BizCivitas?",
    answer: "You can join BizCivitas by visiting our membership page and selecting the plan that best fits your business needs. We offer various membership tiers with different benefits and networking opportunities."
  },
  {
    question: "What types of events does BizCivitas organize?",
    answer: "BizCivitas organizes various business events including networking sessions, quarterly business summits, industry workshops, and professional development seminars designed to foster business growth and connections."
  },
  {
    question: "Is BizCivitas suitable for startups?",
    answer: "Yes, BizCivitas welcomes businesses of all sizes, including startups. Our platform provides valuable networking opportunities, business insights, and resources that can help startups grow and connect with potential partners, investors, and mentors."
  },
  {
    question: "How often are new business insights published?",
    answer: "We regularly publish new business insights and articles on our blogs section. New content is added weekly, covering topics such as industry trends, business strategies, networking tips, and professional development."
  }
];

// Generate combined structured data for homepage
export function generateHomepageStructuredData() {
  return [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateFAQSchema(bizCivitasFAQs)
  ];
}
