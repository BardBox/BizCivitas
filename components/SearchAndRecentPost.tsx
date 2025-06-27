'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '@/types/blogs.types'
import { formatBlogDate } from '@/lib/blogs'

interface SearchAndRecentPostsProps {
  recentPosts: Blog[]
  currentSearch: string
  currentTopic: string
}

export default function SearchAndRecentPosts({ 
  recentPosts, 
  currentSearch, 
  currentTopic 
}: SearchAndRecentPostsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(currentSearch)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsSticky(scrollTop > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    } else {
      params.delete('search')
    }
    
    router.push(`/blogs?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchQuery('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    router.push(`/blogs?${params.toString()}`)
  }

  return (
    <div className={`${isSticky ? 'lg:sticky lg:top-4' : ''} transition-all duration-300`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 lg:p-6 space-y-6">
        {/* Search Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Blogs</h3>
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  title='Clear search'
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 flex align-center justify-center gap-4 text-white py-4 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-bold text-lg"
            >
              <svg
                  className="w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg> <p>Search Blogs</p>
            </button>
          </form>
          {currentSearch && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-500">
                Currently searching for: <strong>"{currentSearch}"</strong>
              </p>
              <button
                onClick={clearSearch}
                className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Recent Posts Section - Hidden on mobile */}
        <div className="hidden lg:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Recent Posts
          </h3>
          <div className="space-y-4">
            {recentPosts.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No recent posts available.</p>
            ) : (
              recentPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-52">
                      <Image
                        src={post.cover_url || "/placeholder-event.jpg"}
                        alt={post.topic_name || "Blog post"}
                        width={60}
                        height={60}
                        className="w-6 h-6 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className=" min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.topic_name || "Untitled Article"}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        By {post.author_name || "BizCivitas"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatBlogDate(post.date)}
                      </p>
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>

        {/* Quick Links - Hidden on mobile */}
        <div className="hidden lg:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Quick Links
          </h3>
          <div className="space-y-2">
            <Link
              href="/blogs"
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              View All Blogs
            </Link>
            <Link
              href="/events"
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Upcoming Events
            </Link>
            <Link
              href="/memberships"
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}