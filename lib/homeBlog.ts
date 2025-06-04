import { supabase } from './db'

// lib/supabase.ts
export interface Blog {
  id: string
  slug: string // Added slug field
  topic_name: string
  description: string
  content: string
  cover_url: string
  type_of_topic: string
  author_name: string
  date: string
  created_at: string
}

export async function getLatestBlogs(limit: number = 3): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }

  return data || []
}

export async function getRecentPosts(limit: number = 5): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }

  return data || []
}