import { useNavigate } from "react-router-dom";

import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ViewHeaderDivider from "@/components/ViewHeader/Divider";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderInfo from "@/components/ViewHeader/Info";
import { OrderDetailedType } from "@/lib/supabase/database";
import { formatDate } from "@/lib/utils/format";
import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
const ViewHeader: React.FC<{ order: OrderDetailedType | undefined }> = ({
  order,
}) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          {order?.display_name && (
            <ViewHeaderTitle title="" info={`Comanda #${order.display_name}`} />
          )}
          <div className="ml-4 flex items-center">
            {order?.status?.name! && (
              <OrderStatusBadge color="amber" text={order.status?.name!} />
            )}
          </div>
        </div>
        <div className="mr-2 text-base text-white text-opacity-80">
          {order?.last_updated! && (
            <ViewHeaderInfo
              info={`Ultima actualizare ${formatDate(order.last_updated!, {
                relative: true,
                locale: "ro",
              })}`}
            />
          )}
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
