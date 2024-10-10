import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import ViewBarWrapper from "@/components/ViewBarWrapper";
import ActivityFeed from "./ActivityFeed";
import { ChevronLeft, Pencil } from "lucide-react";
import { capitalizeFirstLetter } from "@/utils/format";
import OrderItem from "./OrderItem";

const OrderDetailsView: React.FC<{
  selectedOrderId: string;
  setSelectedOrderId: Dispatch<SetStateAction<string | null>>; // todo: just pass setSelectedOrderId(null)
}> = ({ selectedOrderId, setSelectedOrderId }) => {
  const db = useDatabase();
  const { data: order, error } = useFetchData(() =>
    db.get.order.detailed.byId(selectedOrderId)
  );

  useEffect(() => {
    console.log("orderData", order);
  }, [order]);

  if (order === undefined || order === null) {
    return <div>Loading Orders...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div
      style={{ width: "calc(100% - 240px)" }}
      className="fixed right-0 h-screen overflow-hidden"
    >
      <ViewBar order={order} setSelectedOrderId={setSelectedOrderId} />
      <div className="h-full w-full overflow-y-auto bg-white p-4 dark:bg-neutral-900 dark:bg-opacity-95">
        <Section title="General">
          <div className="grid grid-cols-3 gap-4">
            <UserInfo order={order} />
            <ShippingCard order={order} />
            <BillingCard order={order} />
          </div>
        </Section>
        <Section title="Activity Feed">
          <CardWrapper>
            <div className="p-3">
              <ActivityFeed />
            </div>
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
        <span>items (add item, remove item), totals</span>
        <span>history, user interactions (associated ips), timeline</span>
      </div>
    </div>
  );
};

export default OrderDetailsView;

interface MiniTableProps {
  title: string;
  data: { [key: string]: string };
}

const CardWrapper = ({ children }) => (
  <div className="h-full overflow-hidden rounded-lg border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-800 dark:bg-opacity-70">
    {children}
  </div>
);

const MiniTable: React.FC<MiniTableProps> = ({ title, data }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-medium text-neutral-300">{title}</h2>
        <button className="text-neutral-300 hover:text-blue-400">
          <Pencil strokeWidth={1.5} size={16} />
        </button>
      </div>
      <div className="divide-y divide-neutral-700">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-1.5">
            <span className="whitespace-nowrap text-neutral-400">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <span className="text-wrap text-right text-neutral-300">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-8 ">
    <div className="mb-4 flex justify-between">
      <h1 className="text-lg font-medium text-neutral-600 dark:text-neutral-300">
        {title}
      </h1>
    </div>
    {children}
  </section>
);

const ViewBar = ({ order, setSelectedOrderId }) => {
  return (
    <ViewBarWrapper>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center ">
          <button
            className="ml-3 flex items-center border-r pr-4 text-neutral-600 dark:border-neutral-300 dark:border-opacity-50 dark:text-white dark:text-opacity-80"
            onClick={() => setSelectedOrderId(null)}
          >
            <ChevronLeft size={20} strokeWidth={1.6} />
            Back
          </button>
          <div className="pl-4">
            <h1 className="text-lg font-medium text-neutral-600 dark:text-white dark:text-opacity-80">
              Order <span className="font-normal">#{order.display_name}</span>
            </h1>
          </div>
          <div className="ml-4 items-center rounded-md bg-neutral-100 px-2.5 py-0.5 text-sm capitalize text-neutral-600 ring-1 ring-neutral-200 dark:bg-blue-700 dark:text-blue-100 dark:ring-blue-600">
            {order.status!.name}
          </div>
        </div>
        <div className="mr-4 text-base text-white text-opacity-80">
          Last updated <span className="font-medium">7 hours ago</span>
        </div>
      </div>
    </ViewBarWrapper>
  );
};

const BillingCard = ({ order }) => {
  return (
    <InfoCard title="Billing Information" buttonLabel="View invoice">
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

const ShippingCard = ({ order }) => {
  return (
    <InfoCard title="Shipping Information" buttonLabel="View tracking">
      <MiniTable
        title="Address"
        data={{
          Country: order.shipping_address?.country!,
          State: order.shipping_address?.state!,
          "Line 1": order.shipping_address?.line_1!,
          "Line 2": order.shipping_address?.line_2!,
          "Zip Code": order.shipping_address?.postal_code!,
        }}
      />

      <MiniTable
        title="Carrier"
        data={{
          Name: "UPS",
          "Label No.": "1341312saffqdqwee1e",
        }}
      />
    </InfoCard>
  );
};

const UserInfo = ({ order }) => {
  return (
    <InfoCard title="Customer Information" buttonLabel="View details">
      <MiniTable
        title="Contact details"
        data={{
          name: order.name,
          email: order.email,
          phone: order.phone,
        }}
      />
      <MiniTable
        title="Interactions"
        data={{
          Guest: order.name,
          Revenue: order.shipping_address?.state!,
          "No. of orders": order.shipping_address?.line_1!,
        }}
      />
    </InfoCard>
  );
};

const InfoCard = ({ title, buttonLabel, onClick = () => {}, children }) => {
  return (
    <CardWrapper>
      <div className="flex h-full flex-col">
        <h2 className=" border-b border-neutral-600 bg-neutral-800/90 p-3 font-medium text-neutral-300">
          {title}
        </h2>
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-6 p-3">{children}</div>
          <div className="p-3 pt-0">
            <button
              onClick={onClick}
              className="w-full rounded border border-neutral-600 bg-neutral-700 py-1.5 transition dark:hover:bg-neutral-600"
            >
              <span className="text-neutral-200">{buttonLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};
