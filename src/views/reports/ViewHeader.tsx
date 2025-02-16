import { useNavigate } from "react-router-dom";
import { Input } from "@headlessui/react";
import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ViewHeaderDivider from "@/components/ViewHeader/Divider";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderInfo from "@/components/ViewHeader/Info";
import SelectMenu from "@/components/ViewHeader/SelectMenu";
import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import { Filter } from "lucide-react";
import { ChartColumnIcon, ChartSplineIcon } from "lucide-react";

import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";

const ViewHeader: React.FC<{}> = () => {
  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0 z-50">
      <ViewHeaderWrapper>
        <div className="flex w-full items-center justify-between mr-2">
          <ViewHeaderNavigation />
          <ViewHeaderTitle title="Rapoarte" />
          <div className="ml-[22px] flex flex-1 items-center space-x-2">
            <SelectMenu />

            {/* <button className="h-full  hover:bg-white/5">
              <ChartSplineIcon className="h-[18px] text-white/80" />
            </button>
            <button className="h-full  hover:bg-white/5">
              <ChartColumnIcon className="h-[18px] text-white/80" />
            </button> */}
          </div>
          <div className="flex items-center space-x-2 ">

            <SelectMenu />

          </div>
        </div>

      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
