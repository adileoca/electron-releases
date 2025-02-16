import { Print } from "@/lib/supabase/database";
import PrintCard from "./ui/PrintCard";

const ViewBody: React.FC<{ prints: Print[] }> = ({ prints }) => {
  return (
    <div className="flex flex-col p-4">
      <div className="space-y-6">
        {Array(8).fill(prints[0]).map((print, idx) => (
          <PrintCard key={idx} print={print} />
        ))}
      </div>
    </div>
  );
};

export default ViewBody;
