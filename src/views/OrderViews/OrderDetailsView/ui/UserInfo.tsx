import MiniTable from "./MiniTable";
import InfoCard from "./InfoCard";

const UserInfo = ({ order }) => {
  return (
    <InfoCard title="Customer Information" button={{ label: "View details" }}>
      <MiniTable
        title="Contact"
        data={{
          name: order.name,
          email: order.email,
          phone: order.phone,
        }}
      />
      <MiniTable
        title="Interactions"
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
