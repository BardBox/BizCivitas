
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Blog {
  id: string;
  slug: string;
  cover_url?: string;
  author_name?: string;
  date: string;
  topic_name?: string;
  type_of_topic?: string;
  description?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  
  return data || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
  
  return data;
}

export async function getBlogsByTopic(topic: string): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('type_of_topic', topic)
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs by topic:', error);
    return [];
  }
  
  return data || [];
}

export function getBlogSEOData(blog: Blog) {
  return {
    title: `${blog.topic_name || 'Blog Post'} | BizCivitas Insights`,
    description: blog.description || `Read our latest insights on ${blog.topic_name || 'business topics'} by ${blog.author_name || 'BizCivitas team'}.`,
    keywords: [blog.topic_name || 'business', blog.type_of_topic || 'insights', "business blog", "BizCivitas", blog.author_name || 'business insights'],
    ogTitle: `${blog.topic_name || 'Blog Post'} | BizCivitas Insights`,
    ogDescription: blog.description || `Read our latest insights on ${blog.topic_name || 'business topics'} by ${blog.author_name || 'BizCivitas team'}.`,
    ogImage: blog.cover_url || '/og-blog.jpg',
    twitterTitle: `${blog.topic_name || 'Blog Post'} | BizCivitas Insights`,
    twitterDescription: blog.description || `Read our latest insights on ${blog.topic_name || 'business topics'} by ${blog.author_name || 'BizCivitas team'}.`,
    twitterImage: blog.cover_url || '/og-blog.jpg',
  };
}

export async function getRecentBlogs(limit: number = 5): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching recent blogs:', error);
    return [];
  }
  
  return data || [];
}

export async function getBlogsByAuthor(authorName: string): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('author_name', authorName)
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs by author:', error);
    return [];
  }
  
  return data || [];
}

export function formatBlogDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getBlogReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
