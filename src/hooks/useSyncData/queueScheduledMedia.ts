import PQueue from "p-queue";

import Database from "@/lib/supabase/database";
import { fetchScheduledMedia } from "./utils";
import { readFile } from "@/utils/ipc";

export const queueScheduledMedia = async (db: Database, queue: PQueue) => {
  const scheduledMedia = await fetchScheduledMedia(db);
  const pendingScheduledMedia = scheduledMedia.filter(
    ({ uploading }) => !uploading
  );

  pendingScheduledMedia.forEach((media) => {
    // todo: add error handling and logging
    const promise = async () => {
      try {
        const file = await readFile(media.id, "blob");
        await db.uploadScheduledMedia({ media, file });
      } catch (error) {
        console.error("Error uploading media", media.id, error);
      }
    };

    queue.add(promise, { priority: 1 });
  });
};
