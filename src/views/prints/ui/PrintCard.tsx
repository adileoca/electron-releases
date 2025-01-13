import { useEffect, useMemo } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ActivityFeed from "@/components/ui/ActivityFeed";
import CardWrapper from "@/components/ui/CardWrapper";
import MiniTable from "@/components/ui/MiniTable";
import PrintAssets from "./PrintAssets";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { ItemAssets, Print } from "@/lib/supabase/database";

import { Filter } from "lucide-react";
import { useAssetsData } from "../hooks/useAssetsData";

import { formatDate } from "@/lib/utils/format";
import { usePrintActivity } from "../hooks/usePrintActivity";

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

  const printActivity = usePrintActivity(print);

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
          <ActivityFeed activities={printActivity} />
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
        <div className="relative -mt-3 flex flex-1 items-center space-x-3">
          <span className=" text-lg font-medium text-neutral-900 transition dark:text-white/80">
            {latestVersion.name}
          </span>

          <div>
            <OrderStatusBadge
              color="amber"
              text={print.printed ? "Printat" : "Neprintat"}
            />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <TabList className="flex h-8 items-center space-x-1 rounded-lg border border-white/15 bg-white/5 px-0.5">
            {["Detalii", "Istoric", "Decaluri"].map((label, idx) => (
              <Tab
                key={idx}
                className="rounded-md border border-transparent px-2 py-0.5 text-sm font-semibold text-white/80 hover:bg-white/20 focus-visible:outline-none data-[selected]:border-white/60 data-[selected]:bg-white/80 data-[selected]:text-black/75 data-[selected]:ring-transparent"
              >
                {label}
              </Tab>
            ))}
          </TabList>
          <div className="flex space-x-4">
            <ToolbarButton
              Icon={<SparklesIcon className="h-4 w-4" />}
              label="Asistent AI"
            />
            <ToolbarButton
              Icon={<MagnifyingGlassIcon className="h-4 w-4 stroke-2" />}
              label="Cautǎ"
            />
            <ToolbarButton
              Icon={<Filter className="h-4 w-4" />}
              label="Filtreazǎ"
            />
          </div>
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
