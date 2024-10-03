import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import { NextResponse } from 'next/server';
import {apiAuthPrefix, authRoutes, publicRoutes} from '@/routes';

const {auth: middleware} = NextAuth(authConfig);

export default middleware((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

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
