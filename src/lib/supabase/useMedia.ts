"use client";

import { useDatabase } from "./context";
import { useState, useEffect, useMemo } from "react";
import { MediaUrlResult } from "./MediaManager";

export type MediaInfo = {
  id: string;
  bucket_name: string;
  path: string;
  priority?: number;
};

type FetchResult =
  | Blob
  | string
  | MediaUrlResult
  | {
      url: string;
      isObjectUrl?: boolean;
    }
  | null
  | undefined;

export const useMedia = (
  data: MediaInfo[],
  options?: {
    cachedUrls?: Map<string, string>;
    alwaysFetch?: boolean;
    additionalDeps?: any[];
    fetchFunction?: (media: MediaInfo) => Promise<FetchResult>;
  }
) => {
  const { db } = useDatabase();
  const [assetUrls, setAssetUrls] = useState<Map<string, MediaUrlResult>>(() => {
    if (!options?.cachedUrls) {
      return new Map();
    }

    const initial = new Map<string, MediaUrlResult>();
    options.cachedUrls.forEach((url, key) => {
      initial.set(key, { url, isObjectUrl: url.startsWith("blob:") });
    });
    return initial;
  });

  useEffect(() => {
    let isMounted = true;
    const objectUrlsToRevoke: string[] = [];

    const normalizeResult = (result: FetchResult): MediaUrlResult | null => {
      if (!result) return null;

      if (result instanceof Blob) {
        const url = URL.createObjectURL(result);
        objectUrlsToRevoke.push(url);
        return { url, isObjectUrl: true };
      }

      if (typeof result === "string") {
        const isObjectUrl = result.startsWith("blob:");
        if (isObjectUrl) {
          objectUrlsToRevoke.push(result);
        }
        return { url: result, isObjectUrl };
      }

      const url = "url" in result ? result.url : undefined;
      if (!url) return null;

      const isObjectUrl =
        "isObjectUrl" in result && typeof result.isObjectUrl === "boolean"
          ? result.isObjectUrl
          : url.startsWith("blob:");

      if (isObjectUrl && url.startsWith("blob:")) {
        objectUrlsToRevoke.push(url);
      }

      return { url, isObjectUrl };
    };

    const createUrls = async () => {
      const newAssetUrls = options?.alwaysFetch
        ? new Map<string, MediaUrlResult>()
        : new Map<string, MediaUrlResult>(assetUrls);

      // Check if any item has a priority field
      const hasPriority = data.some((media) => media.priority !== undefined);

      const fetchMedia = async (
        media: {
          id: string;
          bucket_name: string;
          path: string;
        }
      ) => {
        const result = options?.fetchFunction
          ? await options.fetchFunction(media)
          : await db.get.media.file({
              bucketName: media.bucket_name!,
              path: media.path!,
            });

        return normalizeResult(result);
      };

      if (hasPriority) {
        // Sort data by priority (higher priority first)
        const sortedData = [...data].sort(
          (a, b) => (b.priority || 0) - (a.priority || 0)
        );

        for (const media of sortedData) {
          if (options?.alwaysFetch || !newAssetUrls.has(media.id)) {
            const result = await fetchMedia(media);
            if (result) {
              newAssetUrls.set(media.id, result);
              if (isMounted) {
                setAssetUrls(new Map(newAssetUrls)); // Update state after each fetch
              }
            }
          }
        }
      } else {
        // Fetch all media files concurrently
        const promises = data.map(async (media) => {
          if (options?.alwaysFetch || !newAssetUrls.has(media.id)) {
            const result = await fetchMedia(media);
            if (result) {
              newAssetUrls.set(media.id, result);
            }
          }
        });

        await Promise.all(promises);
        if (isMounted) {
          setAssetUrls(newAssetUrls);
        }
      }
    };

    createUrls();

    return () => {
      isMounted = false;
      objectUrlsToRevoke.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [
    data,
    options?.alwaysFetch,
    options?.fetchFunction,
    ...(options?.additionalDeps || []),
  ]);

  return useMemo(() => {
    const map = new Map<string, string>();
    assetUrls.forEach(({ url }, key) => {
      map.set(key, url);
    });
    return map;
  }, [assetUrls]);
};
