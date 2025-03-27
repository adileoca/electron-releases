import { useState, useRef, useEffect, useMemo } from "react";

import { useFetchSessions } from "./hooks/useFetchSessions";
import { useDatabase } from "@/lib/supabase/context";
import { Session } from "./hooks/useFetchSessions";

import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css"; // Add this import

const Sessions = () => {
  const { supabase } = useDatabase();
  const sessions = useFetchSessions(supabase);

  useEffect(() => {
    console.log("sessions", sessions);
  }, [sessions]);

  const session = useMemo(
    () =>
      sessions?.find(
        (session) =>
          session.replayEvents.length > 0 ||
          session.id === "a1e80737-2d80-4751-a7c8-9b8d8235163c"
      ),
    [sessions]
  );
  useEffect(() => {
    console.log("found session", session);
  }, [session]);

  return (
    <div className="p-4">
      {session ? <SessionCard session={session} /> : <div>Loading...</div>}
    </div>
  );
};

export default Sessions;

const SessionCard: React.FC<{ session: Session }> = ({ session }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [replayer, setReplayer] = useState<rrwebPlayer | undefined>(undefined);

  const events = useMemo(() => {
    return session.replayEvents.reduce((acc, event) => {
      for (const e of event.data as any[]) {
        acc.push(e);
      }
      return acc;
    }, [] as any[]);
  }, []);

  useEffect(() => {
    console.log("events", events);
  }, [events]);

  useEffect(() => {
    console.log("replayEvents", session);
  }, [session]);

  useEffect(() => {
    if (playerRef.current) {
      // Cleanup previous player's DOM nodes if needed.
      playerRef.current.innerHTML = "";
      if (replayer && typeof replayer.getReplayer().destroy === "function") {
        replayer.getReplayer().destroy();
      }
    }
    if (playerRef.current && events.length > 0) {
      const newReplayer = new rrwebPlayer({
        target: playerRef.current,
        props: {
          events,
          showController: true,
          skipInactive: false,
          // Consider setting useVirtualDom: false to avoid conflicts
          useVirtualDom: true,
          width: playerRef.current.clientWidth,
          height: playerRef.current.clientHeight - 80,
        },
      });
      setReplayer(newReplayer);
    }
  }, [events, playerRef.current?.clientWidth]);
  return (
    <div className="w-full  text-black">
      {/* <span>
        {session.id} count: {session.replayEvents.length}
      </span> */}
      <div
        ref={playerRef}
        className="relative aspect-video rounded-3xl"
      />
    </div>
  );
};
