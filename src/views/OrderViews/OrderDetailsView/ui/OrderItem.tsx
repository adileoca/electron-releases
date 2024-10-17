import { parseConfigurationDetails } from "@/utils/parse";
import { OrderItemType } from "@/lib/supabase/database";
import { CurrencyFormatter } from "@/utils/format";

const OrderItem: React.FC<{ item: OrderItemType }> = ({ item }) => {
  const formatter = new CurrencyFormatter(item.totals?.currency!);
  return (
    <li className="flex flex-col py-3 md:flex-row">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-lg bg-neutral-200 md:h-40 md:w-40">
        <img
          src={item.configuration!.thumbnail_url!}
          className="z-30 mx-auto scale-105 bg-neutral-200 "
          alt=""
        />
      </div>
      <div className="relative mt-2 flex flex-1 justify-between md:ml-5 md:mt-0">
        <div className="md:pr-6">
          <div className="flex items-center justify-between">
            <span className="flex text-lg font-medium text-neutral-900 transition md:pb-2 dark:text-neutral-300">
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
        <div>
          <span className="text-white/80">
            {item.quantity} x {formatter.format(item.totals?.amount_total!)}
          </span>
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
