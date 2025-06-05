import { supabase } from './db'


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

export async function getAllBlogs(limit?: number, offset?: number): Promise<Blog[]> {
  let query = supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });
  
  if (limit !== undefined) {
    query = query.limit(limit);
  }
  
  if (offset !== undefined) {
    query = query.range(offset, offset + (limit || 50) - 1);
  }
  
  const { data, error } = await query;
  
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
  // Extract text content from HTML for better descriptions
  const textContent = blog.content ? blog.content.replace(/<[^>]*>/g, '').trim() : '';
  const contentPreview = textContent.length > 160 ? textContent.substring(0, 157) + '...' : textContent;
  
  // Clean description from HTML if present
  const cleanDescription = blog.description ? 
    blog.description.replace(/<[^>]*>/g, '').trim() : '';
  
  const fallbackDescription = `Read our latest insights on ${blog.topic_name || 'business topics'} by ${blog.author_name || 'BizCivitas team'}. Published on ${new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Discover valuable business strategies and industry analysis.`;
  
  const description = cleanDescription || contentPreview || fallbackDescription;
  const shortDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  
  // Generate comprehensive keywords
  const keywords = [
    blog.topic_name || 'business', 
    blog.type_of_topic || 'insights', 
    "business blog", 
    "BizCivitas", 
    blog.author_name || 'business insights',
    "business strategy",
    "industry analysis",
    "thought leadership",
    "professional development",
    new Date(blog.date).getFullYear().toString(),
    "business advice"
  ].filter(Boolean);
  
  return {
    title: `${blog.topic_name || 'Blog Post'} | BizCivitas Insights`,
    description: shortDescription,
    keywords,
    ogTitle: `${blog.topic_name || 'Blog Post'} | BizCivitas Insights`,
    ogDescription: shortDescription,
    ogImage: blog.cover_url || '/og-blog.jpg',
    twitterTitle: `${blog.topic_name || 'Blog Post'} | BizCivitas Insights`,
    twitterDescription: shortDescription,
    twitterImage: blog.cover_url || '/og-blog.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: blog.topic_name,
      description: description,
      image: blog.cover_url,
      author: {
        "@type": "Person",
        name: blog.author_name || "BizCivitas Team"
      },
      publisher: {
        "@type": "Organization",
        name: "BizCivitas",
        url: "https://bizcivitas.com"
      },
      datePublished: blog.date,
      dateModified: blog.updated_at || blog.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://bizcivitas.com/insights/${blog.slug}`
      },
      articleSection: blog.type_of_topic || "Business Insights",
      keywords: keywords.join(", ")
    }
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
  // Strip HTML tags for accurate word count
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function extractTextFromHTML(htmlContent: string): string {
  return htmlContent.replace(/<[^>]*>/g, '').trim();
}

export function getBlogWordCount(content: string): number {
  const textContent = extractTextFromHTML(content);
  return textContent.split(/\s+/).filter(word => word.length > 0).length;
}

export function getBlogExcerpt(content: string, maxLength: number = 160): string {
  const textContent = extractTextFromHTML(content);
  if (textContent.length <= maxLength) {
    return textContent;
  }
  return textContent.substring(0, maxLength - 3) + '...';
}

export async function getBlogCount(topic?: string, searchQuery?: string): Promise<number> {
  let query = supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true });
  
  if (topic && topic !== 'All') {
    query = query.eq('type_of_topic', topic);
  }
  
  if (searchQuery) {
    query = query.or(
      `topic_name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,author_name.ilike.%${searchQuery}%`
    );
  }
  
  const { count, error } = await query;
  
  if (error) {
    console.error('Error fetching blog count:', error);
    return 0;
  }
  
  return count || 0;
}

export async function getPaginatedBlogs(
  page: number = 1,
  limit: number = 6,
  topic?: string,
  searchQuery?: string
): Promise<{ blogs: Blog[]; totalCount: number; totalPages: number }> {
  const offset = (page - 1) * limit;
  
  let query = supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (topic && topic !== 'All') {
    query = query.eq('type_of_topic', topic);
  }
  
  if (searchQuery) {
    query = query.or(
      `topic_name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,author_name.ilike.%${searchQuery}%`
    );
  }
  
  const [blogsResult, countResult] = await Promise.all([
    query,
    getBlogCount(topic, searchQuery)
  ]);
  
  if (blogsResult.error) {
    console.error('Error fetching paginated blogs:', blogsResult.error);
    return { blogs: [], totalCount: 0, totalPages: 0 };
  }
  
  const totalPages = Math.ceil(countResult / limit);
  
  return {
    blogs: blogsResult.data || [],
    totalCount: countResult,
    totalPages
  };
}
