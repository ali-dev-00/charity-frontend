// src/utils/authUtils.ts

import { jwtDecode } from 'jwt-decode';

// Helper to get the JWT token from the cookies
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
    if (match) {
      console.log("JWT Token found in cookies:", match[2]);
      return match[2];
    } else {
      console.log("No JWT token found in cookies");
    }
  }
  console.log("Not in a browser environment");
  return null;
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  console.log("Token retrieved:", token);
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<any>(token);
    console.log("Decoded token:", decodedToken);
    const currentTime = Date.now() / 1000;
    const isValid = decodedToken.exp > currentTime;
    console.log("Token is valid:", isValid);
    return isValid; // Check if token is not expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return false; // If there's an error decoding the token, it's invalid
  }
};

// Get the role from the JWT token
export const getRoleFromToken = () => {
  const token = getAuthToken();
  console.log("Token retrieved for role:", token);
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<any>(token);
    console.log("Decoded token for role:", decodedToken);
    return decodedToken?.role; // Return the user's role from the decoded token
  } catch (error) {
    console.error("Error decoding token for role:", error);
    return null;
  }
};
