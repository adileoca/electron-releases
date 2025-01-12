import { useNavigate } from "react-router-dom";
import { Input } from "@headlessui/react";
import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ViewHeaderDivider from "@/components/ViewHeader/Divider";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderInfo from "@/components/ViewHeader/Info";
import SelectMenu from "@/components/ViewHeader/SelectMenu";

import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import { formatDate } from "@/lib/utils/format";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import { Search, Filter } from "lucide-react";
import { ChartLineIcon, ChartColumnIcon, ChartSplineIcon } from "lucide-react";

import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";

const ViewHeader: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0 z-50">
      <ViewHeaderWrapper>
        <div className="mx-0.5 w-full">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <ViewHeaderTitle title="Rapoarte" />
              <SelectMenu />
              <ViewHeaderButton label="Filtre" Icon={Filter} />
              {/* <ViewHeaderButton label="Filtre" Icon={Filter} /> */}
            </div>
            <div className="flex space-x-2">
              <div className="flex h-[32px] items-center  divide-white/15 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                <button className="h-full px-2 hover:bg-white/5">
                  <ChartSplineIcon className="h-[18px] text-white/80" />
                </button>
                <button className="h-full px-2 hover:bg-white/5">
                  <ChartColumnIcon className="h-[18px] text-white/80" />
                </button>
              </div>
              <div className="flex space-x-1 rounded-lg border border-white/15 bg-white/5 p-1">
                {["An", "Luna trecutǎ", "Luna curentǎ", "Ultimele 7 zile"].map(
                  (label, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-transparent px-2 py-0 text-sm font-semibold text-white/80 hover:bg-white/20 focus-visible:outline-none data-[selected]:border-white/60 data-[selected]:bg-white/80 data-[selected]:text-black/75 data-[selected]:ring-transparent"
                    >
                      {label}
                    </div>
                  )
                )}
              </div>
              <div className="flex h-[32px] items-center divide-x divide-white/15 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                <button className="h-full px-2 hover:bg-white/5">
                  <CalendarDateRangeIcon className="h-5 text-white/80" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-2 text-base text-white text-opacity-80">
          {/* <ViewHeaderPagination /> */}
          {/* <ViewHeaderInfo
            info={`Last updated ${formatDate(lastUpdated, { relative: true })}`}
          /> */}
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
