import { env } from 'next-runtime-env';

export type ServerResponse = {
  status: boolean;
  message?: string;
  success?: string;
  data?: any;
  pagination?: any;
};

// Helper to get headers for JSON-based requests
const getHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', '*/*');
  return headers;
};

// Helper for making API requests (GET, POST, PUT, DELETE)
const apiRequest = async (
  urlPath: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS',
  body?: Record<string, any> | FormData
): Promise<ServerResponse> => {
  const requestOptions: RequestInit = {
    method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // Ensure cookies are sent with requests
  };

  // Handle FormData (for file uploads or other data types)
  if (body instanceof FormData) {
    delete requestOptions.headers; // Remove Content-Type header for FormData
    requestOptions.body = body;
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/api/${urlPath}`, requestOptions);
    const result = await response.json();

    // Handle 401 or 403 errors (Unauthorized or Forbidden)
    if (response.status === 401 || response.status === 403) {
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin'; // Redirect to login if unauthorized
      }
    }

    return result;
  } catch (error) {
    return { status: false, message: `Error occurred: ${(error as Error).message}` };
  }
};

// Helper functions for different HTTP methods

// POST request
export const postToServer = async (urlPath: string, body: Record<string, any>): Promise<ServerResponse> => {
  return apiRequest(urlPath, 'POST', body);
};

// GET request
export const getFromServer = async (urlPath: string): Promise<ServerResponse> => {
  return apiRequest(urlPath, 'GET');
};

// PUT request
export const putToServer = async (urlPath: string, body: Record<string, any>): Promise<ServerResponse> => {
  return apiRequest(urlPath, 'PUT', body);
};

// DELETE request
export const deleteFromServer = async (urlPath: string): Promise<ServerResponse> => {
  return apiRequest(urlPath, 'DELETE');
};
