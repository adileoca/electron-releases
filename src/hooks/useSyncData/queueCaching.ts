import PQueue from "p-queue";
import Database, { DbTables } from "@/lib/supabase/database";
import { getCachedFilenames, removeFromCache } from "@/lib/utils/ipc";
import {
  fetchScheduledMedia,
  fetchOrderItems,
  fetchTemplates,
  cacheMedia,
} from "./utils";
type Media = DbTables["media"]["Row"];

const fetchNecessaryMedia = async (db: Database) => {
  const [scheduledMedia, templates, orders] = await Promise.all([
    fetchScheduledMedia(db),
    fetchTemplates(db),
    fetchOrderItems(db),
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
      }
    }
  }

  return [...templates, ...allMedia];
};

export const queueCachingPromises = async (db: Database, queue: PQueue) => {
  const [necessaryMedia, cachedFilenames] = await Promise.all([
    fetchNecessaryMedia(db),
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

  // remove files that are cached but not necessary
  // todo: move this to app startup (first useEffect)
  // const necessaryMediaIdsSet = new Set(necessaryMedia.map(({ id }) => id));
  // const cachedButUnecessaryMedia = cachedFilenames.filter(
  //   (filename) => !necessaryMediaIdsSet.has(filename)
  // );
  // cachedButUnecessaryMedia.forEach((filename) => {
  //   // todo: implement looking at date modified and waiting at least 5 mins before removing in removeFromCache
  //   const promise = async () => await removeFromCache(filename);
  //   queue.add(promise, { priority: 3 });
  // });
};
