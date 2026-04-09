import { api } from "../clientApi";

import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "../../types/auth.types";

// POST /auth/register
export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// POST /auth/login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// POST /auth/logout
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// GET /auth/session
export const refreshSession = async (): Promise<void> => {
  await api.get("/auth/session");
};
