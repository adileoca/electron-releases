import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { Dispatch, SetStateAction, useEffect } from "react";
import LoadingBody from "@/components/ui/LoadingBody";
import { OrderHeaderArgs } from "@/types/misc";
import { OrderDetailedType } from "@/lib/supabase/database";

const Dashboard = () => {
  // const db = useDatabase();
  // const { data: order, error } = useFetchData(() =>
  //   db.get.order.detailed.byId(orderId)
  // );

  // useEffect(() => {
  //   console.log("order", order);
  //   setHeaderDetails({
  //     orderNo: order?.display_name!,
  //     lastUpdated: order?.last_updated!,
  //     status: {
  //       name: order?.status!.name!,
  //       timestamp: order?.status!.timestamp!,
  //     },
  //   });
  // }, [order]);

  // if (error) {
  //   return <div>{JSON.stringify(error)}</div>;
  // }

  return (
    <div
      style={{ width: "calc(100% - 192px)" }}
      className="fixed right-0 top-12 h-screen overflow-hidden"
    >
      <div className="relative h-full w-full overflow-y-auto bg-white dark:bg-neutral-900/90">
        {true ? <LoadingBody /> : <div>...</div>}
      </div>
    </div>
  );
};

export default Dashboard;
