import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerSchema, type RegisterData } from "../utils/validations";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { authService } from "../services/auth";

export default function Register() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const cepValue = watch("cep");

  const handleCEPBlur = async () => {
    if (cepValue && cepValue.replace(/\D/g, "").length === 8) {
      try {
        const cleanCep = cepValue.replace(/\D/g, "");
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );
        if (!response.data.erro) {
          setValue("street", response.data.logradouro);
          setValue("neighborhood", response.data.bairro);
          setValue("city", response.data.localidade);
          // Focus the number input as it's the next logical step
          document.getElementById("number")?.focus();
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setApiError("");
      const response = await authService.register(data);
      localStorage.setItem("@FoodDelivery:token", response.token);
      alert("Cadastro realizado com sucesso!");
      // navigate("/dashboard");
    } catch (error) {
      setApiError("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 h-[500px] w-[500px] rounded-full bg-secondary-100 blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-primary-100 blur-3xl opacity-50" />
      </div>

      <Card className="w-full max-w-2xl z-10">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
            Crie sua conta
          </CardTitle>
          <CardDescription>
            Preencha seus dados para começar a pedir suas comidas favoritas.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {apiError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {apiError}
              </div>
            )}

            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 border-b pb-2 border-gray-100">
                Dados Pessoais
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    placeholder="João da Silva"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    error={errors.cpf?.message}
                    {...register("cpf")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    error={errors.birthDate?.message}
                    {...register("birthDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cellphone">Celular</Label>
                  <Input
                    id="cellphone"
                    placeholder="(00) 00000-0000"
                    error={errors.cellphone?.message}
                    {...register("cellphone")}
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 border-b pb-2 border-gray-100">
                Endereço
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    placeholder="00000-000"
                    error={errors.cep?.message}
                    {...register("cep")}
                    onBlur={handleCEPBlur}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    placeholder="Av. Paulista"
                    error={errors.street?.message}
                    {...register("street")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    placeholder="1000"
                    error={errors.number?.message}
                    {...register("number")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento (opcional)</Label>
                  <Input
                    id="complement"
                    placeholder="Apto 123"
                    error={errors.complement?.message}
                    {...register("complement")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    placeholder="Bela Vista"
                    error={errors.neighborhood?.message}
                    {...register("neighborhood")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="São Paulo"
                    error={errors.city?.message}
                    {...register("city")}
                  />
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 border-b pb-2 border-gray-100">
                Segurança
              </h4>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Cadastrar
            </Button>
            <div className="text-center text-sm text-gray-500">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:underline"
              >
                Faça login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
