import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";

const ViewHeader: React.FC<{}> = () => {
  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          <ViewHeaderTitle title="Printuri" />
          <div className="ml-4 flex space-x-3 items-center">
            <ViewHeaderButton  Icon={MagnifyingGlassIcon} />
            <ViewHeaderButton Icon={FunnelIcon} />
          </div>
          <div className="ml-3 flex space-x-2"></div>
        </div>

        <div className="mr-2 text-base text-white text-opacity-80">
          <ViewHeaderPagination />
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
