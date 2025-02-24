import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function OptionsMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex h-[28px] cursor-default  items-center space-x-1 rounded-full  border-white/25 py-[1px]  text-left text-white/80 hover:cursor-pointer hover:border-white/40 hover:text-white ">
          <span className="font-medium ">Acțiuni</span>
          <ChevronDownIcon aria-hidden="true" className="size-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="data-focus:bg-neutral-100 data-focus:text-neutral-900 data-focus:outline-hidden block px-4 py-2 text-sm text-neutral-700"
            >
              Edit
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="data-focus:bg-neutral-100 data-focus:text-neutral-900 data-focus:outline-hidden block px-4 py-2 text-sm text-neutral-700"
            >
              Duplicate
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="data-focus:bg-neutral-100 data-focus:text-neutral-900 data-focus:outline-hidden block px-4 py-2 text-sm text-neutral-700"
            >
              Archive
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="data-focus:bg-neutral-100 data-focus:text-neutral-900 data-focus:outline-hidden block px-4 py-2 text-sm text-neutral-700"
            >
              Move
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="data-focus:bg-neutral-100 data-focus:text-neutral-900 data-focus:outline-hidden block px-4 py-2 text-sm text-neutral-700"
            >
              Share
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="data-focus:bg-neutral-100 data-focus:text-neutral-900 data-focus:outline-hidden block px-4 py-2 text-sm text-neutral-700"
            >
              Add to favorites
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="data-focus:bg-neutral-100 data-focus:text-neutral-900 data-focus:outline-hidden block px-4 py-2 text-sm text-neutral-700"
            >
              Delete
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
