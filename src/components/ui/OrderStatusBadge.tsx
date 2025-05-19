import clsx from "clsx";

import { statusConfig } from "@/const/statusConfig";

const StatusBadge: React.FC<{
  text: string;
  color?: "green" | "amber" | "red" | "blue" | "indigo" | "neutral";
}> = ({ text, color }) => {
  const label = statusConfig[text]?.label || text;
  const clr = statusConfig[text]?.color || color;
  return (
    <div
      className={clsx(
        clr === "amber" ? " border-amber-500 bg-amber-600" : "",
        clr === "blue" ? "border-blue-500 bg-blue-600 " : "",
        clr === "indigo" ? "border-indigo-500 bg-indigo-600" : "",
        clr === "green" ? "border-green-500 bg-green-600" : "",
        clr === "cyan" ? " border-cyan-500 bg-cyan-600" : "",
        clr === "red" ? " border-red-500 bg-red-600" : "",
        clr === "lime" ? " border-lime-500 bg-lime-600" : "",
        clr === "purple" ? " border-purple-500 bg-purple-600" : "",
        clr === "neutral" ? " border-neutral-500 bg-neutral-600" : "",
        clr === undefined ? " bg-neutral-600 " : "",
        " items-center gap-x-1.5 rounded-full border-t px-3.5 py-[3px] text-sm font-medium text-white/90 shadow"
      )}
    >
      {label}
    </div>
  );
};

export default StatusBadge;
