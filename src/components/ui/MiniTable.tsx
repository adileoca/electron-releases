import { Pencil } from "lucide-react";

interface MiniTableProps {
  title?: string;
  data: { [key: string]: string | React.ReactNode };
  onClick?: () => {};
}

const MiniTable: React.FC<MiniTableProps> = ({ title, data, onClick }) => {
  return (
    <div className="">
      {title && (
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-medium text-white/80">{title}</h2>
          {onClick && (
            <button
              onClick={onClick}
              className="text-neutral-300 hover:text-blue-400"
            >
              <Pencil strokeWidth={1.5} size={16} />
            </button>
          )}
        </div>
      )}
      <div className="divide-y divide-white/10">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-2">
            <span className="whitespace-nowrap pr-10 text-white/60">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <span className="truncate text-nowrap text-right text-white/80">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniTable;
