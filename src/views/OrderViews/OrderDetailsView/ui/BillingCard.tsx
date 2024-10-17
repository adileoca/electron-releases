import { Label } from "recharts";
import InfoCard from "./InfoCard";
import MiniTable from "./MiniTable";
import { capitalizeFirstLetter } from "@/utils/format";
import { OrderDetailedType } from "@/lib/supabase/database";
const BillingCard: React.FC<{ order: OrderDetailedType }> = ({ order }) => {
  return (
    <InfoCard
      title="Billing Information"
      button={{
        label: "View invoice",
        onClick: () => window.electron.openLink(order.payment?.invoice_url),
      }}
    >
      <MiniTable
        title="Address"
        data={{
          Country: order.billing_address?.country!,
          State: order.billing_address?.state!,
          "Line 1": order.billing_address?.line_1!,
          "Line 2": order.billing_address?.line_2!,
          "Zip Code": order.billing_address?.postal_code!,
        }}
      />
      <MiniTable
        title="Payment"
        data={{
          status: capitalizeFirstLetter(order.payment?.status!),
          method: capitalizeFirstLetter(
            (order.payment?.details! as { [key: string]: string }).type!
          ),
        }}
      />
    </InfoCard>
  );
};

export default BillingCard;
