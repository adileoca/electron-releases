import Database, { DbTables } from "@/lib/supabase/database";
import { blobToUint8Array } from "@/lib/utils/convert";
import { cacheFile } from "@/lib/utils/ipc";

type Media = DbTables["media"]["Row"];

export const fetchScheduledUploadGroups = async (db: Database) => {
  const { data, error } = await db.get.scheduledUploadGroups.pending();
  if (error) {
    const msg = `Error fetching scheduled uploads groups ${error.message}`;
    console.log(msg);
    throw Error(msg);
  }
  return data;
};

export const fetchTemplates = async (db: Database) => {
  const { data, error } = await db.get.sizeTemplates.all();
  if (!data || error) {
    const msg = `error getting size templates ${error.message}`;
    console.error(msg);
    throw Error(msg);
  }
  return data.map(({ template: t }) => t!).filter((t) => t !== null);
};

export const cacheMedia = async (db: Database, media: Media) => {
  const blob = await fetchMedia(db, media);
  cacheFile({
    content: await blobToUint8Array(blob),
    filename: media.id,
  });
};

const fetchMedia = async (db: Database, media: Media) => {
  const blob = await db.get.media.file({
    bucketName: media.bucket_name!,
    path: media.path!,
  });
  if (!blob) {
    const msg = `No private media found at ${media.bucket_name}, ${media.path}`;
    console.error(msg);
    throw Error(msg);
  }
  return blob;
};

export const fetchScheduledMedia = async (db: Database) => {
  // todo: also select current user
  const { data, error } = await db.get.media.data({
    where: { isScheduled: true },
  });
  if (error) {
    const msg = `Error fetching scheduled uploads ${error.message}`;
    console.log(msg);
    throw Error(msg);
  }
  return data;
};

export const fetchOrderItems = async (db: Database) => {
  const { data, error } = await db.get.orderItems.all();
  if (!data || error) {
    const msg = `Error fetching order item media", ${error.message}`;
    console.error(msg);
    throw Error(msg);
  }
  return data;
};
