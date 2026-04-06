import { create } from "zustand";
import { GetUserResponse } from "../api/types/user.types";

type AuthStore = {
  isAuthenticated: boolean;
  user: GetUserResponse | null;
  setUser: (user: GetUserResponse) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: GetUserResponse) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
