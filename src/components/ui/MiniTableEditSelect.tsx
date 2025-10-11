import React, { useMemo, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

type Option<T extends string | number = string> = {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
};

export interface MiniTableEditSelectProps<T extends string | number = string> {
  value?: T | null;
  onChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
  defaultOptionLabel?: React.ReactNode;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  label?: React.ReactNode;
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const MiniTableEditSelect = <T extends string | number = string>(props: MiniTableEditSelectProps<T>) => {
  const { value, onChange, options, placeholder, defaultOptionLabel, error, disabled, className, label } = props;

  const [isFocused, setIsFocused] = useState(false);

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const hasValue = selected !== undefined && selected !== null;

  return (
    <div className={classNames("relative w-full", disabled && "opacity-70", className)}>
      {label ? (
        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-white/60">
          {label}
        </span>
      ) : null}

      <Listbox value={value as any} onChange={onChange as any} disabled={disabled}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton
              onClick={() => setIsFocused(true)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={classNames(
                "w-full cursor-default rounded-md bg-transparent py-2 pl-3  text-right text-white focus:outline-none",
                "placeholder:text-white/40",
                error && "text-amber-300"
              )}
            >
              <span className="block truncate">
                {hasValue ? (
                  selected!.label
                ) : (
                  <span className="text-white/40">{placeholder || defaultOptionLabel || "Selectează"}</span>
                )}
              </span>
              {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-white/60" />
              </span> */}
            </ListboxButton>

            <ListboxOptions className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border border-white/10 bg-neutral-900 py-1 text-sm shadow-lg focus:outline-none">
              {options.map((opt) => (
                <ListboxOption
                  key={String(opt.value)}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-8 pr-8 text-right text-white",
                      active && "bg-neutral-800"
                    )
                  }
                >
                  {({ selected: isSelected }) => (
                    <>
                      <span className={classNames("block truncate", isSelected ? "font-medium" : "font-normal")}>{
                        opt.label
                      }</span>
                      {isSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-emerald-400">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>

      {/* <span className={classNames("pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10 transition-colors", error && "bg-amber-400")} /> */}
      <span
        className={classNames(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 transform bg-white transition-transform duration-150 ease-out",
          isFocused && "scale-x-100",
          error && "bg-amber-400"
        )}
      />
    </div>
  );
};

export default MiniTableEditSelect;

