import { Supabase } from "@/lib/supabase/database";
import { useEffect, useState } from "react";

export const useFetchSession = (
  supabase: Supabase,
  session_id: string | null,
  shouldFetch: number
) => {
  const [sessions, setSessions] = useState<Session>();

  useEffect(() => {
    if (!session_id) return;
    fetchSessions(supabase, session_id).then((data) => {
      setSessions(data);
      console.log("session", data);
    });
  }, [supabase, shouldFetch]);

  return sessions;
};

const fetchSessions = async (supabase: Supabase, session_id: string) => {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      `*, replayEvents: session_replay_events(*), gclid: session_gclids(*), fbclid: session_fbclids(*)`
    )
    .eq("id", session_id)
    .single();

  console.log("Data", data);
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

export type Session = Awaited<ReturnType<typeof fetchSessions>>;
