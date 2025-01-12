import { Settings, Search, Filter } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import useAnimateViewBar from "@/hooks/useAnimateViewBar";

import { XIcon } from "lucide-react";

const ViewHeader = () => {
  const [searchView, setSearchView] = useState(false);
  const defaultRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const { defaultRefStyles, utilityRefStyles } = useAnimateViewBar({
    defaultRef,
    utilityRef: searchRef,
    showUtilityRef: searchView,
  });

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div
          ref={defaultRef}
          style={defaultRefStyles}
          className=" flex h-full w-full items-center justify-between"
        >
          <div className="pl-0.5">
            <div className="flex items-center ">
              <ViewHeaderTitle title="Dashboard" />
              <div className="ml-3 flex space-x-2">
                {/* <ViewHeaderButton
                  label="Search"
                  Icon={Search}
                  onClick={() => setSearchView(true)}
                /> */}
                {/* <ViewHeaderButton label="Filters" Icon={Filter} /> */}
                {/* <ViewHeaderButton label="Settings" Icon={Settings} /> */}
              </div>
            </div>
          </div>
          <div className="mr-3 text-base text-white text-opacity-80">
            {/* <ViewHeaderPagination /> */}
          </div>
        </div>

        <div
          ref={searchRef}
          style={utilityRefStyles}
          className=" flex h-full w-full items-center justify-between"
        >
          {/* Add your search view contents here */}
          {/* Example input for search */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-none bg-transparent font-medium text-white/60 placeholder:text-white/40 focus:ring-transparent"
          />
          <div className="mr-1.5 flex">
            {/* <ViewHeaderButton
              label=" Filters"
              Icon={Filter}
              onClick={() => setSearchView(true)}
            /> */}
            <ViewHeaderButton
              IconSize={20}
              Icon={XIcon}
              onClick={() => setSearchView(false)}
            />
          </div>
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};

export default ViewHeader;
