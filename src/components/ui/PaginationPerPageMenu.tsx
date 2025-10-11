import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

type Option = {
  value: number;
  label?: string;
};

type PaginationPerPageMenuProps = {
  value: number;
  options: Option[];
  onChange: (value: number) => void;
  buttonClassName?: string;
  menuClassName?: string;
};

const PaginationPerPageMenu = ({
  value,
  options,
  onChange,
  buttonClassName = "",
  menuClassName = "",
}: PaginationPerPageMenuProps) => {
  const normalizedOptions = options.map((option) => ({
    ...option,
    label: option.label ?? `${option.value} rezultate`,
  }));

  if (!normalizedOptions.length) {
    return null;
  }

  const selected =
    normalizedOptions.find((option) => option.value === value) ??
    normalizedOptions[0];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={clsx(
          "flex items-center space-x-1.5 rounded-md border border-neutral-700 px-3 py-1 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
          buttonClassName
        )}
      >
        <span className="whitespace-nowrap">
          câte {selected?.label ?? `${value} rezultate`}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 translate-y-2"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 translate-y-2"
      >
        <Menu.Items
          className={clsx(
            "absolute bottom-full z-50 mb-2 w-48 origin-bottom-right rounded-md border border-neutral-700 bg-neutral-900/95 p-1 text-sm text-neutral-200 shadow-xl backdrop-blur focus:outline-none",
            menuClassName
          )}
        >
          {normalizedOptions.map((option) => (
            <Menu.Item key={option.value}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => onChange(option.value)}
                  className={clsx(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left",
                    active && "bg-neutral-800 text-white",
                    option.value === value && "bg-neutral-800/80 text-white"
                  )}
                >
                  <span>{option.label}</span>
                  {option.value === value ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : null}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PaginationPerPageMenu;
