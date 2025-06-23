import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The authorized routes for each role
const authorizedRoutes: Record<string, RegExp> = {
  admin: /^\/admin(\/.*)?$/,
  coach: /^\/coach(\/.*)?$/,
  student: /^\/student(\/.*)?$/,
};

export default auth((request) => {
  const session = request.auth;
  const { pathname } = request.nextUrl;

  // If the user is not logged in, redirect to login page for any protected route
  if (!session?.user) {
    if (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/coach') ||
      pathname.startsWith('/student')
    ) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // If user is logged in
  const userRole = session.user.role;

  // Special case: if user is on /login page, redirect them to their home
  if (pathname === '/login') {
    const homeUrl = new URL(`/${userRole}`, request.url);
    return NextResponse.redirect(homeUrl);
  }
  
  const isAuthorized = authorizedRoutes[userRole]?.test(pathname);

  if (!isAuthorized) {
    // If user tries to access a page they are not authorized for,
    // redirect them to their default page.
    const homeUrl = new URL(`/${userRole}`, request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/coach/:path*', '/student/:path*', '/login'],
};