import { useEffect, useState, useRef } from "react";
import pLimit from "p-limit";
import PQueue from "p-queue";

import { queueScheduledMediaGroups } from "./queueScheduledMediaGroups";
import { queueScheduledMedia } from "./queueScheduledMedia";
import { useDatabase } from "@/lib/supabase/context";
import { syncTemplates } from "./syncTemplates";
import {
  queueCachingCleanupPromises,
  queueCachingPromises,
} from "./queueCaching";

export const useSyncData = () => {
  const queue = useRef(
    new PQueue({ concurrency: 10, autoStart: true })
  ).current;
  const limit = useRef(pLimit(10)).current;

  const { db, supabase, session } = useDatabase();
  const [initSyncDone, setInitSyncDone] = useState(false);

  useEffect(() => {
    if (!db || initSyncDone) return;

    const initialSync = async () => {
      await syncTemplates(db, limit);
      await queueCachingCleanupPromises(db, supabase, limit);
      setInitSyncDone(true);
    };

    initialSync();
  }, [db]);

  // main syncing effect, runs every 10 seconds, caches whatever media might be necessary
  // todo: switch to using subscriptions instead of polling
  useEffect(() => {
    if (!initSyncDone || !session) return;

    const interval = setInterval(() => {
      if (!db) return;

      try {
        Promise.all([
          queueScheduledMedia(db, queue, session, supabase), // handles uploading scheduled media
          queueScheduledMediaGroups(db, queue), // handles triggering upload groups after media is uploaded
          queueCachingPromises(db, supabase, queue), // handles caching necessary media and removing unnecessary media
        ]);
      } catch (err) {
        console.log("error while syncing", err);
      }
    }, 10000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [initSyncDone]);

  return initSyncDone;
};
