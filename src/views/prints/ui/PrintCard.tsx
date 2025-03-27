import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState, useMemo } from "react";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ActivityFeed from "@/components/ui/ActivityFeed";
import CardWrapper from "@/components/ui/CardWrapper";
import MiniTable from "@/components/ui/MiniTable";
import PrintAssets from "./PrintAssets";

import { ItemAssets, Print } from "@/lib/supabase/database";
import { formatDate } from "@/lib/utils/format";

import { usePrintActivity } from "../hooks/usePrintActivity";
import { useAssetsData } from "../hooks/usePrintAssetsData";

import { Filter, Route } from "lucide-react";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  IdentificationIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const PrintCard: React.FC<{
  print: Print;
}> = ({ print }) => {
  const { mediaUrls } = useAssetsData(print);

  return (
    <div className="group">
      <TabGroup>
        <PrintHeader print={print} mediaUrls={mediaUrls} />
        <PrintBody print={print} mediaUrls={mediaUrls} />
      </TabGroup>
    </div>
  );
};

export default PrintCard;

const PrintBody: React.FC<{
  print: Print;
  mediaUrls: Map<string, string>;
}> = ({ print, mediaUrls }) => {
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
    month: "numeric",
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
    month: "numeric",
  });

  return (
    <TabPanels>
      <TabPanel className="border-t border-white/10 pb-3"></TabPanel>
      <TabPanel className="border-t border-white/10 pb-3">
        <MiniTable
          data={{
            ID: print.id,
            Autor: firstVersion.created_by!.name!,
            Creeat: `${createdAtAbsolute} (${createdAtRelative})`,
            "Ultima modificare": `${updatedAtAbsolute} (${updatedAtRelative})`,
          }}
        />
      </TabPanel>
      <TabPanel>
        <div className="border-t border-white/10 pb-12">
          <ActivityFeed activities={printActivity} />
        </div>
      </TabPanel>
      <TabPanel className="divide-y divide-white/10 border-t border-white/10   pb-3">
        {print.assets ? (
          <PrintAssets
            isPrinted={print.printed}
            assets={print.assets}
            mediaUrls={mediaUrls}
          />
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
  const firstVersion = print.versions[0];
  const latestVersion = print.versions.slice(-1)[0];
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex pb-3">
      <div className="relative aspect-square h-16 w-16  overflow-hidden rounded-md bg-neutral-200 ">
        <img
          src={mediaUrls.get(latestVersion.thumbnail_id)}
          className="z-30 mx-auto mb-3 scale-100"
          alt=""
        />
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <div className="relative -mt-3 flex flex-1 items-center justify-between space-x-3">
          <span className=" text-lg font-medium text-neutral-900 transition dark:text-white/80">
            {latestVersion.name}
          </span>
          <div>
            <OrderStatusBadge
              color={print.printed ? "green" : "amber"}
              text={print.printed ? "Printat" : "Neprintat"}
            />
          </div>
        </div>
        <div
          className={clsx(clicked ? "" : "", "flex items-end justify-between")}
        >
          <TabList className="-ml-[2px] flex items-center rounded-lg">
            {[
              {},
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
                onClick={() => setClicked(true)}
                key={idx}
                className={clsx(
                  !tab.label && "hidden",
                  "-mb-[12px] mr-4 flex items-center space-x-2 rounded-t-lg border-2 border-transparent pb-3 font-medium text-white/80 hover:bg-white/0 hover:text-white focus-visible:outline-none data-[selected]:border-b-white/80 data-[selected]:bg-white/0 data-[selected]:ring-transparent"
                )}
              >
                {/* {tab.Icon} */}
                <span>{tab.label}</span>
              </Tab>
            ))}
          </TabList>
          <div className="flex space-x-3 pb-1">
            {/* <ToolbarButton
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
            /> */}
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
    <button className="flex items-center space-x-1 text-white/80 hover:text-white">
      {Icon}
      {/* <span className="font-medium">{label}</span> */}
    </button>
  );
};
