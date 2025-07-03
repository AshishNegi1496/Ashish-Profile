import { create } from 'zustand';

type AuthStore = {
  token: string | null;
  username: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setUsername: (username: string | null) => void;
  setRole: (role: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  username: null,
  role: null,
  setToken: (token) => set({ token }),
  setUsername: (username) => set({ username }),
  setRole: (role) => set({ role }),
  logout: () => set({ token: null, username: null, role: null }),
}));


export function useUser() {
  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.username);
  const role = useAuthStore((state) => state.role);

  const isLoggedIn = Boolean(token && username);

  return {
    token,
    username,
    role,
    isLoggedIn,
  };
}