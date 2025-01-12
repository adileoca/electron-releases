import { useParams } from "react-router-dom";

import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import ViewShell from "@/components/ViewShell";
import LoadingBody from "@/components/ui/LoadingBody";
import ViewBody from "./ViewBody";
import ViewHeader from "./ViewHeader";

const OrderDetailsView: React.FC = () => {
  const { db } = useDatabase();

  const { order_id } = useParams<{ order_id: string }>();
  const response = useFetchData(db.get.order.detailed.byId(order_id!));

  if (response?.error) {
    return <div>{JSON.stringify(response.error)}</div>;
  }

  const header = response?.data ? <ViewHeader order={response.data} /> : null;
  const body = response?.data ? (
    <ViewBody order={response.data} />
  ) : (
    <LoadingBody />
  );
  return <ViewShell header={header}>{body}</ViewShell>;
};

export default OrderDetailsView;
