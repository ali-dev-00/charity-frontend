

import { LoginRequest, RegisterRequest, AuthResponse } from "./types/authTypes";
import { postToServer } from "../../lib/requests";

class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await postToServer("login", data);
    return response;
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await postToServer("register", data);
    return response;
  }
  static async logout() {
    const response = await postToServer("logout", {});
    if (response.status) {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';  
    }
    return response;
  }

}

export default AuthService;
