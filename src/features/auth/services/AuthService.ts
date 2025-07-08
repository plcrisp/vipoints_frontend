import axios from "axios";
import type { User } from "../types/User";

const API_URL = "http://localhost:3000";

export type LoginResponse = {
  token: string;
  user: User;
};

export default class AuthService {

  static async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  }

  static logout() {
    localStorage.removeItem("token");
  }

  static saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
  
}