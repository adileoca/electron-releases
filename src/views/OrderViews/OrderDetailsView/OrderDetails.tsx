import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { useEffect } from "react";

import ActivityFeed from "./ui/ActivityFeed";
import ShippingCard from "./ui/ShippingCard";
import BillingCard from "./ui/BillingCard";
import CardWrapper from "./ui/CardWrapper";
import OrderItem from "./ui/OrderItem";
import UserInfo from "./ui/UserInfo";
import Section from "./ui/Section";
import LoadingBody from "../OrdersView/ui/LoadingBody";

const OrderDetails = ({ orderId }) => {
  const db = useDatabase();
  const { data: order, error } = useFetchData(() =>
    db.get.order.detailed.byId(orderId)
  );

  useEffect(() => {
    console.log("order", order);
    console.log("orderId", orderId);
  }, [order]);

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div
      style={{ width: "calc(100% - 240px)" }}
      className="fixed right-0 top-12 h-screen overflow-hidden"
    >
      <div className="relative h-full w-full overflow-y-auto bg-white dark:bg-neutral-900/90">
        {order === undefined || order === null ? (
          <LoadingBody />
        ) : (
          <div className="p-4 pb-8">
            <Section title="General">
              <div className="grid grid-cols-3 gap-4">
                <UserInfo order={order} />
                <ShippingCard order={order} />
                <BillingCard order={order} />
              </div>
            </Section>
            <Section title="Activity Feed">
              <CardWrapper>
                <ActivityFeed />
              </CardWrapper>
            </Section>
            <Section title="Order Items">
              <CardWrapper>
                <div className="space-y-3 p-3">
                  {Array(3)
                    .fill(order.items[0])
                    .map((item, idx) => (
                      <OrderItem item={item} key={idx} />
                    ))}
                </div>
              </CardWrapper>
            </Section>
            {/* <span>items (add item, remove item), totals</span>
            <span>history, user interactions (associated ips), timeline</span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
