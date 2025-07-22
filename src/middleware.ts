// src/middleware.ts

import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt');  

  if (req.url.includes('/dashboard')) {
    if (!token) {
      console.log('token not found')
      return NextResponse.redirect(new URL('/signin', req.url));
     
    }

    try {

      const decoded = jwtDecode<any>(token.value);
      if (decoded.exp < Date.now() / 1000) {
        return NextResponse.redirect(new URL('/signin', req.url));

      }
      if (decoded.role !== 'admin') {
        console.log('not admin')
        return NextResponse.redirect(new URL('/home', req.url));  
        
      }
    } catch (err) {
      console.log('invalid token')
      return NextResponse.redirect(new URL('/signin', req.url));  
   
    }
  }

  if (req.url.includes('/signin') || req.url.includes('/signup')) {
    if (token) {
      console.log('token is valid')
      return NextResponse.redirect(new URL('/dashboard', req.url));  
    }
  }

  return NextResponse.next();
}

// Define which routes should apply the middleware
export const config = {
  matcher: ['/dashboard', '/signin', '/signup'],
};
