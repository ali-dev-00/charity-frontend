// src/middleware.ts

import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt');  

  if (req.url.includes('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {

      const decoded = jwtDecode<any>(token.value);
      if (decoded.exp < Date.now() / 1000) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/home', req.url));  
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/signin', req.url));  // Invalid token
    }
  }

  if (req.url.includes('/signin') || req.url.includes('/signup')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));  
    }
  }

  return NextResponse.next();
}

// Define which routes should apply the middleware
export const config = {
  matcher: ['/dashboard', '/signin', '/signup'],
};
