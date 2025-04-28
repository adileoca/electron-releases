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
import { Product } from "./queries";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import { PlusIcon } from "@heroicons/react/16/solid";
const ViewHeader: React.FC<{ product: Product | undefined }> = ({
  product,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          {product?.name && (
            <ViewHeaderTitle title="" info={`${product.name}`} />
          )}
        </div>
        <div className="mr-2 flex items-center text-base text-white text-opacity-80">
          <ViewHeaderButton
            label="Vezi dimensiuni"
            Icon={PlusIcon}
            IconSize={16}
          />
             <ViewHeaderButton
            label="Vezi denumiri"
            Icon={PlusIcon}
            IconSize={16}
          />
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
