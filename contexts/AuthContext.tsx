"use client";

import { createContext, useState, useEffect, useContext, ReactNode, startTransition } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { deleteAuthToken } from "@/utils/cookies";
import { env } from "@/infra/env";

export interface User {
  token: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const { token } = parseCookies();
      return token ? { token } : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setCookie(null, "token", data.token, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setUser({ token: data.token });

      startTransition(() => {
        router.push("/dashboard");
      });
    } else {
      alert("Login falhou!");
    }
  };

  const logout = () => {
    destroyCookie(null, "token");
    setUser(null);
    deleteAuthToken().then(() => {
      router.push("/login");
    });
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
