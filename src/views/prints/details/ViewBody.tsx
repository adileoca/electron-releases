import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import MiniTable from "@/components/ui/MiniTable";
import Button from "@/components/ui/Button";
import { formatDate, formatSize } from "@/lib/utils/format";
import { configuratorOptions as options } from "@/constants";
import { useMedia, type MediaInfo } from "@/lib/supabase/useMedia";
import { useSupabase } from "@/lib/supabase/context";

import { Print } from "./types";

const ViewBody: React.FC<{ print: Print }> = ({ print }) => {
  const navigate = useNavigate();

  const assets = print.assets || [];
  const { supabase } = useSupabase();

  const assetThumbs = useMemo(() => {
    return assets
      .map(({ item_asset }) => item_asset?.thumbnail)
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
      .map<MediaInfo>((media) => ({
        id: media.id,
        bucket_name: media.bucket_name!,
        path: media.path!,
      }));
  }, [assets]);

  const assetUrls = useMedia(assetThumbs);

  const versionThumbs = useMemo(() => {
    return (print.versions || [])
      .map((v) => v.thumbnail)
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
      .map<MediaInfo>((media) => ({
        id: media.id,
        bucket_name: media.bucket_name!,
        path: media.path!,
      }));
  }, [print.versions]);

  const versionUrls = useMedia(versionThumbs);

  const versions = (print.versions || [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleVersions = useMemo(
    () => versions.slice(0, visibleCount),
    [versions, visibleCount]
  );

  return (
    <div className="mx-auto space-y-6">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-8">
          {/* Versions on the left */}
          <div className="col-span-2">
            <h2 className="mb-2 font-medium text-white/80">Versiuni</h2>
            <div className="divide-y divide-white/10">
              {(print.versions || []).length === 0 ? (
                <div className="py-3 text-white/60">Nicio versiune</div>
              ) : (
                visibleVersions.map((ver, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-3">
                    <div className="relative aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-neutral-200">
                      <img
                        src={versionUrls.get(ver.thumbnail_id!) || ""}
                        className="z-10 mx-auto aspect-square object-contain"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex justify-between">
                        <span className="truncate font-medium text-white/80">
                          {ver.name || `Versiune ${ver.id}`}
                        </span>
                        <span>
                          <Button
                            onClick={() =>
                              window.electron.invoke("download-file", {
                                filename: ver.file_id,
                                suggestedName: `${
                                  ver.name || `versiune-${ver.id}`
                                }.psd`,
                              })
                            }
                          >
                            Descarcǎ
                          </Button>
                        </span>
                      </div>
                      <MiniTable
                        data={{
                          "Creat la": formatDate(ver.created_at, {
                            locale: "ro-RO",
                            year: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric",
                          }),
                          Autor: ver.created_by?.name || "-",
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
            {versions.length > visibleCount && (
              <div className="flex justify-center pt-3">
                <Button onClick={() => setVisibleCount(versions.length)}>
                  Afișează restul ({versions.length - visibleCount})
                </Button>
              </div>
            )}
          </div>
          {/* Summary on the right with vertical divider */}
          <div className="col-span-1 space-y-4  pl-2">
            <MiniTable
              title="Sumar"
              data={{
                ID: print.id,
                "Creat la": print.created_at
                  ? formatDate(print.created_at, {
                      locale: "ro-RO",
                      year: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : "-",
                Status: print.printed ? "Printat" : "Neprintat",
                Blocat: print.locked ? "Da" : "Nu",
                "Blocat de": (print as any)?.locked_by?.name || "-",
                "Număr articole": String(assets.length),
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white/80">
            Decaluri ({assets.length})
          </h2>
        </div>
        <div className="divide-y divide-white/10">
          {assets.map(({ item_asset, reprint }, idx) => {
            if (!item_asset) return null;
            const order = item_asset.item?.order;
            const product = item_asset.item?.product;
            const size = item_asset.item?.configuration?.size;
            const cfg = item_asset.item?.configuration;
            const orientation = cfg?.orientation
              ? options.orientation.find(
                  (o) => o.id === Number(cfg.orientation)
                )?.label
              : undefined;
            const bg = cfg?.remove_bg
              ? options.removeBackground.find(
                  (o) => o.id === Number(cfg.remove_bg)
                )?.label
              : undefined;
            const preview = cfg?.wants_preview
              ? options.wantsPreview.find(
                  (o) => o.id === Number(cfg.wants_preview)
                )?.label
              : undefined;

            return (
              <div key={idx} className="flex gap-5 py-4">
                <div className="relative aspect-square h-36 w-36 flex-shrink-0 overflow-hidden rounded-md bg-neutral-200">
                  <img
                    src={assetUrls.get(item_asset.thumbnail_id!) || ""}
                    className="z-30 mx-auto aspect-square object-contain"
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex justify-between">
                    <span className="truncate font-medium text-white/80">
                      {product?.name || "-"}
                    </span>
                    <span>
                      <button
                        onClick={() => navigate(`/orders/${order?.id}`)}
                        className="text-blue-400 underline-offset-2 hover:underline"
                      >
                        #{order?.display_name || order?.id}
                      </button>
                    </span>
                  </div>
                  <MiniTable
                    data={{
                      Dimensiune: size ? formatSize(size) : "-",
                      Autor: item_asset.created_by?.name || "-",
                      Orientare: orientation || "-",
                      Fundal: bg || "-",
                      Previzualizare: preview || "-",
                      Reprint: reprint ? "Da" : "Nu",

                      Acțiuni: (
                        <div className="flex justify-end">
                          <div>
                            <Button
                              onClick={async () => {
                                try {
                                  await supabase
                                    .from("print_item_assets")
                                    .update({ reprint: !reprint })
                                    .eq("print_id", print.id)
                                    .eq("item_asset_id", item_asset.id);
                                  window.location.reload();
                                } catch (e) {
                                  console.error("Failed to toggle reprint", e);
                                }
                              }}
                            >
                              {reprint
                                ? "Anulează reprint"
                                : "Marchează reprint"}
                            </Button>
                          </div>
                        </div>
                      ),
                    }}
                  />
                </div>
              </div>
            );
          })}
          {assets.length === 0 ? (
            <div className="rounded-lg border border-white/10 p-6 text-center text-white/60">
              Niciun articol asociat cu acest print încă.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewBody;
