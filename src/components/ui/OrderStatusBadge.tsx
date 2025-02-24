import clsx from "clsx";
import { capitalizeFirstLetter } from "@/lib/utils/format";

const StatusBadge: React.FC<{
  text: string;
  color?: "green" | "amber" | "red" | "blue" | "indigo";
}> = ({ text, color }) => (
  <div
    className={clsx(
      color === "indigo" ? "from-indigo-500 to-indigo-400" : "",
      color === "blue" ? "from-blue-500 to-blue-400 " : "",
      color === "green" ? "from-green-500 to-green-400" : "",
      color === "amber" ? " from-amber-600 to-amber-500" : "",
      color === "red" ? "from-red-500 to-red-400" : "",
      color === undefined ? "from-neutral-500 to-neutral-400 " : "",
      "rounded-full bg-gradient-to-t from-85% p-0"
    )}
  >
    <div
      className={clsx(
        color === "indigo" ? " bg-indigo-600" : "",
        color === "blue" ? " bg-blue-600 " : "",
        color === "green" ? " bg-green-600" : "",
        color === "amber" ? " border-t border-amber-500 bg-amber-600" : "",
        color === "red" ? " bg-red-600" : "",
        color === undefined ? " bg-neutral-600 " : "",
        " items-center gap-x-1.5 rounded-full px-3.5 py-[2px] text-sm font-medium text-white/90"
      )}
    >
      {capitalizeFirstLetter(text)}
    </div>
  </div>
);

export default StatusBadge;
