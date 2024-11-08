// middleware.ts
import { NextResponse } from 'next/server'
//import type { NextRequest } from 'next/server'

export function middleware(request) {
  // Your middleware logic (e.g., authentication checks)
  console.log('lol!')

  return NextResponse.next()
}

// Apply the middleware to all pages except:
// 1. /dashboard (exclude this specific route)
// 2. /admin/* (exclude all routes under /admin)
// 3. /_next/* (exclude Next.js static and image assets)
export const config = {
  matcher: [
    '/((?!admin|admin|_next/static|_next/image|favicon.ico).*)',
  ],
}