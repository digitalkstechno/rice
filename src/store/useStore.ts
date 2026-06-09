import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Pricing Manager" | "Sales Team";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: "1",
        name: "Admin User",
        email: "admin@rise.com",
        role: "Super Admin",
      },
      isAuthenticated: true,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

interface AppState {
  usdRate: number;
  setUsdRate: (rate: number) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  usdRate: 83.50,
  setUsdRate: (usdRate) => set({ usdRate }),
}));
