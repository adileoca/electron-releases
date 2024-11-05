import { useSupabase } from "@/lib/supabase/context";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useHandleSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const supabase = useSupabase();

  const updateSession = (session: Session | null) => {
    if (session) {
      setSession(session);
      window.electron.setSession(session);
    } else {
      setSession(null);
    }
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

  return session;
};
