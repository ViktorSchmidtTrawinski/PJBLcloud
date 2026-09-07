import { api } from "./api";
import type { RegisterData, LoginData } from "../utils/validations";

interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  [key: string]: any;
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/usuarios", data);
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>("/usuarios");
    return response.data;
  },

  async getProfile(id?: string) {
    const url = id ? `/usuarios/${id}` : "/usuarios";
    const response = await api.get(url);
    return response.data;
  },

  async updateProfile(id: string, data: Partial<RegisterData>) {
    const response = await api.put(`/usuarios/${id}`, data);
    return response.data;
  },

  async deleteAccount(id: string) {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },
};
