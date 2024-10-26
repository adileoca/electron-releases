import { capitalizeFirstLetter } from "@/utils/format";

const OrderStatusBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-amber-600 px-2.5 py-0.5 text-sm font-medium text-amber-50">
    {capitalizeFirstLetter(text)}
  </span>
);

export default OrderStatusBadge;
