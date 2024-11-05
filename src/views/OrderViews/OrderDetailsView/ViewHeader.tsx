import { useNavigate } from "react-router-dom";

import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import ViewHeaderDivider from "@/components/ViewHeader/Divider";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderInfo from "@/components/ViewHeader/Info";

import { formatDate } from "@/utils/format";

const ViewHeader: React.FC<{
  orderNo: string;
  statusName: string;
  statusTimestamp?: string;
  lastUpdated: string;
}> = ({ orderNo, statusName, statusTimestamp, lastUpdated }) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="ml-0.5">
          <div className="flex items-center">
            <ViewHeaderBackButton onClick={() => navigate("/orders/")} />
            <ViewHeaderDivider />
            <ViewHeaderTitle title="Order" info={`#${orderNo}`} />
            <div className="ml-2 flex items-center">
              <OrderStatusBadge text={statusName} />
            </div>
            <div className="ml-3 flex space-x-2"></div>
          </div>
        </div>
        <div className="mr-2 text-base text-white text-opacity-80">
          <ViewHeaderInfo
            info={`Last updated ${formatDate(lastUpdated, { relative: true })}`}
          />
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
