"use server"

import { MetadataRoute } from 'next'
import { getAllMemberships } from '@/lib/memberships'
import { getAllEvents } from '@/lib/events'
import { getAllBlogs } from '@/lib/blogs'
import { getAllTeamMembers } from '@/lib/team'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/memberships`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ]

  // Dynamic routes
  try {
    // Membership routes
    const memberships = getAllMemberships()
    const membershipRoutes = memberships.map((membership) => ({
      url: `${baseUrl}/memberships/${membership.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    // Event routes
    const events = await getAllEvents()
    const eventRoutes = events.map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: new Date(event.updated_at || event.created_at || event.date || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Blog/Blogs routes
    const blogs = await getAllBlogs()
    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Team member routes
    const teamMembers = await getAllTeamMembers()
    const teamRoutes = teamMembers.map((member) => ({
      url: `${baseUrl}/team/${member.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    return [
      ...staticRoutes,
      ...membershipRoutes,
      ...eventRoutes,
      ...blogRoutes,
      ...teamRoutes,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static routes if dynamic content fails
    return staticRoutes
  }
}