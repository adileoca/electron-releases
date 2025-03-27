import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EllipsisVerticalIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ViewHeaderDivider from "@/components/ViewHeader/Divider";
import OptionsMenu from "@/components/ViewHeader/OptionsMenu";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderInfo from "@/components/ViewHeader/Info";
import { OrderDetailedType } from "@/lib/supabase/database";
import { formatDate } from "@/lib/utils/format";
import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import SelectMenu from "@/components/ViewHeader/SelectMenu";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const ViewHeader: React.FC<{ order: OrderDetailedType | undefined }> = ({
  order,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          {order?.display_name && (
            <ViewHeaderTitle title="" info={`Comanda #${order.display_name}`} />
          )}
          <div className="ml-5 flex items-center">
            {order?.status?.name! && (
              <OrderStatusBadge color="amber" text={order.status?.name!} />
            )}
          </div>
        </div>
        <div className="mr-2 flex items-center text-base text-white text-opacity-80">
          {/* {order?.last_updated! && (
            <ViewHeaderInfo
              info={`Ultima actualizare ${formatDate(order.last_updated!, {
                relative: true,
                locale: "ro",
              })}`}
            />
          )} */}
          {/* <SelectMenu /> */}

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center p-2"
          >
            <BellIcon className="size-5 dark:text-white/80 dark:hover:text-white" />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center p-2"
          >
            <EllipsisVerticalIcon className="size-5 dark:text-white/80 dark:hover:text-white" />
          </button>
          {/* <OptionsMenu /> */}
        </div>
      </ViewHeaderWrapper>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/50 p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-lg border bg-white p-8">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
export default ViewHeader;
