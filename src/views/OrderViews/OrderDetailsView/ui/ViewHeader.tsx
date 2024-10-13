import { Settings, Search, Filter } from "lucide-react";

import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";

const ViewHeader = () => (
  <div style={{ width: "calc(100% - 240px)" }} className="fixed right-0">
    <ViewHeaderWrapper>
      <div className="pl-2">
        <div className="flex items-center ">
          <ViewHeaderTitle title="Orders" />
          <div className="ml-3 flex space-x-2">
            <ViewHeaderButton label="Search" Icon={Search} />
            <ViewHeaderButton label="Filters" Icon={Filter} />
            <ViewHeaderButton label="Settings" Icon={Settings} />
          </div>
        </div>
      </div>
      <div className="mr-3 text-base text-white text-opacity-80">
        <ViewHeaderPagination />
      </div>
    </ViewHeaderWrapper>
  </div>
);
export default ViewHeader;
