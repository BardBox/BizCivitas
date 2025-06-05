// components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import LazyImage from './LazyImage'; // Import LazyImage
import { Blog } from '@/types/blogs.types';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/insights/${blog.slug}`} className="blog-card">
      <div className="blog-card-content">
        <div className="blog-image-container">
          <LazyImage
            src={blog.cover_url}
            alt={`Cover image for ${blog.topic_name}`}
            width={300}
            height={250}
            className="blog-image"
            priority={false}
          />
        </div>
        <div className="content">
          <div className="hori">
            <span className="type-label">{blog.type_of_topic}</span>
            <div className="arrow-container">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7714 16.7702V1.30797M16.7714 1.30797H1.30922M16.7714 1.30797L1.30922 16.7702" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>{blog.topic_name}</h3>
          <p className="description">{blog.description}</p>
          <hr />
          <p className="meta">By {blog.author_name} on {new Date(blog.date).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;