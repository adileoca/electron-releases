import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { ReactNode } from "react";
import MediaManager from "./MediaManager";
import { createClient } from "./client";
import { DbTables, Supabase } from "./database";
import Database from "./database";

type UserProfile = DbTables["user_profiles"]["Row"] | null;

type ContextType = {
  supabase: Supabase;
  session: Session | null | undefined;
  userProfile: UserProfile;
};

const SupabaseContext = createContext<ContextType | undefined>(undefined);

const supabase = createClient();

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const updateSession = (session: Session | null) => {
    setSession(session);
    window.electron.setSession(session);
  };

  // todo: make sure to update session at least every minute or so to prevent expired jwt tokens
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      updateSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .single();
      if (error) {
        console.error("error", error);
      } else {
        setUserProfile(data);
      }
    };

    fetchProfile();
  }, [session]);

  return (
    <SupabaseContext.Provider value={{ supabase, session, userProfile }}>
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

  const db = new Database(context.supabase);
  const mediaManager = new MediaManager(db);

  return { ...context, db, mediaManager };
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
