import { ChevronLeft } from "lucide-react";

const ViewHeaderBackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 rounded-lg px-2.5 py-0.5 transition hover:bg-neutral-900/10 dark:hover:bg-white/10"
  >
    <ChevronLeft
      size={16}
      strokeWidth={1.8}
      className="-ml-1.5 -mr-1 text-neutral-600 text-opacity-80 dark:text-white/70"
    />
    <span className="font-medium text-neutral-600/80 dark:text-white/70">
      Back
    </span>
  </button>
);

export default ViewHeaderBackButton;
