import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import {NextResponse} from 'next/server';
import {apiAuthPrefix, authRoutes, publicRoutes} from '@/routes';

const {auth: middleware} = NextAuth(authConfig);

export default middleware(req => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = matchRoute(nextUrl.pathname, publicRoutes);
  const isAuthRoute = matchRoute(nextUrl.pathname, authRoutes);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

function matchRoute(pathname: string, routes: string[]): boolean {
  return routes.some(route => {
    // Convert dynamic route [id] to a regex
    const regex = new RegExp(`^${route.replace(/\[.*?\]/g, '[^/]+')}$`);
    return regex.test(pathname);
  });
}
