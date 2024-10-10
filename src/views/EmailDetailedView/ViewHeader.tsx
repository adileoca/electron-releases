import ViewHeaderPagination from "@/components/ViewHeader/Pagination";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderBackButton from "@/components/ViewHeader/BackButton";
import { useNavigate } from "react-router-dom";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import { ChevronsUpDown } from "lucide-react";
const ViewHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <ViewHeaderWrapper>
      <div className="pl-2">
        <div className="flex items-center">
          <ViewHeaderBackButton onClick={() => navigate("/emails")} />
          <Divider />
          <ViewHeaderTitle title={title} />
        </div>
      </div>
      <div className="mr-3 text-base text-white text-opacity-80">
        <ViewHeaderButton label="Extend" Icon={ChevronsUpDown} />
      </div>
    </ViewHeaderWrapper>
  );
};

export default ViewHeader;

const Divider = () => (
  <div className="mx-2 h-5 w-px bg-neutral-900 bg-opacity-20 dark:bg-white dark:bg-opacity-20" />
);
