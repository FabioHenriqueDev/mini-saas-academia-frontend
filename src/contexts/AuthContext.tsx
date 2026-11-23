import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";


type User = {
  id: number;
  name: string;
  email: string;
  personal: boolean;
};

type LoginData = {
  token: string;
  user: User;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  autenticado: boolean;
  signIn: (data: LoginData) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function tokenExpirado(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    const salvo = localStorage.getItem("user");
    return salvo ? JSON.parse(salvo) : null;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const signIn = useCallback((data: LoginData) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }, []);

  useEffect(() => {
    if (token && tokenExpirado(token)) signOut();
  }, [token, signOut]);

  const autenticado = !!token && !tokenExpirado(token);

  return (
    <AuthContext.Provider value={{ token, user, autenticado, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}