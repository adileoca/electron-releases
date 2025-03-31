import { useEffect, useMemo } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Route } from "lucide-react";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  IdentificationIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

import { parseConfigurationDetails } from "@/lib/utils/parse";
import { OrderDetailedType } from "@/lib/supabase/database";
import { CurrencyFormatter } from "@/lib/utils/format";
import { useMedia } from "@/lib/supabase/useMedia";
import { formatSize } from "@/lib/utils/format";

import ActivityFeed from "@/components/ui/ActivityFeed";
import MiniTable from "@/components/ui/MiniTable";
import ItemAssets from "./ItemAssets";

import { useItemActivity } from "../hooks/useItemActivity";

type Item = OrderDetailedType["items"][0];
const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div>
      <TabGroup>
        <OrderItemHeader item={item} />
        <OrderItemBody item={item} />
      </TabGroup>
    </div>
  );
};

export default ItemCard;

const OrderItemBody: React.FC<{ item: Item }> = ({ item }) => {
  const assetsData = useMemo(() => {
    return item.assets
      .map(({ thumbnail }) => thumbnail)
      .filter((v): v is NonNullable<typeof v> => v !== null);
  }, [item.assets]);

  const assetUrls = useMedia(assetsData);
  const itemActivity = useItemActivity(item);

  useEffect(() => {
    console.log("item", item);
  }, []);

  return (
    <TabPanels>
      <TabPanel className="border-t border-white/10  ">
        {item.configuration && (
          <MiniTable
            data={parseConfigurationDetails(item.configuration, {
              asObject: true,
            })}
          />
        )}
      </TabPanel>
      <TabPanel>
        <div className="border-t border-white/10 ">
          <ActivityFeed activities={itemActivity} />
        </div>
      </TabPanel>
      <TabPanel className="border-t border-white/10">
        <ItemAssets assets={item.assets} assetUrls={assetUrls} />
      </TabPanel>
    </TabPanels>
  );
};

const OrderItemHeader: React.FC<{ item: Item }> = ({ item }) => {
  const formatter = new CurrencyFormatter(item.totals?.currency!);
  return (
    <div className="flex pb-3">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-lg bg-neutral-200 md:h-16 md:w-16">
        <img
          src={item.product!.images[0].url!}
          className="z-30 mx-auto mb-3 scale-100"
          alt=""
        />
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <div className="relative -mt-1 flex flex-1 justify-between">
          <div className="md:pr-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-lg font-medium text-neutral-900 transition dark:text-white/80">
                <span>{item.product?.name}</span>&nbsp;&nbsp;
                {item.configuration?.size && (
                  <span className="text-base font-semibold text-white/60">
                    {formatSize(item.configuration.size)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            {/* <span className="text-white/80">
              {item.quantity} x {formatter.format(item.totals?.amount_total!)}
            </span> */}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <TabList className="flex items-center space-x-0.5 rounded-lg  border-neutral-700 bg-neutral-800 p-[3px]">
            {[
              {
                label: "Detalii",
                Icon: <IdentificationIcon className="size-4" />,
              },
              { label: "Istoric", Icon: <Route size={14} /> },
              {
                label: "Decaluri",
                Icon: <RectangleGroupIcon className="size-4" />,
              },
            ].map((tab, idx) => (
              <Tab
                key={idx}
                className="flex items-center space-x-1.5 rounded-[6px] border-transparent px-3.5 py-[3px] text-sm  font-medium text-white/80 hover:bg-white/0 hover:text-white focus-visible:outline-none hover:data-[selected]:text-white/80 hover:data-[selected]:cursor-default data-[selected]:border-b-white/80 data-[selected]:bg-neutral-600 data-[selected]:ring-transparent"
              >
                {/* {tab.Icon} */}
                <span>{tab.label}</span>
              </Tab>
            ))}
          </TabList>
          {/* <div className="flex pb-1 space-x-3">
            <ToolbarButton
              Icon={<SparklesIcon className="size-4" />}
              label="Asistent AI"
            />
            <ToolbarButton
              Icon={<MagnifyingGlassIcon className="size-4 stroke-2" />}
              label="Cautǎ"
            />
            <ToolbarButton
              Icon={<Filter className="size-4" />}
              label="Filtreazǎ"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

const ToolbarButton: React.FC<{ Icon: React.ReactNode; label: string }> = ({
  Icon,
  label,
}) => {
  return (
    <button className="flex  items-center space-x-1 text-white/80 hover:text-white">
      {Icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};
