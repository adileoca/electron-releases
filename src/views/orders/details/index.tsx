import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDatabase, useSupabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { Order } from "@/lib/supabase/types";
import LoadingBody from "@/components/ui/LoadingBody";
import ViewShell from "@/components/ViewShell";
import { getOrderById } from "@/lib/supabase/queries";
import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";

const OrderDetailsView: React.FC = () => {
  const [data, setData] = useState<Order>();
  const { supabase } = useSupabase();
  const { order_id } = useParams<{ order_id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getOrderById(supabase, order_id!);
      if (error) {
        console.error("Unexpected error: ", error);
      }
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <ViewShell header={<ViewHeader order={data} />}>
      {data ? <ViewBody order={data} /> : <LoadingBody />}
    </ViewShell>
  );
};

export default OrderDetailsView;
