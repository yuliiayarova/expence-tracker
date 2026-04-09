import { create } from 'zustand';
import { GetUserResponse } from '../api/types/user.types';

type AuthStore = {
  isAuthenticated: boolean;
  user: GetUserResponse | null;
  isAuthChecked: boolean;
  setUser: (user: GetUserResponse) => void;
  clearIsAuthenticated: () => void;
  setAuthChecked: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  isAuthChecked: false,

  setUser: (user: GetUserResponse) => {
    set(() => ({ user, isAuthenticated: true }));
  },

  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },

  setAuthChecked: (value: boolean) => {
    set(() => ({ isAuthChecked: value }));
  },
}));
