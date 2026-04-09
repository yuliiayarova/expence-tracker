import { serverFetch } from "../serverApi";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "../../types/auth.types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/api`;


const refreshInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// POST /auth/register
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
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
  const cookieStore = await cookies();
  
  return refreshInstance.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};