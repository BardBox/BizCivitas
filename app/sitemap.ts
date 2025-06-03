import { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/events';
import { getAllBlogs } from '@/lib/blogs';
import { getAllTeamMembers } from '@/lib/team';

export default async function sitemap() {
  const events = await getAllEvents();
  const blogs = await getAllBlogs();
  const teamMembers = await getAllTeamMembers();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com';
  const now = new Date();

  const eventUrls = events.map((event) => {
    const eventDate = new Date(event.date);
    const isUpcoming = eventDate > now;
    
    return {
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: new Date(event.updated_at || event.created_at || event.date),
      changeFrequency: isUpcoming ? 'daily' as const : 'monthly' as const,
      priority: isUpcoming ? 0.9 : 0.7,
    };
  });

  const blogUrls = blogs.map((blog) => {
    const blogDate = new Date(blog.date);
    const daysSincePublished = Math.floor((now.getTime() - blogDate.getTime()) / (1000 * 60 * 60 * 24));
    const isRecent = daysSincePublished < 30;
    
    return {
      url: `${baseUrl}/insights/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.created_at || blog.date),
      changeFrequency: isRecent ? 'weekly' as const : 'monthly' as const,
      priority: isRecent ? 0.8 : 0.6,
    };
  });

  const teamUrls = teamMembers.map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: new Date(member.updated_at || member.created_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...eventUrls,
    ...blogUrls,
    ...teamUrls,
  ];
}