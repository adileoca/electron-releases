import { OrderDetailedType } from "@/lib/supabase/database";
import { formatDate } from "@/lib/utils/format";
import MiniTable from "../../../../components/ui/MiniTable";
import Button from "@/components/ui/Button";
import { Order } from "@/lib/supabase/types";
import { Link } from "react-router-dom";

const ItemAssets: React.FC<{
  assets: Order["items"][0]["assets"];
  assetUrls: Map<string, string>;
}> = ({ assets, assetUrls }) => (
  <div className=" divide-y divide-white/15">
    {assets
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .map((asset, index) => (
        <div key={index} className="flex space-x-5 py-3">
          <div className="relative aspect-square h-72 w-72 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-200">
            <img
              src={assetUrls.get(asset.thumbnail_id)!}
              className="z-30 mx-auto aspect-square scale-100 object-contain"
              alt=""
            />
          </div>
          <div className="flex flex-grow flex-col justify-between">
            <div className="mb-3 flex w-full items-center justify-between">
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
                  Trimis: asset.sent ? "Da" : "Nu",
                  Vazut: asset.seen ? "Da" : "Nu",
                  Aprobat: asset.approved ? "Da" : "Nu",
                  Printat: asset.print.length > 0 ? "Da" : "Nu",
                  Print:
                    asset.print.length > 0 ? (
                      <Link
                        className="block w-full max-w-full truncate text-blue-400 hover:underline"
                        to={`/prints/${asset.print[0].print_id}`}
                        title={asset.print[0].print_id}
                      >
                        {asset.print[0].print_id}
                      </Link>
                    ) : (
                      "-"
                    ),

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
