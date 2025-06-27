import { supabase } from './db'
import { Blog } from '@/types/blogs.types'

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