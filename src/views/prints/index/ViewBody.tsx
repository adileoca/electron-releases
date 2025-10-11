import LoadingBody from "@/components/ui/LoadingBody";
import ViewShell from "@/components/ViewShell";

import { usePrintsDisplayContext } from "./context";
import PrintCard from "./ui/PrintCard";
import ViewHeader from "./ViewHeader";
import Pagination from "./ui/Pagination";

const ViewBody = () => {
  const {
    data,
    state: { updating },
  } = usePrintsDisplayContext();

  const isInitialLoading = !data;

  return (
    <ViewShell header={<ViewHeader />}>
      <div className="relative h-full overflow-auto">
        {isInitialLoading ? (
          <LoadingBody />
        ) : (
          <div className="pb-12">
            {updating ? (
              <LoadingBody />
            ) : (
              <div className="mb-12 grid grid-cols-3 gap-1 overflow-hidden p-1 z-0">
                {data.results.map((print, idx) => (
                  <div key={idx}>
                    <PrintCard print={print} />
                  </div>
                ))}
              </div>
            )}
            <Pagination />
          </div>
        )}
      </div>
    </ViewShell>
  );
};

export default ViewBody;
