import { fetchTemplates, cacheMedia } from "./utils";
import { getCachedFilenames } from "@/lib/utils/ipc";
import Database from "@/lib/supabase/database";
import { LimitFunction } from "p-limit";

export const syncTemplates = async (db: Database, limit: LimitFunction) => {
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
};
