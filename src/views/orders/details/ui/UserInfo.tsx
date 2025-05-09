import MiniTable from "../../../../components/ui/MiniTable";
import InfoCard from "./InfoCard";
import { Order } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils/format";
const UserInfo: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <InfoCard
      title="Customer Information"
      button={{ onClick: () => {}, label: "Vezi analitice" }}
    >
      <MiniTable
        title="Contact"
        data={{
          name: order.name,
          email: order.email,
          phone: order.phone,
        }}
      />
      <MiniTable
        title="Analitice"
        data={{
          Autentificat: order.user_id ? "Da" : "Nu",
          Sursǎ:
            order.session?.gclids && order.session?.gclids.length > 0
              ? `Google (${order.session?.gclids.length} vizite)`
              : "Direct",
          "Primul click": formatDate(order.session?.created_at!, {
            relative: true,
            locale: "ro-RO",
          }),
          "Ultimul click":
            order.session?.gclids && order.session?.gclids.length > 0
              ? formatDate(
                  order.session.gclids.sort(
                    (a, b) =>
                      new Date(b.created_at || 0).getTime() -
                      new Date(a.created_at || 0).getTime()
                  )[0].created_at || "0",
                  {
                    relative: true,
                    locale: "ro-RO",
                  }
                )
              : "-",

          "Duratǎ vizionare":
            order.session?.created_at && order.created_at
              ? formatDuration(order.session.created_at, order.created_at)
              : "-",
        }}
      />
    </InfoCard>
  );
};

export default UserInfo;

function formatDuration(from: string | Date, to: string | Date) {
  const ms = new Date(to).getTime() - new Date(from).getTime();
  if (ms < 0) return "-";
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000) % 24;
  const days = Math.floor(ms / 86400000);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} zi${days > 1 ? "le" : ""}`);
  if (hours > 0) parts.push(`${hours} or${hours > 1 ? "e" : "ă"}`);
  if (minutes > 0 || parts.length === 0) parts.push(`${minutes} minute`);
  return parts.join(", ");
}
// ...existing code...
