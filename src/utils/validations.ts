import { z } from "zod";

// Helper to validate CPF (simplified format check for this scope)
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const phoneRegex = /^\(\d{2}\)\s\d{4,5}\-\d{4}$/;
const cepRegex = /^\d{5}\-\d{3}$/;

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cpf: z
    .string()
    .regex(cpfRegex, "CPF inválido. Use o formato XXX.XXX.XXX-XX"),
  birthDate: z.string().min(1, "A data de nascimento é obrigatória"),
  cellphone: z
    .string()
    .regex(phoneRegex, "Celular inválido. Use (XX) XXXXX-XXXX"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  
  // Address
  cep: z.string().regex(cepRegex, "CEP inválido. Use XXXXX-XXX"),
  street: z.string().min(2, "A rua é obrigatória"),
  number: z.string().min(1, "O número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "O bairro é obrigatório"),
  city: z.string().min(2, "A cidade é obrigatória"),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
