
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/events/',
          '/blogs/',
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
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
