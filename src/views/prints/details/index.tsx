import { useParams } from "react-router-dom";

import LoadingBody from "@/components/ui/LoadingBody";
import ViewShell from "@/components/ViewShell";

import { usePrintDetailsData } from "./hooks/usePrintDetailsData";
import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";

type Params = { print_id: string };
const PrintDetailsView: React.FC = () => {
  const { print_id } = useParams<Params>();
  if (!print_id) {
    return <div>No print id</div>;
  }

  const data = usePrintDetailsData(print_id);
  return (
    <ViewShell header={<ViewHeader print={data} />} loading={!data}>
      {data ? <ViewBody print={data} /> : <LoadingBody />}
    </ViewShell>
  );
};

export default PrintDetailsView;
