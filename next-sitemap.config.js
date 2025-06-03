
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com',
  generateRobotsText: true,
  generateIndexSitemap: false,
  exclude: [
    '/private/*', 
    '/admin/*', 
    '/api/*',
    '/_next/*',
    '/favicon.ico',
    '*.json'
  ],
  outDir: './public',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
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
        ]
      },
      // Block AI crawlers
      {
        userAgent: [
          'CCBot',
          'ChatGPT-User',
          'CCBot/2.0',
          'anthropic-ai',
          'ClaudeBot'
        ],
        disallow: '/'
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Main section pages
    else if (path.match(/^\/(events|insights|team)$/)) {
      priority = 0.9;
      changefreq = 'daily';
    }
    // Dynamic event pages
    else if (path.match(/^\/events\/[^\/]+$/)) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // Dynamic insight pages
    else if (path.match(/^\/insights\/[^\/]+$/)) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Dynamic team pages
    else if (path.match(/^\/team\/[^\/]+$/)) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // Static pages
    else {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => {
    // You can add additional paths here if needed
    return [];
  }
}
