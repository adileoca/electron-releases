import { useEffect } from "react";

import { useOrderActivity } from "./hooks/useOrderActivity";
import { CurrencyFormatter } from "@/lib/utils/format";
import { Order } from "@/lib/supabase/types";

import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ActivityFeed from "@/components/ui/ActivityFeed";
import ShippingCard from "./ui/ShippingCard";
import BillingCard from "./ui/BillingCard";
import OrderItem from "./ui/ItemCard";
import UserInfo from "./ui/UserInfo";

const ViewBody: React.FC<{ order: Order }> = ({ order }) => {
  const currency = new CurrencyFormatter(order.totals?.currency!);
  const orderActivity = useOrderActivity(order);

  useEffect(() => {
    console.log("order", order);
  }, [order]);

  const noOfAdhesives = order.items.reduce((acc, item) => {
    if (item.configuration?.wants_adhesive === "2") acc++;
    return acc;
  }, 0);
  return (
    <div className="mx-auto space-y-8">
      <div className="p-4 ">
        <div className="grid grid-cols-3 gap-8">
          <UserInfo order={order} />
          <ShippingCard order={order} />
          <BillingCard order={order} />
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between space-x-4">
          <h1 className="whitespace-nowrap text-xl font-medium text-white/80">
            Produse
          </h1>
          {noOfAdhesives ? (
            <OrderStatusBadge
              text={`+ ${noOfAdhesives} tuburi de adeziv`}
              color="amber"
            />
          ) : null}
        </div>
        <div className="space-y-8">
          {order.items.map((item, idx) => (
            <OrderItem key={idx} item={item} />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className=" flex items-center justify-between space-x-4 border-b border-white/10 pb-2">
          <h1 className="whitespace-nowrap text-xl font-medium text-white/80">
            Istoric
          </h1>
        </div>
        <div>
          {orderActivity && <ActivityFeed activities={orderActivity} />}
        </div>
      </div>
    </div>
  );
};

export default ViewBody;

const ToolbarButton: React.FC<{
  Icon: React.ReactNode;
  children?: any;
  label?: number;
}> = ({ Icon, children, label }) => {
  return (
    <button className="relative flex items-center space-x-1 text-white/60 hover:text-white">
      {Icon}
      {children}

      {label && (
        <div className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-amber-600 text-xs font-semibold text-white/95 outline outline-neutral-900">
          <span>{label}</span>
        </div>
      )}
    </button>
  );
};
