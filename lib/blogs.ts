import { supabase } from './db'
import { createCachedFunction, CACHE_DURATIONS, CACHE_TAGS, memoryCache } from './cache-utils';

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

// Non-cached version for internal use
async function _getAllBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    return [];
  }
}

// Cached version
export const getAllBlogs = createCachedFunction(
  _getAllBlogs,
  'blogs-all',
  CACHE_DURATIONS.blogs,
  [CACHE_TAGS.blogs]
);

// Paginated blogs function
async function _getBlogsPaginated(page: number = 1, limit: number = 6): Promise<{
  blogs: Blog[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  try {
    const offset = (page - 1) * limit;

    // Get total count
    const { count, error: countError } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error getting blog count:', countError);
      return { blogs: [], totalCount: 0, totalPages: 0, currentPage: page };
    }

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated data
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching paginated blogs:', error);
      return { blogs: [], totalCount, totalPages, currentPage: page };
    }

    return {
      blogs: data || [],
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error('Error in getBlogsPaginated:', error);
    return { blogs: [], totalCount: 0, totalPages: 0, currentPage: page };
  }
}

export const getBlogsPaginated = createCachedFunction(
  _getBlogsPaginated,
  'blogs-paginated',
  CACHE_DURATIONS.blogs,
  [CACHE_TAGS.blogs]
);

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