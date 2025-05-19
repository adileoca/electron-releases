"use client";

import { useState } from "react";
import { Switch, Label, Field } from "@headlessui/react";

const ShortToggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Field className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none "
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-full rounded-md bg-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-neutral-800 border border-neutral-700 group-data-[checked]:border-green-500 transition-colors duration-200 ease-in-out group-data-[checked]:bg-green-600 "
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 inline-block size-5 transform rounded-full  bg-neutral-100 shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      <Label as="span" className="ml-2.5 text-sm">
        <span className="font-semibold text-neutral-200">Live mode</span>{" "}
      </Label>
    </Field>
  );
};

export default ShortToggle;
