import { useState, useEffect, useMemo, useCallback } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Checkbox,
} from "@headlessui/react";

import ViewHeaderButton from "@/components/ViewHeader/Button";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { FilterConfig, ContextState } from "../context/types";
import { useOrdersTableContext } from "../context";

const allowedFilterTypes: {
  id: ContextState["filters"][0]["type"];
  label: string;
  info: string;
}[] = [
  { id: "equals", label: "=", info: "Egal" },
  { id: "not_equals", label: "!=", info: "Nu este egal" },
  { id: "includes", label: "~", info: "Asemanator" },
];

const ViewHeaderFilters = () => {
  const {
    state: { cols, filters, draftFilters },
    actions: { setFilters, setPagination, addDraftFilter },
  } = useOrdersTableContext();

  // move to context
  const filterConfigs = useMemo(() => {
    return Object.values(cols).reduce((acc, col) => {
      if (col.filter) acc.push(col.filter);
      return acc;
    }, [] as FilterConfig[]);
  }, [cols]);

  const defaultFilter = useMemo(() => {
    return {
      [uuidv4()]: {
        dataKey: filterConfigs[0].dataKey,
        type: allowedFilterTypes[0].id,
        value: filterConfigs[0].options ? filterConfigs[0].options[0].id : "",
        enabled: true,
      },
    } as ContextState["filters"];
  }, [filterConfigs]);
  // -- move to context

  const addNewFilter = useCallback(() => {
    addDraftFilter(uuidv4(), Object.values(defaultFilter)[0]);
  }, [defaultFilter]);

  return (
    <Popover className="clickable relative">
      <PopoverButton
        as="div"
        className="relative flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 focus:outline-none focus:ring-0"
      >
        {({ open }) => (
          <>
            <ViewHeaderButton
              Icon={FunnelIcon}
              className={clsx(
                (open || Object.values(filters).length) && "bg-white/15"
              )}
            />
            {Object.values(filters).length > 0 && (
              <div className="absolute -bottom-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                <span className="text-xs">{Object.values(filters).length}</span>
              </div>
            )}
          </>
        )}
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-0 z-50 mt-3.5 flex w-screen max-w-min  transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {({ close }) => (
          <div className="w-[400px] rounded-md border border-neutral-700 bg-neutral-800 p-2">
            <div className="flex flex-col  space-y-2 pb-2">
              {Object.values(draftFilters).length === 0 && (
                <div>
                  <h1 className="text font-semibold text-neutral-400">
                    Nici un filtru adǎugat
                  </h1>
                  <h1 className="text-sm font-semibold text-neutral-200">
                    Adaugǎ un filtru pentru a începe
                  </h1>
                </div>
              )}
              {Object.keys(draftFilters).map((id) => {
                return (
                  <FilterBox filterConfigs={filterConfigs} filterId={id} />
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-neutral-700 pt-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => addNewFilter()}
                  className="flex items-center space-x-2 text-neutral-400 transition hover:text-neutral-200"
                >
                  <PlusIcon className="size-5" />
                  <span className="text-sm font-semibold">Adaugǎ filtru</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => {
                    setFilters(draftFilters);
                    setPagination({ currentPage: 1 });
                    close();
                  }}
                  className="rounded-md"
                >
                  Aplicǎ filtre
                </Button>
              </div>
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};

export default ViewHeaderFilters;

const FilterBox: React.FC<{
  filterConfigs: FilterConfig[];
  filterId: string;
}> = ({ filterConfigs, filterId }) => {
  const {
    state: { draftFilters },
    actions: { mutateDraftFilter, removeDraftFilter },
  } = useOrdersTableContext();

  const columnOptions = useMemo(() => {
    return filterConfigs.map((c) => ({
      id: c.dataKey,
      ...c,
    }));
  }, [filterConfigs]);

  const filter = useMemo(() => {
    return draftFilters[filterId];
  }, [draftFilters, filterId]);

  const [selectedType, setSelectedType] = useState(
    allowedFilterTypes.find((t) => t.id === filter.type)!
  );

  const [selectedColumn, setSelectedColumn] = useState(
    columnOptions.find((c) => c.dataKey === filter.dataKey)!
  );

  const [value, setValue] = useState(filter.value);
  const [enabled, setEnabled] = useState(filter.enabled);

  // useEffect(() => {
  //   setValue(selectedColumn.options ? selectedColumn.options[0].id : "");
  // }, [selectedColumn]);

  useEffect(() => {
    mutateDraftFilter(filterId, {
      dataKey: selectedColumn.dataKey,
      type: selectedType.id,
      value,
      enabled,
    });
  }, [selectedColumn, selectedType, value, enabled]);

  return (
    <div className="flex w-full flex-1 items-center -space-x-px">
      <div className="pr-2">
        <Checkbox
          checked={enabled}
          onChange={(v) => setEnabled(v)}
          className="group my-0.5 flex size-5 place-items-center rounded-full border border-neutral-300 bg-white hover:cursor-pointer data-[checked]:border-green-400 data-[checked]:bg-green-600 dark:border-neutral-600 dark:bg-neutral-700"
        >
          <span className="m-auto size-2 rounded-full bg-white opacity-0 shadow group-data-[checked]:opacity-100" />
        </Checkbox>
      </div>
      <Select
        options={columnOptions}
        setSelected={setSelectedColumn}
        selected={selectedColumn}
        className={{ button: "rounded-l-md rounded-r-none" }}
      />
      <Select
        options={allowedFilterTypes}
        selected={selectedType}
        setSelected={setSelectedType}
        className={{ button: "rounded-none" }}
      />
      {selectedColumn.options ? (
        <SelectValue
          setValue={setValue}
          possibleValues={selectedColumn.options}
        />
      ) : (
        <div className="flex flex-1">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-7 w-full rounded-l-none rounded-r-md dark:border-neutral-600  dark:bg-neutral-700"
          />
        </div>
      )}
      <div className="pl-2">
        <button
          onClick={() => removeDraftFilter(filterId)}
          className="flex items-center text-neutral-500 hover:text-neutral-300"
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

const SelectValue: React.FC<{
  setValue: React.Dispatch<React.SetStateAction<string>>;
  possibleValues: NonNullable<FilterConfig["options"]>;
}> = ({ setValue, possibleValues }) => {
  const [selectedValue, setSelectedValue] = useState(possibleValues[0]);

  useEffect(() => {
    setValue(selectedValue.id);
  }, [selectedValue]);
  return (
    <Select
      options={possibleValues}
      selected={selectedValue}
      setSelected={setSelectedValue}
      className={{
        button: "w-full flex-1 rounded-l-none rounded-r-md",
        container: "w-full",
      }}
    />
  );
};
