// src/utils/authUtils.ts

import { jwtDecode } from 'jwt-decode';

// Helper to get the JWT token from the cookies
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    // Extract JWT token from cookies
    const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
    return match ? match[2] : null;
  }
  return null;
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const decodedToken = jwtDecode<any>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime; // Check if token is not expired
  } catch (error) {
    return false; // If there's an error decoding the token, it's invalid
  }
};

// Get the role from the JWT token
export const getRoleFromToken = () => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const decodedToken = jwtDecode<any>(token);
    return decodedToken?.role; // Return the user's role from the decoded token
  } catch (error) {
    return null;
  }
};
