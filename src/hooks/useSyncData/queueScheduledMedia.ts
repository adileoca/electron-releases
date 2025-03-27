import PQueue from "p-queue";
import Database, { Supabase } from "@/lib/supabase/database";
import { fetchScheduledMedia } from "./utils";
import { Session } from "@supabase/supabase-js";

export const queueScheduledMedia = async (
  db: Database,
  queue: PQueue,
  session: Session,
  supabase: Supabase
) => {
  const scheduledMedia = await fetchScheduledMedia(db);

  const pendingScheduledMedia = scheduledMedia.filter(
    ({ uploading, upload_start, upload_end }) => {
      if (!uploading) {
        return true;
      }
      if (upload_start && !upload_end) {
        const uploadStartTime = new Date(upload_start).getTime();
        return Date.now() - uploadStartTime > 30 * 60 * 1000; // 30 minutes
      }
      return false;
    }
  );

  pendingScheduledMedia.forEach((media) => {
    const promise = async () => {
      console.log("handling promise for media", media.id);
      try {
        await db.update.mediaData(media.id, {
          upload_start: new Date().toISOString(),
          uploading: true,
        });

        // Get a fresh session right before upload
        const { data: sessionData } = await supabase.auth.getSession();
        const currentToken = sessionData.session?.access_token;

        if (!currentToken) {
          throw new Error("No valid access token available");
        }

        const { error } = await window.electron.uploadFile({
          accessToken: currentToken, // Use the fresh token
          bucketPath: media.path,
          filename: media.id,
        });

        if (error) {
          // If token expired, try to refresh and retry once
          if (error.includes("expired") || error.includes("invalid token")) {
            console.log("Token expired, refreshing and retrying...");
            const { data } = await supabase.auth.refreshSession();

            if (data.session) {
              const { error: retryError } = await window.electron.uploadFile({
                accessToken: data.session.access_token,
                bucketPath: media.path,
                filename: media.id,
              });

              if (retryError) {
                throw new Error(`Retry failed: ${retryError}`);
              }
            } else {
              throw new Error("Failed to refresh token");
            }
          } else {
            throw new Error(`Failed to upload media with id ${media.id}: ${error}`);
          }
        }

        await db.update.mediaData(media.id, {
          upload_end: new Date().toISOString(),
          uploading: false,
          scheduled: false,
        });
      } catch (error) {
        console.error("Error uploading media", media.id, error);
        await db.update.mediaData(media.id, {
          uploading: false,
          upload_start: null,
          error: (error as Error).message,
        });
      }
    };

    console.log("queueing media", media.id);
    queue.add(promise, { priority: 1 });
  });
};
