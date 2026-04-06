import { serverFetch } from "../serverApi";

import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "../../types/auth.types";
import { AxiosResponse } from "axios";

// POST /auth/register
export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  return serverFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: data,
  });
};

// POST /auth/login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return serverFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: data,
  });
};

// POST /auth/logout
export const logout = async (): Promise<void> => {
  return serverFetch<void>("/auth/logout", { method: "POST" });
};

// GET /auth/session
export const refreshSession = async (): Promise<AxiosResponse> => {
  return serverFetch("/auth/session");
};
