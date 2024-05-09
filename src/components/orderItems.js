import { PencilSquareIcon } from "@heroicons/react/20/solid";

import Button from "./button";

const OrderItems = ({ items }) => (
  <div>
    <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-3">
      <h2 className="text-xl font-semibold">Produse</h2>
      <Button Icon={PencilSquareIcon} label="Editeaza" />
    </div>
    <div>
      {items.map((item, index) => (
        <li key={index} className="flex">
          <div className="h-40 w-40 overflow-hidden rounded-2xl">
            <img src={item.thumbnail} alt="" />
          </div>
          <div className="relative ml-6 flex flex-1 flex-col justify-between">
            <div className="grid grid-cols-2 justify-between">
              <div className="space-y-1 pr-6">
                <span className="inline-flex font-semibold text-neutral-900 hover:text-blue-600 hover:underline">
                  {item.name}
                </span>
                <LineItem label="Orientation" value={item.orientation} />
                <LineItem
                  label="Size"
                  value={`${item.size.width_cm} x ${item.size.height_cm} cm`}
                />
                <LineItem label="AI" value={item.restoration} />
                {/* <LineItem label="Fundal" value={item.background} /> */}
                <LineItem label="Previzualizare" value={item.preview} />
                <LineItem label="Detalii" value={item.details} />
              </div>

              <div className=" flex flex-col justify-start">
                <span className="text-right text-xl font-semibold text-neutral-900">
                  {`${item.amount_total} ${item.currency}`}
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  </div>
);

const LineItem = ({ label, value }) => {
  return (
    <>
      {value && (
        <div className="flex items-center text-neutral-900">
          <span className="font-semibold">{label}:&nbsp;</span>
          <span>{value}</span>
        </div>
      )}
    </>
  );
};

export default OrderItems;
