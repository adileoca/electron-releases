import { useNavigate } from "react-router-dom";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import ViewHeaderDivider from "@/components/ViewHeader/Divider";
import { capitalizeFirstLetter, formatDate } from "@/utils/format";
import ViewHeaderInfo from "@/components/ViewHeader/Info";
import { useEffect } from "react";

type ViewHeaderProps = {
  orderNo: string;
  statusName: string;
  statusTimestamp?: string;
  lastUpdated: string;
};

const ViewHeader: React.FC<ViewHeaderProps> = ({
  orderNo,
  statusName,
  statusTimestamp,
  lastUpdated,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("lastUpdated", lastUpdated);
  }, [lastUpdated]);
  return (
    <div style={{ width: "calc(100% - 240px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="pl-2">
          <div className="flex items-center">
            <ViewHeaderBackButton onClick={() => navigate("/orders/")} />
            <ViewHeaderDivider />
            <ViewHeaderTitle title="Order" info={`#${orderNo}`} />
            <div className="ml-2 flex items-center">
              <StatusBadge text={statusName} />
            </div>
            <div className="ml-3 flex space-x-2">
              {/* <ViewHeaderButton label="Search" Icon={Search} />
            <ViewHeaderButton label="Filters" Icon={Filter} />
            <ViewHeaderButton label="Settings" Icon={Settings} /> */}
            </div>
          </div>
        </div>
        <div className="mr-3 text-base text-white text-opacity-80">
          <ViewHeaderInfo
            info={`Last updated ${formatDate(lastUpdated, { relative: true })}`}
          />
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;

const StatusBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-amber-600 px-2.5 py-0.5 text-sm font-medium text-amber-100">
    {capitalizeFirstLetter(text)}
  </span>
);
