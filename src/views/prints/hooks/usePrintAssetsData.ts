import { useMemo, useCallback } from "react";

import { MediaInfo, useMedia } from "@/lib/supabase/useMedia";
import { useFetchData } from "@/hooks/useFetchData";
import { useDatabase } from "@/lib/supabase/context";
import { Print } from "@/lib/supabase/database";

export const useAssetsData = (print: Print) => {
  const { db, mediaManager } = useDatabase();

  const itemAssets = useFetchData(
    db.getItemAssets({
      ids: print.assets.map((asset) => asset.item_asset_id),
    })
  );

  const assetsData = useMemo(() => {
    const printsMedia = print.versions.reduce(
      (acc: MediaInfo[], { thumbnail }) => {
        thumbnail
          ? acc.push({
              id: thumbnail.id,
              bucket_name: thumbnail.bucket_name,
              path: thumbnail.path,
            })
          : null;
        return acc;
      },
      []
    );

    if (itemAssets) {
      const assetsMedia = itemAssets.reduce((acc: MediaInfo[], asset) => {
        acc.push({
          id: asset.thumbnail_id,
          bucket_name: asset.thumbnail?.bucket_name!,
          path: asset.thumbnail?.path!,
        });
        return acc;
      }, []);

      return [...printsMedia, ...assetsMedia];
    } else {
      return printsMedia;
    }
  }, [print, itemAssets]);

  const mediaUrls = useMedia(assetsData, {
    // alwaysFetch: true,
    fetchFunction: useCallback(async (media: MediaInfo) => {
      return mediaManager.get(media, { as: "blob" }) as Promise<Blob>;
    }, []),
  });

  return { mediaUrls, itemAssets };
};
