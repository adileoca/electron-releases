import MiniTable from "./MiniTable";
import InfoCard from "./InfoCard";

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

export default UserInfo;
