import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Redirect /insights to /blogs with 301 (permanent redirect)
  if (url.pathname === '/insights') {
    url.pathname = '/blogs'
    return NextResponse.redirect(url, 301)
  }

  // Redirect individual insight posts to blog posts
  if (url.pathname.startsWith('/insights/')) {
    url.pathname = url.pathname.replace('/insights/', '/blogs/')
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/insights/:path*']
}
