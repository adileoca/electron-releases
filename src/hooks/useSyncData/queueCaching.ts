import PQueue from "p-queue";
import Database, { DbTables, Supabase } from "@/lib/supabase/database";
import { getCachedFilenames } from "@/lib/utils/ipc";
import { fetchScheduledMedia, fetchTemplates, cacheMedia } from "./utils";
import { getAllUndeliveredOrders } from "@/lib/supabase/queries";
import { removeFromCache } from "@/lib/utils/ipc";
import { LimitFunction } from "p-limit";

type Media = DbTables["media"]["Row"];

const fetchNecessaryMedia = async (db: Database, supabase: Supabase) => {
  // todo: also fetch prints
  const [scheduledMedia, templates, orders] = await Promise.all([
    fetchScheduledMedia(db),
    fetchTemplates(db),
    getAllUndeliveredOrders(supabase),
  ]);

  let allMedia: Media[] = scheduledMedia;

  for (const order of orders) {
    for (const item of order.items) {
      // fetch media from configuration
      if (item.configuration) {
        const { bg_media, main_media } = item.configuration;
        if (bg_media) allMedia.push(bg_media);
        if (main_media) allMedia.push(main_media);
      }
      // fetch media from assets
      for (const asset of item.assets) {
        allMedia.push(asset.thumbnail!);
        allMedia.push(asset.psd!);
        for (const attachment of asset.attachments) {
          allMedia.push(attachment.media!);
        }
      }
    }
  }

  return [...templates, ...allMedia];
};

export const queueCachingPromises = async (
  db: Database,
  supabase: Supabase,
  queue: PQueue
) => {
  const [necessaryMedia, cachedFilenames] = await Promise.all([
    fetchNecessaryMedia(db, supabase),
    getCachedFilenames(),
  ]);

  // cache files that are necessary but not cached
  const uncachedButNecessaryMedia = necessaryMedia.filter(
    ({ id }) => !cachedFilenames.includes(id)
  );

  uncachedButNecessaryMedia.forEach((media) => {
    const promise = async () => await cacheMedia(db, media);
    queue.add(promise, { priority: 2 });
  });
};

export const queueCachingCleanupPromises = async (
  db: Database,
  supabase: Supabase,
  limit: LimitFunction
) => {
  const [necessaryMedia, cachedFilenames] = await Promise.all([
    fetchNecessaryMedia(db, supabase),
    getCachedFilenames(),
  ]);

  const necessaryMediaIdsSet = new Set(necessaryMedia.map(({ id }) => id));

  const cachedButUnecessaryMedia = cachedFilenames.filter(
    (filename) => !necessaryMediaIdsSet.has(filename)
  );

  const promises = cachedButUnecessaryMedia.map(
    (filename) => async () => await removeFromCache(filename)
  );

  await Promise.all(promises.map((promise) => limit(promise)));
};
