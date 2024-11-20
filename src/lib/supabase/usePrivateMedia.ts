"use client";

import { useState, useEffect } from "react";
import Database from "./database";

export const usePrivateMedia = (
  db: Database,
  data: { id: string; bucket_name: string; path: string }[],
  callback?: (assetBlobs: Map<string, string>) => void
) => {
  const [assetBlobs, setAssetBlobs] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchBlobs = async () => {
      const assetUrls = new Map<string, string>();

      const promises = data.map(async (media) => {
        const blob = await db.get.media.file({
          bucketName: media.bucket_name!,
          path: media.path!,
        });
        if (blob) {
          assetUrls.set(media.id, URL.createObjectURL(blob));
        }
      });

      await Promise.all(promises);
      setAssetBlobs(assetUrls);
      if (callback) {
        callback(assetUrls);
      }
    };

    fetchBlobs();
  }, [data]); // Include dependencies

  return assetBlobs;
};
