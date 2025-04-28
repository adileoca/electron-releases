import ViewHeaderNavigation from "@/components/ViewHeader/Navigation";
import ViewHeaderWrapper from "@/components/ViewHeader/Wrapper";
import ViewHeaderTitle from "@/components/ViewHeader/Title";
import ViewHeaderButton from "@/components/ViewHeader/Button";
import { PlusIcon } from "@heroicons/react/16/solid";

const ViewHeader: React.FC<{}> = () => {
  return (
    <div style={{ width: "calc(100% - 192px)" }} className="fixed right-0">
      <ViewHeaderWrapper>
        <div className="flex items-center">
          <ViewHeaderNavigation />
          <ViewHeaderTitle title="Produse" />
          <div className="ml-2 flex items-center space-x-1">
            <ViewHeaderButton
              label="Adaugǎ produs"
              Icon={PlusIcon}
              IconSize={16}
            />
            {/* <ViewHeaderButton label="Filtreazǎ" Icon={Filter} /> */}
          </div>
          <div className="ml-3 flex space-x-2"></div>
        </div>

        {/* <div className="mr-2 text-base text-white text-opacity-80">
          <ViewHeaderPagination />
        </div> */}
      </ViewHeaderWrapper>
    </div>
  );
};
export default ViewHeader;
