import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";

import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import ViewHeaderTitle from "@/components/ViewHeader/Title";

const ViewHeader: React.FC<{}> = () => {
  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          <ViewHeaderTitle title="Setǎri" />
        </div>
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
