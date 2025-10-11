import InfoCard from "./InfoCard";

import { capitalizeFirstLetter } from "@/lib/utils/format";
import MiniTable from "@/components/ui/MiniTable";
import { Order } from "@/lib/supabase/types";

const BillingCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <InfoCard
      title="Billing Information"
      button={{
        label: "Vezi factură",
        onClick: () => window.electron.openLink(order.payment?.invoice_url),
      }}
    >
      <MiniTable
        title="Adresa de facturare"
        data={{
          Țarǎ: order.billing_address?.country!,
          Regiune: order.billing_address?.state!,
          Oraș: order.billing_address?.city!,
          "Linie 1": order.billing_address?.line_1!,
          "Linie 2": order.billing_address?.line_2 || "-",
          "Cod poştal": order.billing_address?.postal_code!,
        }}
      />
      <MiniTable
        title="Plată"
        data={{
          status: capitalizeFirstLetter(order.payment?.status!),
          method: order.payment?.details
            ? capitalizeFirstLetter(
                JSON.parse(order.payment?.details as string)?.type!
              )
            : "-",
        }}
      />
    </InfoCard>
  );
};

export default BillingCard;
