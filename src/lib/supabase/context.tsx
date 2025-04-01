import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

import Database, { DbTables, Supabase } from "./database";
import MediaManager from "./MediaManager";
import { createClient } from "./client";

type UserProfile = DbTables["user_profiles"]["Row"] | null;

type ContextType = {
  supabase: Supabase;
  session: Session | null | undefined;
  setIpcSession: React.Dispatch<
    React.SetStateAction<Session | null | undefined>
  >;
  userProfile: UserProfile;
};

const SupabaseContext = createContext<ContextType | undefined>(undefined);

const supabase = createClient();
const EIGHT_HOURS = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ipcSession, setIpcSession] = useState<Session | null | undefined>(
    undefined
  );
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const updateSession = (session: Session | null) => {
    console.log("updating session, sending session to main process..", session);
    setSession(session);
    window.electron.setSession(session);
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

  useEffect(() => {
    if (JSON.stringify(ipcSession) === JSON.stringify(session)) return;
    if (!ipcSession?.expires_at) return;
    if (!session?.expires_at) return;

    if (ipcSession.expires_at > session.expires_at) {
      setSession(ipcSession);
    } else {
      window.electron.setSession(session);
    }
  }, [ipcSession]);

  useEffect(() => {
    const resetTimer = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const duration = now - lastActivity;

      // If inactivity exceeds 8 hours, log out the user
      if (duration > EIGHT_HOURS) {
        console.log("Inactivity threshold exceeded: 8 hours. Logging out...");
        supabase.auth.signOut().then(({ error }) => {
          if (error) {
            console.error("Failed to sign out", error);
          } else {
            console.log("User signed out due to inactivity.");
          }
        });
      }
    }, 5 * 60000); // check every 5 minutes

    return () => clearInterval(intervalId);
  }, [lastActivity, supabase]);

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
    <SupabaseContext.Provider
      value={{ supabase, session, userProfile, setIpcSession }}
    >
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

  const mediaManager = new MediaManager(db, context.session as Session);

  return { ...context, db, mediaManager };
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
