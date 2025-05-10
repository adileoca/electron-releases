import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Session } from "@supabase/supabase-js";

import { SupabaseContextType, UserProfile } from "./types";
import { getUserProfile } from "./queries";
import MediaManager from "./MediaManager";
import { createClient } from "./client";
import Database from "./database";

const EIGHT_HOURS = 8 * 60 * 60 * 1000;

const supabase = createClient();
const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ipcSession, setIpcSession] = useState<Session | null | undefined>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null | undefined>();
  const [lastActivity, setLastActivity] = useState(Date.now());

  const updateSession = (session: Session | null) => {
    window.electron.setSession(session);
    setSession(session);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      // if (session && session.expires_at) {
      //   const now = Math.floor(Date.now() / 1000);
      //   if (session.expires_at < now + 60) {
      //     updateSession(null);
      //     supabase.auth.signOut();
      //     return;
      //   }
      // }
      updateSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const handleGetSession = useCallback(
    () => window.electron.setSession(session ?? null),
    [session]
  );
  const handleSetSession = useCallback(
    (newSession: Session) => setIpcSession(newSession),
    []
  );
  useEffect(() => {
    window.electron.on("get-session", handleGetSession);
    window.electron.on("update-session", handleSetSession);

    return () => {
      window.electron.removeListener("get-session", handleGetSession);
      window.electron.removeListener("update-session", handleSetSession);
    };
  }, [handleGetSession, handleSetSession]);

  useEffect(() => {
    if (JSON.stringify(ipcSession) === JSON.stringify(session)) return;
    if (!ipcSession?.expires_at || !session?.expires_at) return;

    if (ipcSession.expires_at > session.expires_at) {
      setSession(ipcSession);
    } else {
      window.electron.setSession(session);
    }
  }, [ipcSession]);

  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());

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
      const duration = Date.now() - lastActivity;
      if (duration < EIGHT_HOURS) return;

      // If inactivity exceeds 8 hours, log out the user
      supabase.auth.signOut().then(({ error }) => {
        if (error) console.error("Failed to sign out", error);
      });
    }, 5 * 60000); // every 5 minutes

    return () => clearInterval(intervalId);
  }, [lastActivity, supabase]);

  useEffect(() => {
    if (!session) return;
    const fetchProfile = async () => {
      const data = await getUserProfile(supabase, session.user.id);
      setUserProfile(data);
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

// remove useDatabase, move mediaManager to useSupabase
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
