import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Filter } from "lucide-react";
import { OrderDetailedType } from "@/lib/supabase/database";
import { CurrencyFormatter } from "@/lib/utils/format";

import ActivityFeed from "@/components/ui/ActivityFeed";
import CardWrapper from "@/components/ui/CardWrapper";
import MiniTable from "@/components/ui/MiniTable";

import ShippingCard from "./ui/ShippingCard";
import BillingCard from "./ui/BillingCard";
import OrderItem from "./ui/ItemCard";
import UserInfo from "./ui/UserInfo";
import Section from "./ui/Section";

const ViewBody: React.FC<{ order: OrderDetailedType }> = ({ order }) => {
  const formatter = new CurrencyFormatter(order.totals?.currency!);

  return (
    <div className="-mb-4 p-4 pb-0">
      <Section title="">
        <div className="grid grid-cols-3 gap-4">
          <UserInfo order={order} />
          <ShippingCard order={order} />
          <BillingCard order={order} />
        </div>
      </Section>
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between space-x-4">
          <h1 className="whitespace-nowrap text-lg font-medium text-neutral-600 dark:text-neutral-300">
            Istoric
          </h1>

          <div className="flex space-x-4">
            <ToolbarButton
              Icon={<SparklesIcon className="h-4 w-4" />}
              label="Asistent AI"
            />
            <ToolbarButton
              Icon={<MagnifyingGlassIcon className="h-4 w-4 stroke-2" />}
              label="Cautǎ"
            />
            <ToolbarButton
              Icon={<Filter className="h-4 w-4" />}
              label="Filtreazǎ"
            />
          </div>
        </div>

        <CardWrapper>
          <ActivityFeed activities={[]} />
        </CardWrapper>
      </section>
      <Section title="Items">
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <OrderItem key={idx} item={item} />
          ))}

          <CardWrapper>
            <div className="bg-white/5 p-3">
              <MiniTable
                title=""
                data={{
                  subtotal: formatter.format(order.totals?.amount_subtotal!),
                  shipping: formatter.format(order.totals?.amount_shipping!),
                  tax: formatter.format(order.totals?.amount_tax!),
                  total: formatter.format(order.totals?.amount_total!),
                }}
              />
            </div>
          </CardWrapper>
        </div>
      </Section>
    </div>
  );
};

export default ViewBody;
const ToolbarButton: React.FC<{ Icon: React.ReactNode; label: string }> = ({
  Icon,
  label,
}) => {
  return (
    <button className="flex  items-center space-x-1 text-white/80 hover:text-white">
      {Icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};
