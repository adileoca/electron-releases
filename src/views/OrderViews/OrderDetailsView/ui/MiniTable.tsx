import { Pencil } from "lucide-react";

interface MiniTableProps {
  title: string;
  data: { [key: string]: string };
}

const MiniTable: React.FC<MiniTableProps> = ({ title, data }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-medium text-neutral-300">{title}</h2>
        <button className="text-neutral-300 hover:text-blue-400">
          <Pencil strokeWidth={1.5} size={16} />
        </button>
      </div>
      <div className="divide-y divide-neutral-700">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-1.5">
            <span className="whitespace-nowrap text-neutral-400">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <span className="text-wrap text-right text-neutral-300">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniTable;
