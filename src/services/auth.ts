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
  async register(data: any): Promise<AuthResponse> {
    // Mapeia o payload em inglês para os nomes em português esperados pela Azure Function
    const payload = {
      nomeCompleto: data.fullName || data.nomeCompleto || data.name,
      email: data.email,
      cpf: data.cpf,
      dataNascimento: data.birthDate || data.dataNascimento,
      celular: data.cellphone || data.celular,
      senha: data.password || data.senha,
      endereco: {
        cep: data.cep,
        rua: data.street || data.rua,
        numero: data.number || data.numero,
        complemento: data.complement || data.complemento,
        bairro: data.neighborhood || data.bairro,
        cidade: data.city || data.cidade,
      },
      cep: data.cep,
      rua: data.street || data.rua,
      numero: data.number || data.numero,
      complemento: data.complement || data.complemento,
      bairro: data.neighborhood || data.bairro,
      cidade: data.city || data.cidade,
    };

    const response = await api.post<AuthResponse>("/usuarios", payload);
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
