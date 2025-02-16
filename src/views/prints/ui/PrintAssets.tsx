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

            {/* <button className=" items-center space-x-1 rounded-md border-4 border-solid border-transparent bg-white/20  px-2.5 py-1 text-sm font-semibold text-white/90 shadow-sm transition [border-image:linear-gradient(to_top_right,#f6b73c,#4d9f0c)_30] hover:bg-neutral-50 hover:bg-white/30">
              Marcheazǎ ca defect
            </button> */}
            <div className="flex items-center justify-center">
              <div className="w-full rounded-md bg-gradient-to-t from-neutral-500 from-80% to-neutral-400 p-[1px]">
                <button className="h-full w-full rounded-[5px] bg-neutral-600 px-2 py-[3px] text-sm font-medium text-white/90">
                  Marcheazǎ ca defect
                </button>
              </div>
            </div>
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
