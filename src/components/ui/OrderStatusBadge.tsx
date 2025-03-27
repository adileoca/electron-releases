import clsx from "clsx";

const statusConfig = {
  placed: { label: "În așteptare", color: "amber" },
  editing: { label: "În lucru", color: "blue" },
  feedback: { label: "Previzualizare", color: "indigo" },
  approved: { label: "Aprobat", color: "green" },
  printed: { label: "Tipărit", color: "cyan" },
  shipped: { label: "Expediat", color: "lime" },
  delivered: { label: "Livrat", color: "neutral" },


};

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
        clr === "neutral" ? " border-neutral-500 bg-neutral-600" : "",
        clr === undefined ? " bg-neutral-600 " : "",
        " items-center gap-x-1.5 rounded-full border-t px-3.5 py-[3px] text-sm font-medium text-white/90"
      )}
    >
      {label}
    </div>
  );
};

export default StatusBadge;
