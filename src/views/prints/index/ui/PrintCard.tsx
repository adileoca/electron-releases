import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import { useDatabase } from "@/lib/supabase/context";
import { Print } from "@/lib/supabase/database";
import { formatDate } from "@/lib/utils/format";
import MiniTable from "@/components/ui/MiniTable";
import { QueryCache, createCacheKey } from "@/lib/cache/QueryCache";
import { MediaUrlResult } from "@/lib/supabase/MediaManager";
import { logDebug, logError } from "@/lib/logging";

const thumbnailUrlCache = new QueryCache(Number.POSITIVE_INFINITY);

const PrintCard: React.FC<{
  print: Print;
}> = ({ print }) => {
  const { mediaManager } = useDatabase();
  const versionsSorted = [...(print.versions || [])].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const latestVersion = versionsSorted[0];
  const [src, setSrc] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!latestVersion?.thumbnail_id) {
      setSrc(null);
      return;
    }

    const cacheKey = createCacheKey("print-thumbnail", {
      id: latestVersion.thumbnail_id,
      bucket: latestVersion.thumbnail?.bucket_name,
      path: latestVersion.thumbnail?.path,
    });

    const cached = thumbnailUrlCache.get<MediaUrlResult>(cacheKey);
    if (cached?.data) {
      setSrc(cached.data.url);
      logDebug("print-thumb-cache-hit", {
        printId: print.id,
        thumbnailId: latestVersion.thumbnail_id,
      });
      return;
    }

    let cancelled = false;

    thumbnailUrlCache
      .fetch(cacheKey, async () => {
        logDebug("print-thumb-fetch-start", {
          printId: print.id,
          thumbnailId: latestVersion.thumbnail_id,
        });

        const result = await mediaManager.getUrl(
          {
            id: latestVersion.thumbnail_id!,
            bucket_name: latestVersion.thumbnail?.bucket_name!,
            path: latestVersion.thumbnail?.path!,
          },
          { expiresIn: 60 * 60 }
        );

        if (!result) {
          logError("print-thumb-fetch-missing", {
            printId: print.id,
            thumbnailId: latestVersion.thumbnail_id,
          });
          throw new Error("Failed to load print thumbnail");
        }

        logDebug("print-thumb-fetch-success", {
          printId: print.id,
          thumbnailId: latestVersion.thumbnail_id,
        });

        return result;
      })
      .then((result) => {
        if (!cancelled && result) {
          setSrc(result.url);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setSrc(null);
        }
        thumbnailUrlCache.invalidate(cacheKey);
        logError("print-thumb-fetch-error", {
          printId: print.id,
          thumbnailId: latestVersion.thumbnail_id,
          message: String(error),
        });
      });

    return () => {
      cancelled = true;
    };
  }, [
    latestVersion?.thumbnail_id,
    latestVersion?.thumbnail?.bucket_name,
    latestVersion?.thumbnail?.path,
    mediaManager,
    print.id,
  ]);

  return (
    <button
      onClick={() => navigate(`/prints/${print.id}`)}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-neutral-900"
    >
      <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-neutral-200">
        <img
          src={src ?? ""}
          className="z-30 mx-auto bg-neutral-800 object-contain"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden ">
        <div className="translate-y-full flex-col bg-neutral-800 p-3 pb-1.5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="relative flex w-full flex-1 items-center justify-between space-x-3 pb-3">
            <span className=" truncate font-medium text-neutral-900 transition dark:text-white/80">
              {latestVersion?.name ?? "-"}
            </span>
            <div>
              <OrderStatusBadge
                color={print.printed ? "green" : "amber"}
                text={print.printed ? "Printat" : "Neprintat"}
              />
            </div>
          </div>
          <div className="w-full truncate border-t border-white/10 text-left text-neutral-900 transition dark:text-white/80">
            <MiniTable
              data={{
                Actualizat: latestVersion
                  ? formatDate(latestVersion.created_at, {
                      locale: "ro-RO",
                      year: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : "-",
                Autor: latestVersion?.created_by?.name || "-",
                Articole: String(print.assets?.length || 0),
              }}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default PrintCard;

// const PrintBody: React.FC<{
//   print: Print;
//   // mediaUrls: Map<string, string>;
// }> = ({
//   print,
//   //  mediaUrls
// }) => {
//   const latestVersion = print.versions[0];
//   const firstVersion = print.versions.slice(-1)[0];

//   const printActivity = usePrintActivity(print);

//   const createdAtRelative = formatDate(firstVersion.created_at, {
//     relative: true,
//     locale: "ro-RO",
//   });

//   const createdAtAbsolute = formatDate(firstVersion.created_at, {
//     locale: "ro-RO",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     month: "numeric",
//   });

//   const updatedAtRelative = formatDate(latestVersion.created_at, {
//     relative: true,
//     locale: "ro-RO",
//   });

//   const updatedAtAbsolute = formatDate(latestVersion.created_at, {
//     locale: "ro-RO",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     month: "numeric",
//   });

//   return (
//     <TabPanels>
//       <TabPanel className="border-t border-white/10 pb-3"></TabPanel>
//       <TabPanel className="border-t border-white/10 pb-12">
//         <MiniTable
//           data={{
//             ID: print.id,
//             Autor: firstVersion.created_by!.name!,
//             Creeat: `${createdAtAbsolute} (${createdAtRelative})`,
//             "Ultima modificare": `${updatedAtAbsolute} (${updatedAtRelative})`,
//           }}
//         />
//       </TabPanel>
//       <TabPanel>
//         <div className="border-t border-white/10 pb-12">
//           <ActivityFeed activities={printActivity} />
//         </div>
//       </TabPanel>
//       <TabPanel className="divide-y divide-white/10 border-t border-white/10   pb-12">
//         {print.assets ? (
//           <PrintAssets
//             isPrinted={print.printed}
//             assets={print.assets}
//             mediaUrls={mediaUrls}
//           />
//         ) : (
//           <div>Loading assets...</div>
//         )}
//       </TabPanel>
//     </TabPanels>
//   );
// };

const PrintHeader: React.FC<{
  print: Print;
}> = ({ print }) => {
  const { mediaManager } = useDatabase();
  const latestVersion = print.versions.slice(-1)[0];
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!latestVersion?.thumbnail_id) {
      setSrc(null);
      return;
    }

    let isMounted = true;
    let objectUrlToRevoke: string | null = null;

    const fetchImage = async () => {
      const result = await mediaManager.getUrl(
        {
          id: latestVersion.thumbnail_id!,
          bucket_name: latestVersion.thumbnail?.bucket_name!,
          path: latestVersion.thumbnail?.path!,
        },
        { expiresIn: 60 * 60 }
      );

      if (!result) return;

      if (!isMounted) {
        if (result.isObjectUrl && result.url.startsWith("blob:")) {
          URL.revokeObjectURL(result.url);
        }
        return;
      }

      setSrc(result.url);
      if (result.isObjectUrl && result.url.startsWith("blob:")) {
        objectUrlToRevoke = result.url;
      }
    };
    fetchImage();

    return () => {
      isMounted = false;
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [
    latestVersion?.thumbnail_id,
    latestVersion?.thumbnail?.bucket_name,
    latestVersion?.thumbnail?.path,
    mediaManager,
  ]);

  return (
    <div className="group relative  flex flex-col">
      <div className="relative w-full">
        <img
          src={src ?? ""}
          className="z-30 mx-auto scale-100 bg-neutral-800 object-contain"
          alt=""
        />
      </div>
      <div className="absolute  bottom-0 left-0 right-0 flex flex-1 translate-y-full flex-col bg-gradient-to-t from-black/50 to-black/0 p-3 opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="relative flex flex-1 items-center  justify-between space-x-3">
          <span className=" truncate text-lg font-medium text-neutral-900 transition dark:text-white/80">
            {latestVersion?.name ?? "-"}
          </span>
          <div>
            <OrderStatusBadge
              color={print.printed ? "green" : "amber"}
              text={print.printed ? "Printat" : "Neprintat"}
            />
          </div>
        </div>

        <span className=" truncate text-lg font-medium text-neutral-900 transition dark:text-white/80">
          {latestVersion?.created_at ?? ""}
        </span>
      </div>
    </div>
  );
};

const ToolbarButton: React.FC<{ Icon: React.ReactNode; label: string }> = ({
  Icon,
  label,
}) => {
  return (
    <button className="flex items-center space-x-1 text-white/80 hover:text-white">
      {Icon}
      {/* <span className="font-medium">{label}</span> */}
    </button>
  );
};
