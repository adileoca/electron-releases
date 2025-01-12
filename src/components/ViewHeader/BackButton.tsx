import { ChevronLeft } from "lucide-react";

const ViewHeaderBackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 rounded-lg transition dark:text-white/80  dark:hover:hover:text-white"
  >
    <ChevronLeft
      size={16}
      strokeWidth={1.8}
      className="-ml-1.5 -mr-1 "
    />
    <span className=" ">Înapoi</span>
  </button>
);

export default ViewHeaderBackButton;
