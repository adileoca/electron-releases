import { parseConfigurationDetails } from "@/utils/parse";
import { OrderItemType } from "@/lib/supabase/database";

const OrderItem: React.FC<{ item: OrderItemType }> = ({ item }) => {
  return (
    <li className="flex flex-col md:flex-row">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-lg bg-neutral-200 md:h-40 md:w-40">
        <img
          src={item.configuration!.thumbnail_url!}
          className="z-30 mx-auto scale-105 bg-neutral-200 "
          alt=""
        />
      </div>
      <div className="relative mt-2 flex flex-1 flex-col justify-between md:ml-6 md:mt-0">
        <div className="order-2 md:order-1 md:pr-6">
          <div className="flex items-center justify-between">
            <span className="flex text-lg font-medium text-neutral-900 transition hover:text-blue-600 md:pb-2 dark:text-neutral-300">
              {item.product?.name}
            </span>
          </div>
          {item.configuration &&
            parseConfigurationDetails(item.configuration).map((detail, idx) => (
              <div key={idx}>
                <RowDetails label={detail.label} value={detail.value} />
              </div>
            ))}
        </div>
      </div>
    </li>
  );
};

export default OrderItem;

const RowDetails = ({ label, value }) => (
  <div>
    {value && (
      <div className="inline pb-1 text-neutral-900 dark:text-neutral-200">
        <span className="whitespace-nowrap font-medium">{label}:&nbsp;</span>
        <span className="text-left">{value}</span>
      </div>
    )}
  </div>
);
