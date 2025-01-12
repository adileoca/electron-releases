import { Filter, Search } from "lucide-react";

import { OrderDetailedType } from "@/lib/supabase/database";
import { CurrencyFormatter } from "@/lib/utils/format";

import ActivityFeed from "@/components/ui/ActivityFeed";
import CardWrapper from "@/components/ui/CardWrapper";
import MiniTable from "@/components/ui/MiniTable";

import ShippingCard from "./ui/ShippingCard";
import BillingCard from "./ui/BillingCard";
import OrderItem from "./ui/OrderItem";
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
        <div className="mb-4 flex items-center space-x-4">
          <h1 className="whitespace-nowrap text-lg font-medium text-neutral-600 dark:text-neutral-300">
            Istoric
          </h1>
          <div className="flex w-full justify-between">
            <button className="flex items-center space-x-1 rounded px-2 py-1 text-white/80 hover:bg-white/10">
              <Filter size={16} />
              <span>Filters</span>
            </button>
            <div className="relative h-8 w-96 rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-white/60" />
              </div>
              <input
                style={{ boxShadow: "0 0 0 0.6px black" }}
                placeholder="Search..."
                className="block h-8 w-full rounded-lg border border-white/15 bg-white/5 pl-9 text-white/60 placeholder:text-white/40 focus:border-white/15 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:ring-transparent sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <CardWrapper>
          <ActivityFeed
            activities={[
              {
                description: "Comanda a fost creeata",
                type: "positive",
                date: order.created_at!,
              },
            ]}
          />
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
