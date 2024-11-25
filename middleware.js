import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const publicApiRoutes = [
  '/api/packages',
  '/api/blog',
  '/api/blog/categories'
];

const publicCollections = [
  'faqs',
  'blogposts',
  'blogcategories',
];

const adminRoutes = [

];

export async function middleware(req) {
  try {
    let pathname = req.nextUrl.pathname;
    if (pathname.startsWith('//')) {
      const urlParts = pathname.split('/');
      pathname = '/' + urlParts.slice(3).join('/');
    }

    // Log the current request details
    console.log('Middleware: Processing request for path:', pathname, 'Method:', req.method);

    // Allow DELETE requests to pass through
    if (req.method === 'DELETE' && pathname.startsWith('/api/user/itineraries/')) {
      console.log('Middleware: Allowing DELETE request to pass through');
      return null;
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuth = !!token;
    const isAdmin = token?.role === 'admin';

    // Allow public access to blog routes
    if (pathname.startsWith('/blog') || pathname.startsWith('/api/blog')) {
      // Only protect admin routes
      if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (!isAuth || !isAdmin) {
          const fullPath = pathname + req.nextUrl.search;
          const fromUrl = fullPath.toLowerCase().indexOf('error') < 0 ? `?from=${encodeURIComponent(fullPath)}` : '';
          return NextResponse.redirect(new URL(`/auth/login${fromUrl}`, req.url));
        }
      }
      return null; // Allow access to all other blog routes
    }

    // Check for specific collections in the /api/mongodb route
    if (pathname === '/api/mongodb') {
      const url = new URL(req.url);
      const collection = url.searchParams.get('collection');
      
      if (publicCollections.includes(collection)) {
        return null;
      }
    }

    // Check if the user is on an authenticated route but not logged in
    const isAuthRoute = pathname.startsWith('/user') || pathname.startsWith('/checkout') || 
                        (pathname.startsWith('/api/user') && !pathname.startsWith('/api/user/itineraries/'));
    if (isAuthRoute && !isAuth) {
      console.log('Middleware: Unauthorized access attempt, redirecting to login');
      const fullPath = pathname + req.nextUrl.search;
      const fromUrl = fullPath.toLowerCase().indexOf('error') < 0 ? `?from=${encodeURIComponent(fullPath)}` : '';
      return NextResponse.redirect(new URL(`/auth/login${fromUrl}`, req.url));
    }

    return null;
  } catch (error) {
    console.error("Middleware Error:", error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const config = {
  matcher: [
    '/user/:path*', 
    '/checkout/:path*',
    '/api/:path*',
    '/api/auth/:path*',
    '/blog/:path*',
    '/itinerary/:path*',
  ]
};