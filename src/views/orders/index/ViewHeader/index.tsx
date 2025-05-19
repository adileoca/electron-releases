import { useState, useRef } from "react";

import { XMarkIcon } from "@heroicons/react/20/solid";

import { useAnimateViewBar } from "@/hooks/useAnimateViewBar";

import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderFilters from "./filters";



const ViewHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const defaultRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const { defaultRefStyles } = useAnimateViewBar({
    duration: 100,
    defaultRef,
    utilities: [{ ref: searchRef, show: showSearch }],
  });

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0 z-50">
      <ViewHeaderWrapper>
        <div
          ref={defaultRef}
          style={defaultRefStyles}
          className=" flex h-full w-full items-center"
        >
          <ViewHeaderNavigation />
          <ViewHeaderTitle title="Comenzi" />
          <div className="ml-4 flex space-x-3">
            <ViewHeaderFilters />
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
              Icon={XMarkIcon}
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};

export default ViewHeader;
