import MiniTable from "@/components/ui/MiniTable";
import { ItemAssets } from "@/lib/supabase/database";

const PrintAssets: React.FC<{
  mediaUrls: Map<string, string>;
  assets: ItemAssets;
}> = ({ assets, mediaUrls }) => (
  <>
    {assets.map((asset, index) => (
      <div key={index} className="flex space-x-5 p-3">
        <div
          style={{ boxShadow: "0 0 0 0.3px black" }}
          className="relative aspect-square h-16 w-16 overflow-hidden rounded-lg border border-neutral-600 bg-neutral-200"
        >
          <img
            src={mediaUrls.get(asset.thumbnail_id)!}
            className="z-30 mx-auto scale-100"
            alt=""
          />
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <div className="flex w-full items-center justify-between">
            <h1 className="font-medium text-white/80">{asset.id}</h1>

            <button className="flex items-center space-x-1 rounded-md border border-white/10 bg-white/20 px-2.5 py-1 text-sm font-semibold text-white/90 shadow-sm transition hover:bg-neutral-50 hover:bg-white/30">
              Marcheazǎ ca defect
            </button>
          </div>
          <div className=" w-full justify-between">
            <MiniTable
              data={{
                ID: asset.id,
                Autor: asset.created_by?.name || "",
                Creeat: asset.created_at,
                Comandǎ: asset.item?.order_id || "",
                // "Dimensiuni": `${asset.width_cm} x ${asset.height_cm} cm`,
                // "Dimensiuni": `${asset.width_cm} x ${asset.height_cm} cm`,
              }}
            />
          </div>
        </div>
      </div>
    ))}
  </>
);

export default PrintAssets;
