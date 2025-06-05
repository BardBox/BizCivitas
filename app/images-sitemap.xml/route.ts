// Image sitemap route for enhanced SEO
import { NextResponse } from 'next/server';
import { getAllBlogs } from '@/lib/blogs';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com';
  
  // Fetch all blogs for dynamic image sitemap
  const blogs = await getAllBlogs();
  
  // Static images that should be included in sitemap
  const staticImages = [
    {
      url: `${baseUrl}/`,
      images: [
        {
          url: `${baseUrl}/bizcivitas.svg`,
          title: 'BizCivitas Logo',
          caption: 'Official BizCivitas business networking platform logo'
        }
      ]
    },
    {
      url: `${baseUrl}/blogs`,
      images: [
        {
          url: `${baseUrl}/blogs/heroBlogs.png`,
          title: 'Business Blogs Hero Image',
          caption: 'Professional business insights and articles hero image'
        }
      ]
    }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Add static images
  staticImages.forEach(entry => {
    xml += `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>`;
    
    entry.images.forEach(image => {
      xml += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title><![CDATA[${image.title}]]></image:title>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
    </image:image>`;
    });
    
    xml += `
  </url>`;
  });

  // Add blog post images
  blogs.forEach((blog) => {
    if (blog.cover_url) {
      const imageUrl = blog.cover_url.startsWith('http') ? blog.cover_url : `${baseUrl}${blog.cover_url}`;
      
      xml += `
  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(blog.updated_at || blog.date).toISOString()}</lastmod>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title><![CDATA[${blog.topic_name || 'Blog Post'} - Featured Image]]></image:title>
      <image:caption><![CDATA[${blog.description || 'Business insights and analysis'}]]></image:caption>
    </image:image>
  </url>`;
    }
  });

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
