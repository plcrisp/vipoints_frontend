import { UserType } from "./UserType";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // opcional, como no Prisma
  user_type: UserType;
  phone: string;
  cep: string;
  points: number;
  createdAt: string; // ou Date, dependendo de como você recebe do backend
  rank: number;

  // Relacionamentos (opcionais ou omitidos conforme uso)
  purchases?: any[];
  redemptions?: any[];
  notifications?: any[];
  referralSent?: any[];
  referralReceived?: any;
  logs?: any[];
}