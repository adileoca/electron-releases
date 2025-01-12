import { createContext, useContext, useEffect, useState } from "react";
import Database from "./database";
import { createClient } from "./client";
import { ReactNode } from "react";
import { Supabase } from "./database";
import { Session } from "@supabase/supabase-js";

const SupabaseContext = createContext<
  { supabase: Supabase; session: Session | null | undefined } | undefined
>(undefined);

const supabase = createClient();

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const updateSession = (session: Session | null) => {
    // if (session) {
    setSession(session);
    window.electron.setSession(session);
    // } else {
    //   setSession(null);
    // }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSession(session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      updateSession(session);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

// just have a single hook for both the database and the supabase client
export const useDatabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a SupabaseProvider");
  }
  return { ...context, db: new Database(context.supabase) };
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
