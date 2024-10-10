import { ChevronDown } from "lucide-react";

const ViewHeaderDropdown = ({ title }) => (
  <button className="flex items-center rounded-lg px-2 transition hover:bg-neutral-900/10 hover:dark:bg-white/10">
    <h1 className="text-lg font-semibold text-neutral-600 text-opacity-80 dark:text-neutral-200/80">
      {title}
    </h1>
    <ChevronDown
      size={20}
      strokeWidth={2.3}
      className="ml-1 mt-1 text-neutral-600 text-opacity-80 dark:text-neutral-200/80"
    />
  </button>
);

export default ViewHeaderDropdown;
