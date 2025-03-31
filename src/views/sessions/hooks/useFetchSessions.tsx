import { Supabase } from "@/lib/supabase/database";
import { useEffect, useState } from "react";

export const useFetchSessions = (supabase: Supabase) => {
  const [sessions, setSessions] = useState<Session[]>();

  useEffect(() => {
    const sessions = fetchSessions(supabase);
    sessions.then((data) => {
      if (data) setSessions(data);
      console.log("sessions", data);
    });
  }, [supabase]);

  return sessions;
};

const fetchSessions = async (supabase: Supabase) => {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      `*,
        replayEvents: session_replay_events(*)`
    )
    .eq("id", "e9888d26-63b0-417b-b108-05f228799132")
    .gte("session_replay_events.created_at", "2025-03-28 00:00:00+00");

  console.log("Data", data);
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

export type Session = Awaited<ReturnType<typeof fetchSessions>>[0];
