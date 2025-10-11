import { OrderDetailedType } from "@/lib/supabase/database";
import { formatDate } from "@/lib/utils/format";
import MiniTable from "../../../../components/ui/MiniTable";
import Button from "@/components/ui/Button";

const ItemAssets: React.FC<{
  assets: OrderDetailedType["items"][0]["assets"];
  assetUrls: Map<string, string>;
}> = ({ assets, assetUrls }) => (
  <div className=" divide-y divide-white/15">
    {assets
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .map((asset, index) => (
        <div key={index} className="flex space-x-5 py-3">
          <div className="relative aspect-square h-16 w-16 overflow-hidden rounded-lg bg-neutral-200">
            <img
              src={assetUrls.get(asset.thumbnail_id)!}
              className="z-30 mx-auto scale-100"
              alt=""
            />
          </div>
          <div className="flex flex-grow flex-col justify-between">
            <div className="flex w-full items-center justify-between">
              <h1 className="font-medium text-white/80">{asset.id}</h1>
              <div>
                <Button
                  onClick={() =>
                    window.electron.invoke("download-file", {
                      filename: asset.psd_id,
                      suggestedName: `${asset.psd_id}.psd`,
                    })
                  }
                >
                  Descarcǎ
                </Button>
              </div>
            </div>
            <div className=" w-full justify-between">
              <MiniTable
                data={{
                  Trimis: asset.sent ? "Yes" : "No",
                  Vazut: asset.seen ? "Yes" : "No",
                  Aprobat: asset.approved ? "Yes" : "No",
                  Autor: asset.user!.name!,
                  Data: formatDate(asset.thumbnail?.created_at!, {
                    relative: true,
                  }),
                  Comentariu: asset.comment,
                }}
              />
            </div>
          </div>
        </div>
      ))}
  </div>
);

export default ItemAssets;
