
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface EventNavigationProps {
  currentEventSlug?: string;
}

export default function EventNavigation({ currentEventSlug }: EventNavigationProps) {
  const pathname = usePathname();
  const isEventsPage = pathname === '/events';
  const isEventDetailPage = pathname.startsWith('/events/') && currentEventSlug;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link 
              href="/events" 
              className={`hover:text-blue-600 transition-colors ${isEventsPage ? 'text-blue-600 font-medium' : ''}`}
            >
              Events
            </Link>
            {isEventDetailPage && (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-blue-600 font-medium">Event Details</span>
              </>
            )}
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {isEventDetailPage && (
              <Link 
                href="/events"
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                ← Back to Events
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <Link 
                href="/events"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isEventsPage 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                All Events
              </Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
