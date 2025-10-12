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
  const hasResults = Boolean(data?.results?.length);
  const showSpinner = !isInitialLoading && !hasResults && updating;

  return (
    <ViewShell header={<ViewHeader />}>
      <div className="relative h-full overflow-auto">
        {isInitialLoading ? (
          <LoadingBody />
        ) : (
          <div className="pb-12">
            {showSpinner ? (
              <LoadingBody />
            ) : (
              <div className="mb-12 grid grid-cols-3 gap-1 overflow-hidden p-1 z-0">
                {hasResults ? (
                  data.results.map((print) => (
                    <div key={print.id}>
                      <PrintCard print={print} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 flex items-center justify-center py-12 text-sm text-neutral-400">
                    Nu există rezultate pentru această pagină.
                  </div>
                )}
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
