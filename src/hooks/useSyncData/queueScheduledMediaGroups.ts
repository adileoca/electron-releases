import PQueue from "p-queue";

import Database, { DbTables } from "@/lib/supabase/database";
import { fetchScheduledUploadGroups } from "./utils";

const getPendingScheduledMediaGroups = async (db: Database) => {
  const scheduldedUploadsGroups = await fetchScheduledUploadGroups(db);
  console.log("scheduldedUploadsGroups", scheduldedUploadsGroups);
  const pendingUploadsGroups = scheduldedUploadsGroups.filter((group) => {
    return (
      !group.uploads.some(({ upload_end }) => !upload_end) && // make sure all uploads are complete
      group.uploads.length > 0 && // make sure there are uploads
      !group.in_progress // make sure the group is not in progress
    );
  });
  return pendingUploadsGroups;
};

type Media = DbTables["media"]["Row"];
type Assets = Record<"psd" | "thumbnail", Media>;
const filterScheduledMediaGroupUploads = (uploads: Media[]) => {
  let assets: Assets = { psd: null!, thumbnail: null! };
  uploads.forEach((upload) => {
    const ext = upload.path?.split(".")[1] === "psd" ? "psd" : "thumbnail";
    assets[ext] = upload;
  });
  return assets;
};

export const queueScheduledMediaGroups = async (
  db: Database,
  queue: PQueue
) => {
  const pendingUploadsGroups = await getPendingScheduledMediaGroups(db);
  console.log("pendingUploadsGroups", pendingUploadsGroups);

  pendingUploadsGroups.forEach((group) => {
    // todo: add error handling and logging
    const promise = async () => {
      try {
        await db.update.scheduledUploadsGroup(group.id, {
          in_progress: true,
        });

        const { psd, thumbnail } = filterScheduledMediaGroupUploads(
          group.uploads
        );

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
        console.log("Error uploading groups", group.id, error);
        // todo: implement rollback
      } finally {
        await db.update.scheduledUploadsGroup(group.id, {
          in_progress: false,
        });
      }
    };

    queue.add(promise, { priority: 2 });
  });
};
