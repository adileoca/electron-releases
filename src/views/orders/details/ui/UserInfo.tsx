import MiniTable from "../../../../components/ui/MiniTable";
import InfoCard from "./InfoCard";

const UserInfo = ({ order }) => {
  return (
    <InfoCard
      title="Customer Information"
      button={{ onClick: () => {}, label: "View details" }}
    >
      <MiniTable
        title="Contact info"
        data={{
          name: order.name,
          email: order.email,
          phone: order.phone,
        }}
      />
      <MiniTable
        title="Customer analytics"
        data={{
          "Logged In": order.name,
          Problematic: order.shipping_address?.state!,
          Revenues: order.shipping_address?.state!,
          "No. of orders": order.shipping_address?.line_1!,
        }}
      />
    </InfoCard>
  );
};

export default UserInfo;
