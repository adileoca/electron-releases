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

  const { db, session } = useDatabase();
  const [initSyncDone, setInitSyncDone] = useState(false);

  // initial syncing effect
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

  // main syncing effect, runs every 10 seconds
  // todo: switch to using subscriptions instead of polling
  useEffect(() => {
    if (!initSyncDone || !session) return;

    const interval = setInterval(() => {
      if (!db) return;

      try {
        Promise.all([
          queueScheduledMedia(db, queue, session), // handles uploading scheduled media
          queueScheduledMediaGroups(db, queue), // handles triggering upload groups after media is uploaded
          queueCachingPromises(db, queue), // handles caching necessary media and removing unnecessary media
        ]);
      } catch (err) {
        console.log("error while syncing", err);
      }
    }, 10000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [initSyncDone]);

  return initSyncDone;
};
