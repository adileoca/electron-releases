import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ProfileDropdown from "./profile-dropdown";

export default function Header() {
  return (
    <header className="draggable sticky top-0 bg-white bg-opacity-75 px-10 backdrop-blur">
      <div className=" py-5">
        <div className="relative flex items-center justify-between">
          <div>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-4 w-4 stroke-neutral-400 stroke-1 text-neutral-400" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Cautare..."
              className=" w-full rounded-md border-0 bg-neutral-50 py-1.5 pl-10 pr-96 text-neutral-900 placeholder:text-neutral-400 focus:ring-transparent sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
