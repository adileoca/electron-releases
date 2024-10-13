import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderDropdown from "@/components/ViewHeader/Dropdown";
import { Settings, Search, SquarePen } from "lucide-react";

const ViewHeader = () => (
  <ViewHeaderWrapper>
    <div className="pl-2">
      <div className="flex items-center ">
        <ViewHeaderDropdown title="Inbox" />
        <Divider />
        <ViewHeaderButton label="Compose" Icon={SquarePen} />
        <Divider />
        <ViewHeaderButton label="Search" Icon={Search} />

        <Divider />
        <ViewHeaderButton label="Settings" Icon={Settings} />
      </div>
    </div>
    <div className="mr-3 text-base text-white text-opacity-80">
      <ViewHeaderPagination />
    </div>
  </ViewHeaderWrapper>
);

export default ViewHeader;

const Divider = () => (
  <div className="mx-2 h-5 w-px bg-neutral-900 bg-opacity-20 dark:bg-white dark:bg-opacity-20" />
);
