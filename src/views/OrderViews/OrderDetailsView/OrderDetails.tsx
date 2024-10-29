import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { Dispatch, SetStateAction, useEffect } from "react";

import MiniTable from "./ui/MiniTable";
import ActivityFeed from "./ui/ActivityFeed";
import ShippingCard from "./ui/ShippingCard";
import BillingCard from "./ui/BillingCard";
import CardWrapper from "./ui/CardWrapper";
import OrderItem from "./ui/OrderItem";
import UserInfo from "./ui/UserInfo";
import Section from "./ui/Section";

import { OrderHeaderArgs } from "@/types/misc";
import { OrderDetailedType } from "@/lib/supabase/database";
import LoadingBody from "@/components/ui/LoadingBody";

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

  useEffect(() => {
    if (!order) return;

    const url =
      "https://django-static-872.s3.eu-south-1.amazonaws.com/private/file2.psd";

    if (url) {
      const parsedUrl = new URL(url);
      console.log("url", url);
      const pathname = parsedUrl.pathname; // Get the path part of the URL
      const segments = pathname.split("/"); // Split the path into segments
      const filename = segments.pop(); // Get the last segment as the filename
      console.log("filename", filename);
      window.electron.invoke("cache-file-from-url", { url, filename });
    }
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
      className="ring-offset fixed bottom-2 right-2 top-12 overflow-hidden rounded-lg border  border-neutral-500/50 ring-1 ring-black"
    >
      <div className="relative h-full w-full overflow-y-auto bg-white dark:bg-neutral-900/85 ">
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
    <div className="p-4 pb-0 -mb-4">
      <Section title="General">
        <div className="grid grid-cols-3 gap-4">
          <UserInfo order={order} />
          <ShippingCard order={order} />
          <BillingCard order={order} />
        </div>
      </Section>
      <Section title="Activity Feed">
        <CardWrapper>
          <ActivityFeed activities={order.activities} />
        </CardWrapper>
      </Section>
      <Section title="Order Items">
        <CardWrapper>
          <div className="divide-y divide-neutral-700 px-3 ">
            {Array(3)
              .fill(order.items[0])
              .map((item, idx) => (
                <OrderItem item={item} key={idx} />
              ))}
            <div className="pb-1 pl-44">
              <div className="pl-1">
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
            </div>
          </div>
        </CardWrapper>
      </Section>
    </div>
  );
};

class CurrencyFormatter {
  private currency: string;

  constructor(currency: string) {
    this.currency = currency;
  }

  public format(amount: number): string {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: this.currency,
    }).format(amount / 100);
  }
}
