import MiniTable from "../../../../components/ui/MiniTable";
import InfoCard from "./InfoCard";

const ShippingCard = ({ order }) => {
  return (
    <InfoCard
      title="Shipping Information"
      button={{
        onClick: () => {},
        label: "Urmǎrire colet",
      }}
    >
      <MiniTable
        title="Adresa de livrare"
        data={{
          Țarǎ: order.shipping_address?.country!,
          Regiune: order.shipping_address?.state!,
          Oraș: order.shipping_address?.city!,
          "Linie 1": order.shipping_address?.line_1!,
          "Linie 2": order.shipping_address?.line_2!,
          "Cod Poştal": order.shipping_address?.postal_code!,
        }}
      />

      <MiniTable
        title="Curier"
        data={{
          Denumire: "UPS",
          AWB: "-",
        }}
      />
    </InfoCard>
  );
};

export default ShippingCard;
