import { useMemo } from "react";

import { MediaInfo, useMedia } from "@/lib/supabase/useMedia";
import { useDatabase } from "@/lib/supabase/context";
import { Print } from "@/lib/supabase/database";

export const useAssetsData = (print: Print) => {
  const { mediaManager } = useDatabase();

  // const itemAssets = useFetchData(
  //   db.getItemAssets({
  //     ids: print.assets.map((asset) => asset.item_asset_id),
  //   })
  // );

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

    if (print.assets) {
      const assetsMedia = print.assets.reduce(
        (acc: MediaInfo[], { item_asset: asset }) => {
          acc.push({
            id: asset?.thumbnail_id!,
            bucket_name: asset?.thumbnail?.bucket_name!,
            path: asset?.thumbnail?.path!,
          });
          return acc;
        },
        []
      );

      return [...printsMedia, ...assetsMedia];
    } else {
      return printsMedia;
    }
  }, [print]);

  const mediaOptions = useMemo(
    () => ({
      fetchFunction: async (media: MediaInfo) => mediaManager.getUrl(media),
      additionalDeps: [mediaManager],
    }),
    [mediaManager]
  );

  const mediaUrls = useMedia(assetsData, mediaOptions);

  return { mediaUrls };
};
