import MiniTable from "../../../../components/ui/MiniTable";
import InfoCard from "./InfoCard";

const UserInfo = ({ order }) => {
  return (
    <InfoCard
      title="Customer Information"
      button={{ onClick: () => {}, label: "Vezi analitice" }}
    >
      <MiniTable
        title="Contact"
        data={{
          name: order.name,
          email: order.email,
          phone: order.phone,
        }}
      />
      <MiniTable
        title="Analitice"
        data={{
          Autentificat: "Fals",
          Sursǎ: "Fals",
          Problematic: order.shipping_address?.state!,
          Revenues: order.shipping_address?.state!,
          "No. of orders": order.shipping_address?.line_1!,
        }}
      />
    </InfoCard>
  );
};

export default UserInfo;
