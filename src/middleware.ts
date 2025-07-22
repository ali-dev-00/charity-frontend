import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt');  // Get the JWT token from cookies

  // If the request is for the dashboard page
  if (req.url.includes('/dashboard')) {
    if (!token) {
      console.log('token not found');
      return NextResponse.redirect(new URL('/signin', req.url)); // Redirect if no token is found
    }

    try {
      // Decode the JWT token to check its expiration and role
      const decoded = jwtDecode<any>(token.value);
      if (decoded.exp < Date.now() / 1000) {
        // Token expired, redirect to signin
        return NextResponse.redirect(new URL('/signin', req.url));
      }

      // Check if the user is an admin
      if (decoded.role !== 'admin') {
        console.log('not admin');
        return NextResponse.redirect(new URL('/home', req.url));  // Redirect non-admins to home
      }
    } catch (err) {
      console.log('invalid token');
      return NextResponse.redirect(new URL('/signin', req.url));  // Handle invalid token
    }
  }

  // If the user is on the signin or signup page, but already has a valid token
  if (req.url.includes('/signin') || req.url.includes('/signup')) {
    if (token) {
      console.log('token is valid');
      return NextResponse.redirect(new URL('/dashboard', req.url));  // Redirect logged-in users to dashboard
    }
  }

  return NextResponse.next(); // Allow the request to continue if no conditions matched
}

// Define which routes should apply the middleware
export const config = {
  matcher: ['/dashboard', '/signin', '/signup'],  // Apply middleware to these routes
};
