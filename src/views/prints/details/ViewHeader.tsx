import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import { Print } from "./types";

const ViewHeader: React.FC<{ print?: Print }> = ({ print }) => {
  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          {print?.id && (
            <ViewHeaderTitle title="" info={`Print #${print.id}`} />
          )}
          <div className="ml-5 flex items-center">
            {typeof print?.printed === "boolean" && (
              <OrderStatusBadge
                color={print.printed ? "green" : "amber"}
                text={print.printed ? "Printat" : "Neprintat"}
              />
            )}
          </div>
          {/* <div className="ml-5 flex items-center">
            {order?.status?.name! && (
              <OrderStatusBadge color="amber" text={order.status?.name!} />
            )}
          </div> */}
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
