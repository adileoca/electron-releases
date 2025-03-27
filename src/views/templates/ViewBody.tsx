import ViewShell from "@/components/ViewShell";

import { useTemplatesTableContext } from "./context";
import ViewHeader from "./ViewHeader";

import LoadingBody from "./ui/LoadingBody";
import TableHeader from "./ui/TableHeader";
import TableBody from "./ui/TableBody";

const ViewBody = () => {
  const {
    state: { loading },
  } = useTemplatesTableContext();

  return (
    <ViewShell header={<ViewHeader />}>
      <div className="relative h-full overflow-auto">
        {loading ? (
          <LoadingBody />
        ) : (
          <table>
            <TableHeader />
            <TableBody />
          </table>
        )}
      </div>
    </ViewShell>
  );
};

export default ViewBody;
