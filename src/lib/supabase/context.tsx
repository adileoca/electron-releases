import { createContext, useContext } from "react";
import Database from "./database";
import { createClient } from "./client";
import { ReactNode } from "react";
import { Supabase } from "./database";

const SupabaseContext = createContext<Supabase | null>(null);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const supabase = useContext(SupabaseContext);
  if (!supabase) {
    throw new Error("useDatabase must be used within a SupabaseProvider");
  }
  return new Database(supabase);
};

export const useSupabase = () => {
  const supabase = useContext(SupabaseContext);
  if (!supabase) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return supabase;
};
