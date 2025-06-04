// components/InsightsSection.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getLatestBlogs, type Blog } from '@/lib/homeBlog'
import './insights.css'
interface BlogCardProps {
  blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="blog-card group">
      <Link 
        href={`/insights/${blog.slug}`} 
        aria-label={`Read more about ${blog.topic_name}`}
      >
        <div className="relative overflow-hidden">
          <Image
            src={blog.cover_url}
            alt={`Cover image for ${blog.topic_name}`}
            width={400}
            height={250}
            className="blog-image"
            priority
          />
          <div className="content">
            <div className="hori">
              <span className="type-label">{blog.type_of_topic}</span>
              <div className="arrow-container">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7714 16.7702V1.30797M16.7714 1.30797H1.30922M16.7714 1.30797L1.30922 16.7702" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>{blog.topic_name}</h3>
            <p className="description">{blog.description}</p>
            <hr className="divider" />
            <p className="meta">By {blog.author_name} on {formatDate(blog.date)}</p>
          </div>
        </div>
      </Link>
    </article>
  )
}

interface RecentPostCardProps {
  post: Blog
}

function RecentPostCard({ post }: RecentPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="recent-post-card">
      <Link 
        href={`/insights/${post.slug}`} 
        className="flex gap-3 group"
        aria-label={`Read ${post.topic_name}`}
      >
        <Image
          src={post.cover_url}
          alt={`Cover image for ${post.topic_name}`}
          width={60}
          height={60}
          className="recent-post-image"
        />
        <div className="flex-1">
          <h4 className="recent-post-title">{post.topic_name}</h4>
          <p className="recent-post-meta">By {post.author_name} on {formatDate(post.date)}</p>
        </div>
      </Link>
    </article>
  )
}

export default async function InsightsSection() {
  const [latestBlogs] = await Promise.all([
    getLatestBlogs(3)
  ])

  return (
    <section className="insights-section" aria-labelledby="insights-heading">
      <div className="blog-wrapper">
        {/* Title */}
        <header className="title">
          <h2 id="insights-heading" className="insights-title">Insights and Updates</h2>
        </header>

        {/* Blog Content */}
        <div className="blog-content">
          {/* Left: Blog Grid (3 Latest Blogs) */}
          <div className="blog-grid" role="main">
            {latestBlogs.length > 0 ? (
              latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="no-blogs">No blogs available at the moment.</p>
            )}
          </div>
        </div>

        {/* Explore More Button */}
        <footer className="explore-more">
          <Link href="/insights" className="explore-btn">
            View All Insights
          </Link>
        </footer>
      </div>

    </section>
  )
}