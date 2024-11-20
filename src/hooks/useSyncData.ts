import { useEffect, useState } from "react";

import Database, { DbTables } from "@/lib/supabase/database";
import { useDatabase } from "@/lib/supabase/context";
import { blobToUint8Array } from "@/utils/convert";
import pLimit from "p-limit";
import PQueue from "p-queue";

import {
  readFile,
  getCachedFilenames,
  removeFromCache,
  cacheFile,
} from "@/utils/ipc";

const queue = new PQueue({ concurrency: 10, autoStart: true });
const limit = pLimit(10);

export const useSyncData = () => {
  const db = useDatabase();
  const [initSyncDone, setInitSyncDone] = useState(false);

  const [unnecessaryFiles, setUnnecessaryFiles] = useState<Set<string>>(
    new Set<string>()
  );

  useEffect(() => {
    if (!db || initSyncDone) return;

    const syncTemplates = async () => {
      const templates = await fetchTemplates(db);
      const filenames = await getCachedFilenames();

      const unsycedTemplates = templates.filter(
        ({ id }) => !filenames.includes(id)
      );
      const syncPromises = unsycedTemplates.map(
        (template) => () => cacheMedia(db, template)
      );
      await Promise.all(syncPromises.map((promise) => limit(promise)));

      // have an effect track if all init promises have been fulfilled when using the queue
      setInitSyncDone(true);
    };

    syncTemplates();
  }, [db]);

  useEffect(() => {
    if (!initSyncDone) return;

    const interval = setInterval(() => {
      if (!db) return;

      try {
        Promise.all([
          queueUploadPromises(),
          queueCachingPromises(),
          queueUploadGroupsPromises(),
        ]);
      } catch (err) {
        console.log("error while syncing", err);
      }

      console.log("Running effect every minute");
    }, 10000); // Run every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
    // todo: switch to subscriptions asap
  }, [initSyncDone]);

  const queueUploadGroupsPromises = async () => {
    const scheduldedUploadsGroups = await fetchScheduledUploadGroups(db);
    // console.log("scheduledUploadsGroups", scheduldedUploadsGroups);

    scheduldedUploadsGroups.forEach((group) => {
      const hasPendingUploads =
        group.uploads.some(({ uploaded_at }) => !uploaded_at) ||
        group.uploads.length < 1 ||
        group.in_progress;

      // console.log("hasPendingUploads", hasPendingUploads);
      if (hasPendingUploads) return;

      const promise = async () => {
        try {
          await db.update.scheduledUploadsGroup(group.id, {
            in_progress: true,
          });
          const { psd, thumbnail } = filterGroupUploads(group.uploads);

          await db.insert.itemMediaAssets({
            psd_id: psd.id,
            thumbnail_id: thumbnail.id,
            created_by: group.user_id!,
            item_id: group.item_id!,
          });

          await db.update.task(group.task_id!, {
            updated_at: new Date().toISOString(),
            status: "complete",
          });

          await db.update.scheduledUploadsGroup(group.id, {
            uploaded_at: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Error uploading group", group.id, error);
          // todo: rollback
        } finally {
          await db.update.scheduledUploadsGroup(group.id, {
            in_progress: false,
          });
        }
      };

      queue.add(promise, { priority: 2 });
    });
  };

  const queueUploadPromises = async () => {
    const scheduledUploads = await fetchScheduledMedia(db);

    scheduledUploads
      .filter(({ uploading }) => !uploading) // skip those already in progress
      .forEach((upload) => {
        const promise = async () => {
          try {
            const content = await readFile(upload.id, "blob");
            await db.update.scheduledUpload(upload.id, {
              in_progress: true,
            });

            console.log("inserting into storage: ", upload);
            await db.insert.media(content, {
              id: upload.id,
              bucket_name: upload.bucket_name!,
              path: upload.path!,
            });

            console.log("marking schedulded upload as done", upload.id);
            await db.update.scheduledUpload(upload.id, {
              uploaded_at: new Date().toISOString(),
            });
          } catch (error) {
            console.error("Error uploading group", upload.id, error);
          } finally {
            await db.update.scheduledUpload(upload.id, {
              in_progress: true,
            });
          }
        };
        queue.add(promise, { priority: 1 });
      });

    // console.log("queuing upload promises...");
  };

  useEffect(() => {
    // console.log("unnecessaryFiles", unnecessaryFiles);
  }, [unnecessaryFiles]);

  const queueCachingPromises = async () => {
    // console.log("queing caching promises...");

    const necessaryMedia = await fetchNecessaryMedia(db);
    const cachedFilenames = await getCachedFilenames();

    // sync unsynced media tasks
    necessaryMedia
      .filter(({ id }) => !cachedFilenames.includes(id))
      .forEach((media) => {
        const promise = async () => await cacheMedia(db, media);
        queue.add(promise, { priority: 2 });
      });
    // console.log("unecessaryFiles loop", unnecessaryFiles);
    // remove files previously marked as unecessary
    unnecessaryFiles.forEach((filename) => {
      console.log("filename to be removed", filename);
      const promise = async () => await removeFromCache(filename);
      queue.add(promise, { priority: 3 });
    });

    // mark files as unecessary by adding them to the set
    const necessaryMediaIdsSet = new Set(necessaryMedia.map(({ id }) => id));
    const newUnnecessaryFiles = new Set<string>();
    cachedFilenames
      .filter((filename) => !necessaryMediaIdsSet.has(filename))
      .forEach((filename) => newUnnecessaryFiles.add(filename));
    // console.log("newUnnecessaryFiles", newUnnecessaryFiles);
    setUnnecessaryFiles(newUnnecessaryFiles);
  };

  return initSyncDone;
};

const fetchScheduledMedia = async (db: Database) => {
  const { data, error } = await db.get.media.data({
    where: { isScheduled: true },
  });
  // console.log("scheduledUploads", data);

  if (error) {
    console.log("error", error.message);
    throw Error(`Error fetching order item media ${error.message}`);
  }

  return data;
};

const fetchScheduledUploadGroups = async (db: Database) => {
  const { data, error } = await db.get.scheduledUploadGroups.pending();
  // console.log("scheduledUploads", data);

  if (error) {
    console.log("error", error.message);
    throw Error(`Error fetching order item media ${error.message}`);
  }

  return data;
};

const fetchNecessaryMedia = async (db: Database) => {
  const [scheduledMedia, templates, orders] = await Promise.all([
    fetchScheduledMedia(db),
    fetchTemplates(db),
    fetchOrderItems(db),
  ]);

  let allMedia: DbTables["media"]["Row"][] = scheduledMedia;

  for (const order of orders) {
    for (const item of order.items) {
      if (item.configuration) {
        const { bg_media, main_media } = item.configuration;
        if (bg_media) allMedia.push(bg_media);
        if (main_media) allMedia.push(main_media);
      }
      for (const asset of item.assets) {
        allMedia.push(asset.thumbnail!);
        allMedia.push(asset.psd!);
      }
    }
  }

  return [...templates, ...allMedia];
};

const fetchOrderItems = async (db: Database) => {
  const { data, error } = await db.get.orderItems.all();
  if (!data || error) {
    console.log("error", error.message);
    throw Error(`Error fetching order item media ${error.message}`);
  }
  return data;
};

const fetchTemplates = async (db: Database) => {
  const { data, error } = await db.get.sizeTemplates.all();
  if (!data || error) {
    console.log("error", error.message);
    throw Error(`error getting size templates ${error.message}`);
  }
  return data.map(({ template: t }) => t!).filter((t) => t !== null);
};

const fetchPrivateMedia = async (
  db: Database,
  media: { bucket_name: string; path: string }
) => {
  const result = await db.get.media.file({
    bucketName: media.bucket_name!,
    path: media.path!,
  });

  if (!result) {
    const msg = `No private media found at ${media.bucket_name}, ${media.path}`;
    throw Error(msg);
  }
  return result;
};

const cacheMedia = async (
  db: Database,
  media: { bucket_name: string; path: string; id: string }
) => {
  const blob = await fetchPrivateMedia(db, { ...media });
  cacheFile({
    content: await blobToUint8Array(blob),
    filename: media.id,
  });
};

type Assets = Record<"psd" | "thumbnail", DbTables["scheduled_uploads"]["Row"]>;

const filterGroupUploads = (
  uploads: DbTables["scheduled_uploads"]["Row"][]
) => {
  let assets: Assets = { psd: null!, thumbnail: null! };

  uploads.forEach((upload) => {
    const ext = upload.path?.split(".")[1] === "psd" ? "psd" : "thumbnail";
    assets[ext] = upload;
  });

  return assets;
};
