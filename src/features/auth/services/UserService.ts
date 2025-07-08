import axios from "axios";
import AuthService from "./AuthService";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default class UserService {
  static getUserIdFromToken(): string | null {
    const token = AuthService.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.userId;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  }

  static async getUserById(token: string) {
    const response = await api.get("/users/" + token);
    return response.data;
  }
}