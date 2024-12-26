import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";

import MiniTable from "./ui/MiniTable";
import ActivityFeed from "./ui/ActivityFeed";
import ShippingCard from "./ui/ShippingCard";
import BillingCard from "./ui/BillingCard";
import CardWrapper from "./ui/CardWrapper";
import OrderItem from "./ui/OrderItem";
import UserInfo from "./ui/UserInfo";
import Section from "./ui/Section";

import { CurrencyFormatter } from "@/utils/format";
import { OrderDetailedType } from "@/lib/supabase/database";
import LoadingBody from "@/components/ui/LoadingBody";
import { OrderHeaderArgs } from "@/types/misc";
import { Filter, Search } from "lucide-react";

const OrderDetails: React.FC<{
  orderId: string;
  setHeaderDetails: Dispatch<SetStateAction<OrderHeaderArgs>>;
}> = ({ orderId, setHeaderDetails }) => {
  const db = useDatabase();
  const { data: order, error } = useFetchData(() =>
    db.get.order.detailed.byId(orderId)
  );

  useEffect(() => {
    console.log("order", order);
    setHeaderDetails({
      orderNo: order?.display_name!,
      lastUpdated: order?.last_updated!,
      status: {
        name: order?.status!.name!,
        timestamp: order?.status!.timestamp!,
      },
    });
  }, [order]);

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div
      style={{
        width: "calc(100% - 200px)",
        boxShadow: "0 0 0 0.6px black",
      }}
      className="ring-offset fixed bottom-2 right-2 top-12 overflow-hidden rounded-lg border border-neutral-500/50"
    >
      <div className="relative h-full w-full overflow-y-auto bg-white dark:bg-neutral-900/100 ">
        {order === undefined || order === null ? (
          <LoadingBody />
        ) : (
          <DetailsBody order={order} />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

const DetailsBody: React.FC<{ order: OrderDetailedType }> = ({ order }) => {
  const formatter = new CurrencyFormatter(order.totals?.currency!);
  return (
    <div className="-mb-4 p-4 pb-0">
      <Section title="General">
        <div className="grid grid-cols-3 gap-4">
          <UserInfo order={order} />
          <ShippingCard order={order} />
          <BillingCard order={order} />
        </div>
      </Section>
      <section className="mb-8">
        <div className="mb-4 flex items-center space-x-4">
          <h1 className="whitespace-nowrap text-lg font-medium text-neutral-600 dark:text-neutral-300">
            Activity Feed
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
          <ActivityFeed activities={order.activities} />
        </CardWrapper>
      </section>
      <Section title="Items">
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <CardWrapper key={idx}>
              <OrderItem activities={order.activities} item={item} />
            </CardWrapper>
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
