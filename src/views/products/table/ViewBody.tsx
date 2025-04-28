import ViewShell from "@/components/ViewShell";

import { useProductsTableContext } from "./context";
import ViewHeader from "./ViewHeader";
import UploadButton from "./ui/UploadButton";
import LoadingBody from "./ui/LoadingBody";
import TableHeader from "./ui/TableHeader";
import TableBody from "./ui/TableBody";

const ViewBody = () => {
  const {
    state: { loading, cols, rows },
    actions: { setColWidth },
  } = useProductsTableContext();

  return (
    <ViewShell header={<ViewHeader />}>
      <div className="relative h-full overflow-auto">
        {loading ? (
          <LoadingBody />
        ) : (
          <table>
            <TableHeader cols={cols} setColWidth={setColWidth} />
            <TableBody rows={rows} cols={cols} />
          </table>
        )}
      </div>
    </ViewShell>
  );
};

export default ViewBody;
