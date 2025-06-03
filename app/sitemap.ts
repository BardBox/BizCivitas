
import { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/events';
import { getAllBlogs } from '@/lib/blogs';
import { getAllTeamMembers } from '@/lib/team';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com';
  const now = new Date();

  try {
    // Fetch all dynamic content from Supabase
    const [events, blogs, teamMembers] = await Promise.all([
      getAllEvents(),
      getAllBlogs(),
      getAllTeamMembers()
    ]);

    // Static pages with enhanced SEO
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/discover`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/memberships`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      // Main section pages
      {
        url: `${baseUrl}/events`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/insights`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/team`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    // Dynamic event pages with enhanced metadata
    const eventUrls: MetadataRoute.Sitemap = events.map((event) => {
      const eventDate = new Date(event.date);
      const isUpcoming = eventDate > now;
      const daysSinceEvent = Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Determine priority based on event relevance
      let priority = 0.7;
      if (isUpcoming) {
        priority = 0.9;
      } else if (daysSinceEvent < 30) {
        priority = 0.8;
      } else if (daysSinceEvent < 90) {
        priority = 0.7;
      } else {
        priority = 0.6;
      }

      return {
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: new Date(event.updated_at || event.created_at || event.date),
        changeFrequency: isUpcoming ? 'daily' as const : 
                        daysSinceEvent < 7 ? 'weekly' as const : 'monthly' as const,
        priority,
      };
    });

    // Dynamic blog/insights pages with enhanced metadata
    const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => {
      const blogDate = new Date(blog.date);
      const daysSincePublished = Math.floor((now.getTime() - blogDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Determine priority based on content freshness
      let priority = 0.6;
      let changeFrequency: 'weekly' | 'monthly' = 'monthly';
      
      if (daysSincePublished < 7) {
        priority = 0.9;
        changeFrequency = 'weekly';
      } else if (daysSincePublished < 30) {
        priority = 0.8;
        changeFrequency = 'weekly';
      } else if (daysSincePublished < 90) {
        priority = 0.7;
      }
      
      return {
        url: `${baseUrl}/insights/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.created_at || blog.date),
        changeFrequency,
        priority,
      };
    });

    // Dynamic team member pages with enhanced metadata
    const teamUrls: MetadataRoute.Sitemap = teamMembers.map((member) => {
      const memberDate = new Date(member.updated_at || member.created_at || now);
      const daysSinceUpdate = Math.floor((now.getTime() - memberDate.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        url: `${baseUrl}/team/${member.slug}`,
        lastModified: memberDate,
        changeFrequency: daysSinceUpdate < 30 ? 'weekly' as const : 'monthly' as const,
        priority: 0.7,
      };
    });

    // Combine all URLs and sort by priority for better SEO
    const allUrls = [
      ...staticPages,
      ...eventUrls,
      ...blogUrls,
      ...teamUrls,
    ].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return allUrls;

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback sitemap with static pages only
    return [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/discover`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/memberships`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/events`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/insights`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/team`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];
  }
}
