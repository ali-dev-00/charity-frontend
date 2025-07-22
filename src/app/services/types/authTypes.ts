export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: string;
  }
  
  export interface AuthResponse {
    status: boolean;
    message?: string;
    data?: {
      id: string;
        username: string;
        email: string;
        role: string;
    };
  }
  