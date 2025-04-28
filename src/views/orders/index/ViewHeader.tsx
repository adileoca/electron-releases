import { useState, useRef } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import { Filter, XIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import { useOrdersTableContext } from "./context";

import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import { useAnimateViewBar } from "@/hooks/useAnimateViewBar";

const ViewHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const defaultRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const actionRef = useRef<HTMLDivElement | null>(null);
  const {
    state: { selectedOrderIds },
  } = useOrdersTableContext();

  const { defaultRefStyles } = useAnimateViewBar({
    duration: 100,
    defaultRef,
    utilities: [
      { ref: searchRef, show: showSearch },
      // { ref: actionRef, show: selectedOrderIds.length > 0 },
    ],
  });

  // const { utilityRefStyles: actionRefStyles } = useAnimateViewBar({
  //   duration: 100,
  //   defaultRef,
  //   utilityRef: actionRef,
  //   showUtilityRef: selectedOrderIds.length > 0,
  // });

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0 z-50">
      <ViewHeaderWrapper>
        <div
          ref={defaultRef}
          style={defaultRefStyles}
          className=" flex h-full w-full items-center justify-between"
        >
          <div>
            <div className="flex items-center ">
              <ViewHeaderNavigation />
              <ViewHeaderTitle title="Comenzi" />
              <div className="ml-4 flex space-x-3">
                {/* <ViewHeaderButton
                  Icon={ArrowsUpDownIcon}
                  onClick={() => setShowSearch(true)}
                />
                <ViewHeaderButton Icon={FunnelIcon} /> */}
                {/* {selectedOrderIds.length > 0 && (
                  <button className="rounded-lg border border-red-500/90  px-3 py-px font-semibold text-red-500/90 hover:text-red-500 hover:border-red-500">
                    Delete
                  </button>
                )} */}
              </div>
            </div>
          </div>
          <div className="mr-2 text-base text-white text-opacity-80">
            {/* <ViewHeaderPagination /> */}
          </div>
        </div>

        <div
          ref={searchRef}
          style={{ display: showSearch ? "flex" : "none" }}
          className=" flex h-full w-full items-center justify-between"
        >
          <input
            type="text"
            placeholder="Cautǎ..."
            className="w-full border-none bg-transparent font-medium text-white/60 placeholder:text-white/40 focus:ring-transparent"
          />
          <div className="mr-1.5 flex">
            <ViewHeaderButton
              IconSize={20}
              Icon={XIcon}
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>

        {/* <div
          ref={actionRef}
          style={{ display: selectedOrderIds.length > 0 ? "flex" : "none" }}
          className=" flex h-full w-full items-center justify-between"
        >
          <input
            type="text"
            placeholder="caca..."
            className="w-full border-none bg-transparent font-medium text-white/60 placeholder:text-white/40 focus:ring-transparent"
          />
          <div className="mr-1.5 flex">
            <ViewHeaderButton
              IconSize={20}
              Icon={XIcon}
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div> */}
      </ViewHeaderWrapper>
    </div>
  );
};

export default ViewHeader;
