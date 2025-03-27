import { useEffect, useState, useRef } from "react";

import { useDatabase } from "@/lib/supabase/context";
import pLimit from "p-limit";
import PQueue from "p-queue";

import { getCachedFilenames } from "@/lib/utils/ipc";
import { fetchTemplates, cacheMedia } from "./utils";

import { queueScheduledMedia } from "./queueScheduledMedia";
import { queueScheduledMediaGroups } from "./queueScheduledMediaGroups";
import { queueCachingPromises } from "./queueCaching";

export const useSyncData = () => {
  const queue = useRef(
    new PQueue({ concurrency: 10, autoStart: true })
  ).current;
  const limit = useRef(pLimit(10)).current;

  const { db, supabase, session } = useDatabase();
  const [initSyncDone, setInitSyncDone] = useState(false);

  // useEffect(() => {
  //   if (!session) return;

  //   // Check if session has an expires_at property (in seconds)
  //   const expiryTime = session.expires_at;
  //   if (!expiryTime) return;

  //   // If the token is set to expire in less than 5 minutes, refresh it
  //   const now = Math.floor(Date.now() / 1000);
  //   if (expiryTime - now < 300) {
  //     console.log("Session is about to expire, refreshing...");
  //     supabase.auth.refreshSession().then(({ data, error }) => {
  //       if (error) {
  //         console.error("Failed to refresh session", error);
  //       } else {
  //         console.log("Session refreshed", data);
  //         // You may want to update your session state here as needed.
  //       }
  //     });
  //   }
  // }, [session, supabase]);

  // initial syncing effect, make sure critical media is cached before starting app
  useEffect(() => {
    if (!db || initSyncDone) return;

    const syncTemplates = async () => {
      const [templates, filenames] = await Promise.all([
        fetchTemplates(db),
        getCachedFilenames(),
      ]);

      const unsycedTemplates = templates.filter(
        ({ id }) => !filenames.includes(id)
      );

      const syncTemplatesPromises = unsycedTemplates.map(
        (template) => async () => await cacheMedia(db, template)
      );

      await Promise.all(syncTemplatesPromises.map((promise) => limit(promise)));
      setInitSyncDone(true);
    };

    syncTemplates();
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
