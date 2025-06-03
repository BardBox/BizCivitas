
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'
  
  return {
    rules: [
      {
        userAgent: '*',
<<<<<<< HEAD
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      }
=======
        allow: [
          '/',
          '/events/',
          '/insights/',
          '/team/',
          '/about',
          '/discover',
          '/contact',
          '/memberships',
        ],
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/favicon.ico',
          '*.json',
          '/sitemap.xml',
          '/robots.txt',
        ],
      },
      // Specific rules for search engine bots
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
      // Block bad bots
      {
        userAgent: [
          'CCBot',
          'ChatGPT-User',
          'CCBot/2.0',
          'anthropic-ai',
          'ClaudeBot'
        ],
        disallow: '/',
      },
>>>>>>> 087dbd21f25084c401c5df429a0415d5e486e62d
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
