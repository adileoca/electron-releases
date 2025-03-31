import { formatDate, formatSize } from "@/lib/utils/format";
import MiniTable from "@/components/ui/MiniTable";
import { Print } from "@/lib/supabase/database";
import Button from "@/components/ui/Button";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import { useState } from "react";

const PrintAssets: React.FC<{
  mediaUrls: Map<string, string>;
  isPrinted: boolean;
  assets: NonNullable<Print["assets"]>;
}> = ({ assets, mediaUrls, isPrinted }) => {
  return (
    <>
      {assets.map(({ item_asset: asset, reprint: wasDefective }, index) => {
        if (!asset) return null;
        const [isDefective, setIsDefective] = useState(wasDefective);
        return (
          <div key={index} className="flex space-x-5 py-3">
            <div
              style={{ boxShadow: "0 0 0 0.3px black" }}
              className="relative aspect-square h-16 w-16 overflow-hidden rounded-lg border border-neutral-800 bg-white"
            >
              <img
                src={mediaUrls.get(asset.thumbnail_id)!}
                className="z-30 mx-auto aspect-square scale-100 object-contain"
                alt=""
              />
            </div>
            <div className="flex flex-grow flex-col">
              <div className="flex items-center justify-between">
                <h1 className="py-1 font-medium text-white/80">
                  {asset.item?.product?.name}
                </h1>
                {isDefective && (
                  <OrderStatusBadge
                    text="Defect, repus in lucru"
                    color="amber"
                  />
                )}
              </div>
              <div className=" w-full justify-between">
                <MiniTable
                  data={{
                    ID: asset.id,
                    Autor: asset.created_by?.name! || "",
                    Creeat: formatDate(asset.created_at, {
                      locale: "ro-RO",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      month: "short",
                    }),
                    Comandǎ: asset.item?.order?.display_name || "",
                    Dimensiune: formatSize(asset.item?.configuration?.size!),
                    // "Dimensiuni": `${asset.width_cm} x ${asset.height_cm} cm`,
                  }}
                />
              </div>{" "}
              <div className="flex w-full items-center justify-end pb-4 pt-2">
                {isPrinted && (
                  <div>
                    {!isDefective && (
                      <Button
                        onClick={() => {
                          setIsDefective(true);
                        }}
                      >
                        Marcheazǎ ca defect
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PrintAssets;
