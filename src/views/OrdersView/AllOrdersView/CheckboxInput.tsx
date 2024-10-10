import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

const CheckboxInput = ({ checked, onChange }) => (
  <Checkbox
    checked={checked}
    onChange={onChange}
    className="group my-0.5 hover:cursor-pointer flex size-5 place-items-center rounded border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-700 data-[checked]:bg-blue-600 data-[checked]:border-blue-400"
  >
    <CheckIcon className="mx-auto size-4 stroke-white opacity-0 group-data-[checked]:opacity-100" />
  </Checkbox>
);

export default CheckboxInput;
