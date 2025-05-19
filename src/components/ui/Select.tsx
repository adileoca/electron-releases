"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

type BaseOption = {
  id: string;
  label: string;
  info?: string;
};

type SelectProps<T extends BaseOption> = {
  label?: string;

  options: T[];
  selected: T;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
  className?: {
    button?: string;
    container?: string;
  };
};

function Select<T extends BaseOption>({
  label,
  options,
  selected,
  setSelected,
  className,
}: SelectProps<T>) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {label && (
        <Label className="mb-2 block text-sm/6 font-medium text-gray-900">
          {label}
        </Label>
      )}
      <div className={clsx("relative", className?.container)}>
        <ListboxButton
          className={clsx(
            "cursor-default justify-between flex items-center rounded-md bg-neutral-700 py-0.5 pl-3 pr-2 text-left text-neutral-200 outline outline-1 -outline-offset-1 outline-neutral-600 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6",
            className?.button
          )}
        >
          <span className="col-start-1 row-start-1 truncate pr-2">
            {selected.label}
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-neutral-400 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-neutral-700 p-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group relative cursor-default select-none rounded-[5px] py-2 pl-3 pr-9 text-neutral-200 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {option.label}
                {option.info && (
                  <span className="text-neutral-400">{` (${option.info})`}</span>
                )}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default Select;
