import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Checkbox,
} from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";

import { useAnimateViewBar } from "@/hooks/useAnimateViewBar";

import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";

import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useOrdersTableContext } from "./context";
import { ContextState } from "./context/types";

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
            {/* <ViewHeaderFilters /> */}
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

// const allowedFilterTypes: {
//   id: ContextState["filters"][0]["type"];
//   label: string;
//   info: string;
// }[] = [
//   { id: "equals", label: "=", info: "Egal" },
//   { id: "not_equals", label: "!=", info: "Nu este egal" },
//   { id: "includes", label: "~", info: "Asemanator" },
// ];

// type FilterOptions = {
//   id: string;
//   label: string;
//   dataKey: string;
//   possibleValues?: { id: string; label: string; color?: string }[];
// }[];

// const ViewHeaderFilters = () => {
//   const {
//     state: { cols, filters },
//     actions: { setFilters, setPagination },
//   } = useOrdersTableContext();

//   const filterOptions = useMemo(() => {
//     return Object.values(cols)
//       .reduce((acc, col) => {
//         if (col.dataKey) {
//           acc.push({
//             id: uuidv4(),
//             label: col.label!,
//             dataKey: col.dataKey,
//             possibleValues: col.filterValueOptions
//               ? Object.entries(col.filterValueOptions).map(([key, value]) => ({
//                   id: key,
//                   label: value.label,
//                   color: value.color,
//                 }))
//               : undefined,
//           });
//         }
//         return acc;
//       }, [] as FilterOptions)
//       .reverse();
//   }, [cols]);

//   const initialFilter = useMemo(() => {
//     return {
//       [uuidv4()]: {
//         dataKey: filterOptions[0].dataKey,
//         type: allowedFilterTypes[0].id,
//         value: filterOptions[0].possibleValues
//           ? filterOptions[0].possibleValues[0].id
//           : "",
//         enabled: true,
//       },
//     } as ContextState["filters"];
//   }, [filterOptions]);

//   const [currentFilters, setCurrentFilters] = useState<ContextState["filters"]>(
//     Object.values(filters).length === 0 ? initialFilter : filters
//   );

//   const addFilter = useCallback(() => {
//     setCurrentFilters((prev) => ({
//       ...prev,
//       [uuidv4()]: initialFilter[Object.keys(initialFilter)[0]],
//     }));
//   }, [initialFilter, currentFilters, filterOptions]);

//   return (
//     <Popover className="clickable relative">
//       <PopoverButton
//         as="div"
//         className="relative flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 focus:outline-none focus:ring-0"
//       >
//         {({ open }) => (
//           <>
//             <ViewHeaderButton
//               Icon={FunnelIcon}
//               className={clsx(
//                 (open || Object.values(filters).length) && "bg-white/15"
//               )}
//             />
//             {Object.values(filters).length > 0 && (
//               <div className="absolute -bottom-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
//                 <span className="text-xs">{Object.values(filters).length}</span>
//               </div>
//             )}
//           </>
//         )}
//       </PopoverButton>

//       <PopoverPanel
//         transition
//         className="absolute left-0 z-50 mt-3.5 flex w-screen max-w-min  transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//       >
//         {({ close }) => (
//           <div className="w-[400px] rounded-md border border-neutral-700 bg-neutral-800 p-2">
//             <div className="flex flex-col  space-y-2 pb-2">
//               {Object.values(currentFilters).length === 0 && (
//                 <div>
//                   <h1 className="text font-semibold text-neutral-400">
//                     Nici un filtru adǎugat
//                   </h1>
//                   <h1 className="text-sm font-semibold text-neutral-200">
//                     Adaugǎ un filtru pentru a începe
//                   </h1>
//                 </div>
//               )}
//               {Object.entries(currentFilters).map(([id, filter]) => {
//                 return (
//                   <FilterBox
//                     filter={filter}
//                     columnOptions={filterOptions}
//                     filterId={id}
//                     setFilters={setCurrentFilters}
//                     currentFilters={currentFilters}
//                     key={id}
//                   />
//                 );
//               })}
//             </div>
//             <div className="flex items-center justify-between border-t border-neutral-700 pt-2">
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => addFilter()}
//                   className="flex items-center space-x-2 text-neutral-400 transition hover:text-neutral-200"
//                 >
//                   <PlusIcon className="size-5" />
//                   <span className="text-sm font-semibold">Adaugǎ filtru</span>
//                 </button>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Button
//                   onClick={() => {
//                     setFilters(currentFilters);
//                     setPagination({ currentPage: 1 });
//                     close();
//                   }}
//                   className="rounded-md"
//                 >
//                   Aplicǎ filtre
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </PopoverPanel>
//     </Popover>
//   );
// };

// const FilterBox: React.FC<{
//   columnOptions: FilterOptions;
//   filterId: string;
//   filter: ContextState["filters"][0];
//   currentFilters?: ContextState["filters"];
//   setFilters: React.Dispatch<React.SetStateAction<ContextState["filters"]>>;
// }> = ({ columnOptions, setFilters, filter, filterId }) => {
//   const [selectedType, setSelectedType] = useState(
//     allowedFilterTypes.find((t) => t.id === filter.type)!
//   );
//   const [selectedColumn, setSelectedColumn] = useState(
//     columnOptions.find((c) => c.dataKey === filter.dataKey)!
//   );

//   const [value, setValue] = useState(filter.value);
//   const [enabled, setEnabled] = useState(filter.enabled);

//   useEffect(() => {
//     if (selectedColumn.possibleValues) {
//       setValue(selectedColumn.possibleValues[0].id);
//     } else {
//       setValue("");
//     }
//   }, [selectedColumn]);

//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterId]: {
//         dataKey: selectedColumn.dataKey,
//         type: selectedType.id,
//         enabled,
//         value,
//       },
//     }));
//   }, [selectedColumn, selectedType, value, enabled]);

//   const handleDelete = () => {
//     setFilters((prev) => {
//       const newFilters = { ...prev };
//       delete newFilters[filterId];
//       return newFilters;
//     });
//   };

//   return (
//     <div className="flex w-full flex-1 items-center -space-x-px">
//       <div className="pr-2">
//         <Checkbox
//           checked={enabled}
//           onChange={(v) => setEnabled(v)}
//           className="group my-0.5 flex size-5 place-items-center rounded-full border border-neutral-300 bg-white hover:cursor-pointer data-[checked]:border-green-400 data-[checked]:bg-green-600 dark:border-neutral-600 dark:bg-neutral-700"
//         >
//           <span className="m-auto size-2 rounded-full bg-white opacity-0 shadow group-data-[checked]:opacity-100" />
//         </Checkbox>
//       </div>
//       <Select
//         options={columnOptions}
//         setSelected={setSelectedColumn}
//         selected={selectedColumn}
//         className={{ button: " rounded-l-md rounded-r-none" }}
//       />
//       <Select
//         options={allowedFilterTypes}
//         selected={selectedType}
//         setSelected={setSelectedType}
//         className={{ button: " rounded-none" }}
//       />

//       {selectedColumn.possibleValues ? (
//         <SelectValue
//           setValue={setValue}
//           possibleValues={selectedColumn.possibleValues}
//         />
//       ) : (
//         <div className="flex flex-1">
//           <Input
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             className="h-7 w-full rounded-l-none rounded-r-md dark:border-neutral-600  dark:bg-neutral-700"
//           />
//         </div>
//       )}

//       <div className="pl-2">
//         <button
//           onClick={() => handleDelete()}
//           className="flex items-center text-neutral-500 hover:text-neutral-300"
//         >
//           <XMarkIcon className="size-5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const SelectValue: React.FC<{
//   setValue: React.Dispatch<React.SetStateAction<string>>;
//   possibleValues: NonNullable<FilterOptions[0]["possibleValues"]>;
// }> = ({ setValue, possibleValues }) => {
//   const [selectedValue, setSelectedValue] = useState(possibleValues[0]);

//   useEffect(() => {
//     setValue(selectedValue.id);
//   }, [selectedValue]);
//   return (
//     <Select
//       options={possibleValues}
//       selected={selectedValue}
//       setSelected={setSelectedValue}
//       className={{
//         button: "w-full flex-1 rounded-l-none rounded-r-md",
//         container: "w-full",
//       }}
//     />
//   );
// };
