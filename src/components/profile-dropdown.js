import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Fragment } from "react";
import clsx from "clsx";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", onClick: "#" },
];

export default function ProfileDropdown() {
  const auth0 = useAuth0();

  return (
    <Menu as="div">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <img
          className="h-8 w-8 rounded-full bg-gray-50"
          src={auth0.user.picture}
          alt=""
        />
        <span className="hidden lg:flex lg:items-center">
          <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
            {auth0.user.name}
          </span>
          <ChevronDownIcon
            className="ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  onClick={() =>
                    auth0.logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className={clsx(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
