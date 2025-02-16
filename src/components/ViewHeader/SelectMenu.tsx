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

const options = [
  { id: 1, name: "Comenzi" },
  { id: 2, name: "Clienti" },
  { id: 3, name: "Stocuri" },
  { id: 4, name: "Comenzi" },
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
        <ListboxButton className="flex cursor-default items-center space-x-1 rounded-lg border border-white/25 py-[3px] pl-3 pr-1.5 text-left text-white/80 hover:cursor-pointer hover:bg-white/10">
          <span className="truncate font-semibold">{selected.name}</span>
          <ChevronUpDownIcon className="size-5" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-50 mt-3 max-h-60 w-36 overflow-auto rounded-md border border-white/10 bg-white/15 text-sm shadow-xl  backdrop-blur-3xl focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
        >
          {options.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default select-none py-2 pl-3 pr-5 text-white/80 data-[focus]:bg-white/10 data-[selected]:bg-white/20 data-[focus]:text-white data-[focus]:outline-none"
            >
              <span className="block truncate  group-data-[selected]:font-semibold">
                {person.name}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-white group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default SelectMenu;
