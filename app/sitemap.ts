import { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/events';
import { getAllBlogs } from '@/lib/blogs';

export default async function sitemap() {
  const events = await getAllEvents();
  const blogs = await getAllBlogs();

  const baseUrl = 'https://bizcivitas.com';

  const eventUrls = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.updated_at || event.created_at || event.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/insights/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.created_at || blog.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...eventUrls,
    ...blogUrls,
  ];
}