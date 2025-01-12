import { useEffect, useMemo } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { OrderDetailedType } from "@/lib/supabase/database";
import { useMedia } from "@/lib/supabase/useMedia";
import { useDatabase } from "@/lib/supabase/context";

import { parseConfigurationDetails } from "@/lib/utils/parse";
import { CurrencyFormatter } from "@/lib/utils/format";
import { ActivityItem } from "@/components/ui/ActivityFeed";
import ActivityFeed from "@/components/ui/ActivityFeed";
import MiniTable from "@/components/ui/MiniTable";
import ItemAssets from "./ItemAssets";
import CardWrapper from "@/components/ui/CardWrapper";

export type Item = OrderDetailedType["items"][0];

const taskTypeLabels = {
  edit: "editare",
  print: "printare",
};
const OrderItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <CardWrapper>
      <TabGroup>
        <OrderItemHeader item={item} />
        <OrderItemBody item={item} />
      </TabGroup>
    </CardWrapper>
  );
};

export default OrderItem;

const OrderItemBody: React.FC<{ item: Item }> = ({ item }) => {
  const { db } = useDatabase();

  const assetsData = useMemo(() => {
    return item.assets
      .map(({ thumbnail }) => thumbnail)
      .filter((v): v is NonNullable<typeof v> => v !== null);
  }, [item.assets]);

  const assetUrls = useMedia(assetsData);

  const itemActivity = parseItemActivity(item);

  useEffect(() => {}, [db]);
  return (
    <TabPanels>
      <TabPanel className="border-t border-white/15 bg-white/5 px-3 pb-3">
        {item.configuration && (
          <MiniTable
            data={parseConfigurationDetails(item.configuration, {
              asObject: true,
            })}
          />
        )}
      </TabPanel>
      <TabPanel>
        <div className="border-t border-white/15 ">
          <ActivityFeed activities={parseItemActivity(item)} />
        </div>
      </TabPanel>
      <TabPanel className="border-t border-white/15 bg-white/5 px-3 pb-3">
        <ItemAssets assets={item.assets} assetUrls={assetUrls} />
      </TabPanel>
    </TabPanels>
  );
};

const parseItemActivity = (item: Item): ActivityItem[] => {
  // todo: get history for tasks tables as well.

  const taskActivities: ActivityItem[] = item.tasks.map((task, idx) => ({
    date: task.updated_at!,
    description: `Sarcina de ${taskTypeLabels[task.type!]} ${
      task.id.split("-")[1]
    }   a fost creeata.`,
    type: "positive",
  }));

  return taskActivities;
};

const OrderItemHeader: React.FC<{ item: Item }> = ({ item }) => {
  const formatter = new CurrencyFormatter(item.totals?.currency!);
  return (
    <div className="flex p-3">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-lg bg-neutral-200 md:h-16 md:w-16">
        <img
          src={item.configuration!.thumbnail_url!}
          className="z-30 mx-auto mb-3 scale-100"
          alt=""
        />
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <div className="relative -mt-1 flex flex-1 justify-between">
          <div className="md:pr-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-lg font-medium text-neutral-900 transition dark:text-white/80">
                <span>{item.product?.name}</span>&nbsp;
                {/* <span className="text-base font-normal text-white/60">
                  {item.id}
                </span> */}
              </div>
            </div>
          </div>
          <div>
            <span className="text-white/80">
              {item.quantity} x {formatter.format(item.totals?.amount_total!)}
            </span>
          </div>
        </div>
        <TabList className="flex">
          <div className="flex space-x-1 rounded-lg border border-white/15 bg-white/5 p-1">
            {["Details", "Activity", "Assets"].map((label, idx) => (
              <Tab
                key={idx}
                className="rounded px-2 py-0.5 text-sm font-medium text-white/80 hover:bg-white/20 data-[selected]:border-transparent data-[selected]:bg-white/75 data-[selected]:text-black/75 data-[selected]:ring-transparent"
              >
                {label}
              </Tab>
            ))}
          </div>
        </TabList>
      </div>
    </div>
  );
};
