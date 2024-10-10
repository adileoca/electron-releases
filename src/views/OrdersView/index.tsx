import React, { useState } from "react";

import { AllOrdersView } from "./AllOrdersView";
import OrderDetailsView from "./OrderDetailsView";
const OrdersView: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  return (
    <>
      {selectedOrderId ? (
        <OrderDetailsView
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
      ) : (
        <AllOrdersView setSelectedOrder={setSelectedOrderId} />
      )}
    </>
  );
};

export default OrdersView;
