"use client";
import { createContext, useContext, useState } from "react";
import { createBrowserClient } from "@/utils/supabase-client";

const AuthContext = createContext(undefined);

export default function AuthProvider({ session, children }) {
  const [supabase] = useState(() => createBrowserClient());

  return <AuthContext.Provider value={{ supabase, session }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
