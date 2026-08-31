import { api } from "./api";
import type { RegisterData, LoginData } from "../utils/validations";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email?: string;
  };
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  async getProfile() {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async updateProfile(data: Partial<RegisterData>) {
    const response = await api.put("/auth/me", data);
    return response.data;
  },

  async deleteAccount() {
    const response = await api.delete("/auth/me");
    return response.data;
  },
};
