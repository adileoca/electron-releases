import { useNavigate } from "react-router-dom";

import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ViewHeaderDivider from "@/components/ViewHeader/Divider";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderInfo from "@/components/ViewHeader/Info";
import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import { formatDate } from "@/lib/utils/format";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import { Search, Filter } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
const ViewHeader: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="">
          <div className="flex items-center">
            {/* <ViewHeaderBackButton onClick={() => navigate("/orders/")} />
            <ViewHeaderDivider /> */}
            <div className="flex items-center space-x-1 pr-4">
              <button className="rounded-lg py-1 pl-[3px] pr-[5px] hover:bg-white/10">
                <ChevronLeftIcon className="size-5 stroke-2 text-white/80" />
              </button>
              <button className="rounded-lg py-1 pr-[3px] pl-[5px] hover:bg-white/10">
                <ChevronRightIcon className="size-5 stroke-2 text-white/80" />
              </button>
            </div>
            <ViewHeaderTitle title="Printuri" />
            <div className="ml-2 flex items-center">
              {/* <OrderStatusBadge text={statusName} /> */}
              <ViewHeaderButton label="Cautǎ" Icon={Search} />
              <ViewHeaderButton label="Filtreazǎ" Icon={Filter} />
            </div>
            <div className="ml-3 flex space-x-2"></div>
          </div>
        </div>
        <div className="mr-2 text-base text-white text-opacity-80">
          <ViewHeaderPagination />
          {/* <ViewHeaderInfo
            info={`Last updated ${formatDate(lastUpdated, { relative: true })}`}
          /> */}
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
