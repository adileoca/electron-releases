import { useEffect, useMemo } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ActivityFeed from "@/components/ui/ActivityFeed";
import CardWrapper from "@/components/ui/CardWrapper";
import MiniTable from "@/components/ui/MiniTable";
import PrintAssets from "./PrintAssets";

import { ItemAssets, Print } from "@/lib/supabase/database";
import { useDatabase } from "@/lib/supabase/context";
import { useMedia } from "@/lib/supabase/useMedia";

import { useAssetsData } from "../hooks/useAssetsData";
import { useFetchData } from "@/hooks/useFetchData";
import { formatDate } from "@/lib/utils/format";

const PrintCard: React.FC<{
  print: Print;
}> = ({ print }) => {
  const { mediaUrls, itemAssets } = useAssetsData(print);

  return (
    <CardWrapper>
      <TabGroup>
        <PrintHeader print={print} mediaUrls={mediaUrls} />
        <PrintBody print={print} assets={itemAssets} mediaUrls={mediaUrls} />
      </TabGroup>
    </CardWrapper>
  );
};

export default PrintCard;

const PrintBody: React.FC<{
  print: Print;
  assets: ItemAssets | undefined;
  mediaUrls: Map<string, string>;
}> = ({ print, assets, mediaUrls }) => {
  const latestVersion = print.versions[0];
  const firstVersion = print.versions.slice(-1)[0];

  const createdAtRelative = formatDate(firstVersion.created_at, {
    relative: true,
    locale: "ro-RO",
  });

  const createdAtAbsolute = formatDate(firstVersion.created_at, {
    locale: "ro-RO",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const updatedAtRelative = formatDate(latestVersion.created_at, {
    relative: true,
    locale: "ro-RO",
  });

  const updatedAtAbsolute = formatDate(latestVersion.created_at, {
    locale: "ro-RO",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <TabPanels>
      <TabPanel className="border-t border-white/15 bg-white/5 px-3 pb-3">
        <MiniTable
          data={{
            ID: print.id,
            Autor: firstVersion.created_by!.name!,
            Creeat: `${createdAtRelative} (${createdAtAbsolute})`,
            "Ultima modificare": `${updatedAtRelative} (${updatedAtAbsolute})`,
          }}
        />
      </TabPanel>
      <TabPanel>
        <div className="border-t border-white/15 bg-white/5">
          <ActivityFeed
            activities={[
              {
                date: firstVersion.created_at!,
                description: "Printul a fost creeat",
                type: "positive",
              },
            ]}
          />
        </div>
      </TabPanel>
      <TabPanel className="border-t border-white/15 bg-white/5 px-3 pb-3">
        {assets ? (
          <PrintAssets assets={assets} mediaUrls={mediaUrls} />
        ) : (
          <div>Loading assets...</div>
        )}
      </TabPanel>
    </TabPanels>
  );
};

const PrintHeader: React.FC<{
  print: Print;
  mediaUrls: Map<string, string>;
}> = ({ print, mediaUrls }) => {
  // const formatter = new CurrencyFormatter(item.totals?.currency!);
  const latestVersion = print.versions[0];
  const firstVersion = print.versions.slice(-1)[0];
  return (
    <div className="flex p-3">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md border border-neutral-600 bg-neutral-200 md:h-16 md:w-16">
        <img
          src={mediaUrls.get(latestVersion.thumbnail_id)}
          className="z-30 mx-auto mb-3 scale-100"
          alt=""
        />
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <div className="relative -mt-2 flex flex-1 items-center justify-between">
          <div className="md:pr-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-lg font-medium text-neutral-900 transition dark:text-white/80">
                <span>{latestVersion.name}</span>&nbsp;
              </div>
            </div>
          </div>
          <div>
            <OrderStatusBadge
              color="amber"
              text={print.printed ? "Printat" : "Neprintat"}
            />
          </div>
        </div>
        <TabList className="flex">
          <div className="flex space-x-1 rounded-md border border-white/15 bg-white/5 p-1">
            {["Detalii", "Activitate", "Decaluri"].map((label, idx) => (
              <Tab
                key={idx}
                className="rounded border border-transparent px-2 py-0.5 text-sm font-semibold text-white/80 hover:bg-white/20 focus-visible:outline-none data-[selected]:border-white/60 data-[selected]:bg-white/80 data-[selected]:text-black/75 data-[selected]:ring-transparent"
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
