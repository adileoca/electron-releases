import MiniTable from "../../../../components/ui/MiniTable";
import InfoCard from "./InfoCard";

const ShippingCard = ({ order }) => {
  return (
    <InfoCard title="Shipping Information" button={{ label: "View tracking" }}>
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
          "Label No.": "-",
        }}
      />
    </InfoCard>
  );
};

export default ShippingCard;
