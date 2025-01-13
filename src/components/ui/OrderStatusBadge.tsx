import clsx from "clsx";
import { capitalizeFirstLetter } from "@/lib/utils/format";
import CardWrapper from "./CardWrapper";
const StatusBadge: React.FC<{
  text: string;
  color?: "green" | "amber" | "red" | "blue" | "indigo";
}> = ({ text, color }) => (
  <span
    className={clsx(
      color === "indigo"
        ? "border-indigo-500 bg-indigo-600 text-indigo-50"
        : "",
      color === "blue" ? "border-blue-500 bg-blue-600 " : "",
      color === "green" ? "border-green-500 bg-green-600" : "",
      color === "amber" ? "border-amber-500 bg-amber-600" : "",
      color === "red" ? "border-red-500 bg-red-600" : "",
      color === undefined
        ? "border-neutral-500 bg-neutral-600 text-neutral-200"
        : "",
      "inline-flex shadow items-center gap-x-1.5 rounded-md border px-2.5 py-0.5 text-sm font-medium text-white/90 "
    )}
  >
    {capitalizeFirstLetter(text)}
  </span>
);

export default StatusBadge;
