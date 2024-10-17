import { useLocation } from "react-router-dom";
import React, { useState } from "react";

import { OrderHeaderArgs } from "@/types/misc";
import OrderDetails from "./OrderDetails";
import ViewHeader from "./ViewHeader";

const getSearchParams = (): {
  orderId: string;
  headerArgs: OrderHeaderArgs;
} => {
  const params = new URLSearchParams(useLocation().search);
  console.log(
    "last_updated",
    params.get("last_updated")!.replace(/\+/g, "%2B")
  );
  return {
    orderId: params.get("order_id")!,
    headerArgs: {
      orderNo: params.get("order_no")!,
      status: { name: params.get("order_status")!, timestamp: undefined },
      lastUpdated: params.get("last_updated")!.replace(/%2B/g, "+"),
    },
  };
};

const OrderDetailsView: React.FC = () => {
  const {
    orderId,
    headerArgs: { orderNo, status, lastUpdated },
  } = getSearchParams();
  const [headerDetails, setHeaderDetails] = useState<OrderHeaderArgs>({
    orderNo,
    status,
    lastUpdated,
  });

  return (
    <>
      <ViewHeader
        orderNo={orderNo || headerDetails.orderNo}
        statusName={status.name || headerDetails.status.name}
        statusTimestamp={status.timestamp || headerDetails.status.timestamp}
        lastUpdated={lastUpdated || headerDetails.lastUpdated}
      />
      <OrderDetails orderId={orderId} setHeaderDetails={setHeaderDetails} />
    </>
  );
};

export default OrderDetailsView;
