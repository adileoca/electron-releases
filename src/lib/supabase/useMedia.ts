"use client";

import { useDatabase } from "./context";
import { useState, useEffect } from "react";

export type MediaInfo = {
  id: string;
  bucket_name: string;
  path: string;
  priority?: number;
};

export const useMedia = (
  data: MediaInfo[],
  options?: {
    cachedUrls?: Map<string, string>;
    alwaysFetch?: boolean;
    additionalDeps?: any[];
    fetchFunction?: (media: MediaInfo) => Promise<Blob>;
  }
) => {
  const { db } = useDatabase();
  const [assetUrls, setAssetUrls] = useState<Map<string, string>>(
    options?.cachedUrls || new Map()
  );

  useEffect(() => {
    const createUrls = async () => {
      const newAssetUrls = options?.alwaysFetch
        ? new Map<string, string>()
        : new Map<string, string>(assetUrls);

      // Check if any item has a priority field
      const hasPriority = data.some((media) => media.priority !== undefined);

      const fetchMedia = async (media: {
        id: string;
        bucket_name: string;
        path: string;
      }) => {
        if (options?.fetchFunction) {
          return options.fetchFunction(media);
        } else {
          return db.get.media.file({
            bucketName: media.bucket_name!,
            path: media.path!,
          });
        }
      };

      if (hasPriority) {
        // Sort data by priority (higher priority first)
        const sortedData = [...data].sort(
          (a, b) => (b.priority || 0) - (a.priority || 0)
        );

        for (const media of sortedData) {
          if (options?.alwaysFetch || !newAssetUrls.has(media.id)) {
            const blob = await fetchMedia(media);
            if (blob) {
              const url = URL.createObjectURL(blob);
              newAssetUrls.set(media.id, url);
              setAssetUrls(new Map(newAssetUrls)); // Update state after each fetch
            }
          }
        }
      } else {
        // Fetch all media files concurrently
        const promises = data.map(async (media) => {
          if (options?.alwaysFetch || !newAssetUrls.has(media.id)) {
            const blob = await fetchMedia(media);
            if (blob) {
              const url = URL.createObjectURL(blob);
              newAssetUrls.set(media.id, url);
            }
          }
        });

        await Promise.all(promises);
        setAssetUrls(newAssetUrls);
      }
    };

    createUrls();

    return () => {
      // Cleanup function to revoke object URLs
      assetUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [
    data,
    options?.alwaysFetch,
    options?.fetchFunction,
    ...(options?.additionalDeps || []),
  ]);

  return assetUrls;
};
