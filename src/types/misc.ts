export type OrderHeaderArgs = {
  orderNo: string;
  status: {
    name: string;
    timestamp: string | undefined;
  };
  lastUpdated: string;
};
