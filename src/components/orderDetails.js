import {
  PencilSquareIcon,
  TruckIcon,
  DocumentTextIcon,
} from "@heroicons/react/20/solid";
import { AddressTable } from "./addressTable";
import Button from "./button";

const OrderDetails = ({ shippingAddress, billingAddress }) => (
  <div>
    <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-3">
      <h2 className="text-xl font-medium">Detalii</h2>
      <div className="flex space-x-3">
        <Button Icon={TruckIcon} label="AWB" />
        <Button Icon={DocumentTextIcon} label="Factura" />
        <Button Icon={PencilSquareIcon} label="Editeaza" />
      </div>
    </div>
    <div className="flex justify-between">
      <div className="w-2/5">
        <AddressTable
          label="LIVRARE"
          lastName={shippingAddress.last_name}
          firstName={shippingAddress.first_name}
          address={shippingAddress.address}
          zipCode={shippingAddress.zip_code}
          city={shippingAddress.city}
          country={shippingAddress.country}
        />
      </div>
      <div className="w-2/5">
        <AddressTable
          label="FACTURARE"
          lastName={billingAddress.last_name}
          firstName={billingAddress.first_name}
          address={billingAddress.address}
          zipCode={billingAddress.zip_code}
          city={billingAddress.city}
          country={billingAddress.country}
        />
      </div>
    </div>
  </div>
);

export default OrderDetails;
