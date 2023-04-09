"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    console.log(subscription);

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return <AuthContext.Provider value={{ supabase }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
