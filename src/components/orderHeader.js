import { ClipboardIcon, ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

import { formatDate } from "../utils/format";
import Button from "./button";

const OrderHeader = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <div>
      <div className="border-b border-neutral-200 pb-2.5">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-neutral-600">COMANDA</h1>
          <button className="flex items-center rounded px-1 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 hover:text-neutral-700">
            {selectedOrder.stripe_checkout_session_id}
            <ClipboardIcon className="h-3 pl-2" />
          </button>
        </div>
        <div className="flex items-center justify-between pt-2">
          <h1 className="text-2xl font-medium">{selectedOrder.id}</h1>
          <div className="flex justify-end">
            <Button
              onClick={() => setSelectedOrder(null)}
              Icon={ArrowUturnLeftIcon}
              label="Inapoi"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-2.5">
        <div>
          <h2 className="text-sm font-medium text-neutral-600">CREATED AT</h2>
          <span className="font-medium">
            {formatDate(selectedOrder.created_at)}
          </span>
        </div>
        <div>
          <h2 className="text-sm font-medium text-neutral-600">METODA PLATA</h2>
          <span className="font-medium">
            {/* {selectedOrder.payment_method_details.type} */}
          </span>
        </div>
        <div>
          <h2 className="text-sm font-medium text-neutral-600">STATUS</h2>
          <span className="font-medium">{selectedOrder.status}</span>
        </div>
        <div>
          <h2 className="text-sm font-medium text-neutral-600">LAST UPDATE</h2>
          <span className="font-medium">
            {formatDate(selectedOrder.status_updated)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
