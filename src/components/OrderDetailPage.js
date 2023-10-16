import { useAuth0 } from "@auth0/auth0-react";

import OrderTimeline from "./orderTimeline";
import OrderDetails from "./orderDetails";
import OrderHeader from "./orderHeader";
import OrderItems from "./orderItems";

const OrderDetailPage = ({ selectedOrder, setSelectedOrder }) => {
  const auth0 = useAuth0();
  return (
    <div className="space-y-16">
      <OrderHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
      <OrderDetails
        billingAddress={selectedOrder.billing_address}
        shippingAddress={selectedOrder.shipping_address}
      />
      <OrderItems items={selectedOrder.items} />
      <OrderTimeline userSrc={auth0.user.picture} />
    </div>
  );
};
export default OrderDetailPage;
