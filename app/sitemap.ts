
import { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/events'
 
export default async function sitemap(): MetadataRoute.Sitemap {
  const events = await getAllEvents();
  
  const eventUrls = events.map((event) => ({
    url: `https://bizcivitas.com/events/${event.slug}`,
    lastModified: event.updated_at ? new Date(event.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: event.type === 'featured' ? 0.95 : 0.85,
  }));

  return [
    {
      url: 'https://bizcivitas.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://bizcivitas.com/discover',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bizcivitas.com/team',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://bizcivitas.com/insights',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://bizcivitas.com/events',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://bizcivitas.com/memberships',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bizcivitas.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://bizcivitas.com/corporate-networking',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bizcivitas.com/entrepreneur-networking',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bizcivitas.com/travel-networking',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...eventUrls,
  ]
}
