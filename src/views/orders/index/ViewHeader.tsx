import { useState, useRef } from "react";
import { Search, Filter, XIcon } from "lucide-react";

import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import useAnimateViewBar from "@/hooks/useAnimateViewBar";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
const ViewHeader = () => {
  const [searchView, setSearchView] = useState(false);
  const defaultRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const { defaultRefStyles, utilityRefStyles } = useAnimateViewBar({
    duration: 100,
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
          <div>
            <div className="flex items-center ">
              <ViewHeaderTitle title="Comenzi" />
              <div className="ml-3 flex space-x-2">
                <ViewHeaderButton
                  label="Cautǎ"
                  Icon={MagnifyingGlassIcon}
                  onClick={() => setSearchView(true)}
                />
                <ViewHeaderButton label="Filtreazǎ" Icon={FunnelIcon} />
                {/* <ViewHeaderButton label="Settings" Icon={Settings} /> */}
              </div>
            </div>
          </div>
          <div className="mr-2 text-base text-white text-opacity-80">
            <ViewHeaderPagination />
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
            placeholder="Cautǎ..."
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
