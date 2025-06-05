
import { unstable_cache } from 'next/cache';

// Cache configuration for different content types
export const CACHE_TAGS = {
  blogs: 'blogs',
  events: 'events',
  team: 'team',
  memberships: 'memberships',
} as const;

export const CACHE_DURATIONS = {
  blogs: 300, // 5 minutes
  events: 600, // 10 minutes
  team: 3600, // 1 hour
  memberships: 3600, // 1 hour
  seo: 1800, // 30 minutes
} as const;

// Memory cache for frequently accessed data
class MemoryCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 300000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

export const memoryCache = new MemoryCache();

// Enhanced cache function with memory cache fallback
export function createCachedFunction<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyPrefix: string,
  revalidate: number,
  tags: string[]
) {
  return unstable_cache(
    async (...args: T): Promise<R> => {
      const cacheKey = `${keyPrefix}:${JSON.stringify(args)}`;
      
      // Try memory cache first (for bots)
      const memoryCached = memoryCache.get(cacheKey);
      if (memoryCached) {
        return memoryCached;
      }

      // Execute function and cache result
      const result = await fn(...args);
      
      // Store in memory cache
      memoryCache.set(cacheKey, result, revalidate * 1000);
      
      return result;
    },
    [keyPrefix],
    {
      revalidate,
      tags,
    }
  );
}

// Bot detection utility
export function isCrawlerBot(userAgent: string = ''): boolean {
  const botPatterns = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /rogerbot/i,
    /linkedinbot/i,
    /embedly/i,
    /quora link preview/i,
    /showyoubot/i,
    /outbrain/i,
    /pinterest\/0\./i,
    /developers\.google\.com\/\+\/web\/snippet\//i,
    /slackbot/i,
    /vkshare/i,
    /w3c_validator/i,
    /redditbot/i,
    /applebot/i,
    /whatsapp/i,
    /flipboard/i,
    /tumblr/i,
    /bitlybot/i,
    /skypeuripreview/i,
    /nuzzel/i,
    /discordbot/i,
    /google page speed/i,
    /qwantify/i,
    /pinterestbot/i,
    /bitrix link preview/i,
    /xing-contenttabreceiver/i,
    /chrome-lighthouse/i,
    /telegrambot/i,
  ];

  return botPatterns.some(pattern => pattern.test(userAgent));
}

// Preload critical resources for bots
export function preloadCriticalData() {
  if (typeof window !== 'undefined') {
    // Client-side preloading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = '/api/blogs?limit=10';
    document.head.appendChild(link);
  }
}
