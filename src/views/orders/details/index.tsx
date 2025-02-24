import { useParams } from "react-router-dom";

import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";

import LoadingBody from "@/components/ui/LoadingBody";
import ViewShell from "@/components/ViewShell";

import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";

const OrderDetailsView: React.FC = () => {
  const { db } = useDatabase();

  const { order_id } = useParams<{ order_id: string }>();
  const response = useFetchData(db.get.order.detailed.byId(order_id!));

  if (response?.error) {
    return <div>{JSON.stringify(response.error)}</div>;
  }

  const body = response?.data ? (
    <ViewBody order={response.data} />
  ) : (
    <LoadingBody />
  );
  return (
    <ViewShell header={<ViewHeader order={response?.data} />}>{body}</ViewShell>
  );
};

export default OrderDetailsView;
