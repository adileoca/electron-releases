import { useState, useRef, useEffect, useMemo } from "react";
import Input from "@/components/ui/Input";
import { useFetchSession } from "./hooks/useFetchSessions";
import { useDatabase } from "@/lib/supabase/context";
import { Session } from "./hooks/useFetchSessions";
import Button from "@/components/ui/Button";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css"; // Add this import
import { useEffectTrigger } from "../media/context/hooks/useEffectTrigger";

const Sessions = () => {
  const { supabase } = useDatabase();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [shouldFetch, triggerFetch] = useEffectTrigger();
  const session = useFetchSession(supabase, sessionId, shouldFetch);

  useEffect(() => {
    console.log("found session", session);
  }, [session]);

  return (
    <div className="p-4">
      <div className="space-y-2 pb-4">
        <h1 className="text-white">Session id</h1>

        <Input
          className="h-7 w-full rounded-lg"
          onChange={(e) => setSessionId(e.target.value.trim())}
        />
        <div>
          <Button onClick={() => triggerFetch()}>Cauta </Button>
        </div>
        <div>
          {session &&
            session.fbclid.map(({ fbclid }) => (
              <div className="text-white">
                Session fbclid: <strong>{fbclid}</strong>
              </div>
            ))}
          {session &&
            session.gclid.map(({ gclid }) => (
              <div className="text-white">
                Session gclid: <strong>{gclid}</strong>
              </div>
            ))}
        </div>
      </div>
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
          // skipInactive: false,
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
      <div ref={playerRef} className="relative aspect-video rounded-3xl" />
    </div>
  );
};
