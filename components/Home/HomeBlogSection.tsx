// components/HomeBlogSection.tsx
import React from 'react';
import Link from 'next/link';
import BlogCard from './BlogCardComponent';
import { Blog } from '@/types/blogs.types';

interface HomeBlogSectionProps {
  blogs: Blog[];
}

const HomeBlogSection: React.FC<HomeBlogSectionProps> = ({ blogs }) => {
  return (
    <section className="blog-wrapper">
      <div className="title">
        <h2>Insights and Updates</h2>
      </div>
      <div className="blog-content">
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
      <div className="explore-more">
        <Link href="/insights" className="explore-btn">
          View All
        </Link>
      </div>
    </section>
  );
};

export default HomeBlogSection;