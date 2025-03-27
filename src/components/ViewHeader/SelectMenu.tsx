"use client";

import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import CardWrapper from "../ui/CardWrapper";
const options = [
  { id: 1, name: "comenzi" },
  { id: 2, name: "Clienti" },
  { id: 3, name: "Stocuri" },
  { id: 4, name: "comenzi" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

const SelectMenu = () => {
  const [selected, setSelected] = useState(options[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <ListboxButton className="flex h-[28px] cursor-default items-center space-x-1 rounded-full  border-white/25 py-[1px] pl-[5px] pr-1.5 text-left text-white/60 hover:cursor-pointer hover:border-white/40 hover:text-white ">
          <span className="truncate text-lg font-semibold">
            {selected.name}
          </span>
          <ChevronUpDownIcon className="size-5" />
        </ListboxButton>

        <ListboxOptions

          transition
          className="absolute z-50 mt-2.5 text-sm shadow shadow-black/20 rounded-md focus:outline-none transition data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
        >
          <CardWrapper>
            <div className="flex flex-col max-h-60 p-1 w-40 space-y-2 overflow-y-scroll  bg-neutral-900/80 text-white/80  backdrop-blur">
              {options.map((person) => (
                <ListboxOption
                  key={person.id}
                  value={person}
                  className="group relative cursor-default hover:cursor-pointer rounded select-none py-2 pl-3 pr-5 text-white/80 data-[focus]:bg-white/10 data-[selected]:bg-white/20 data-[focus]:text-white data-[focus]:outline-none"
                >
                  <span className="block truncate  font-semibold">
                    {person.name}
                  </span>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-white/80 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                    <CheckIcon className="size-4" />
                  </span>
                </ListboxOption>
              ))}
            </div>
          </CardWrapper>
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default SelectMenu;
