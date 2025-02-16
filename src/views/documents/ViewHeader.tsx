import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";

import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";

const ViewHeader: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          {/* <ViewHeaderBackButton onClick={() => navigate("/orders/")} />
            <ViewHeaderDivider /> */}
          <ViewHeaderTitle title="Documente" />
          <div className="ml-2 flex items-center">
            {/* <OrderStatusBadge text={statusName} /> */}
            <ViewHeaderButton label="Cautǎ" Icon={Search} />
            <ViewHeaderButton label="Filtreazǎ" Icon={Filter} />
          </div>
          <div className="ml-3 flex space-x-2"></div>
        </div>

        <div className="mr-2 text-base text-white text-opacity-80">
          <ViewHeaderPagination />
          {/* <ViewHeaderInfo
            info={`Last updated ${formatDate(lastUpdated, { relative: true })}`}
          /> */}
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
