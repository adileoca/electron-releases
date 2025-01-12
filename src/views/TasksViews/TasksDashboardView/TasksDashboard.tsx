import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { Dispatch, SetStateAction, useEffect } from "react";
import LoadingBody from "@/components/ui/LoadingBody";

import { OrderDetailedType } from "@/lib/supabase/database";
import TaskCard from "./ui/TaskCard";

const TasksDashboard = () => {
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
        {false ? <LoadingBody /> : <CurrentTasks />}
      </div>
    </div>
  );
};

const CurrentTasks = () => {
  return (
    <div className="space-y-8 p-4 pb-16">
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-white/80">Pending</h1>
        <div className="grid grid-cols-3 gap-4">
          {Array(6)
            .fill({})
            .map((idx) => (
              <TaskCard />
            ))}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-white/80">In Progress</h1>
        <div className="grid grid-cols-3 gap-4">
          {Array(3)
            .fill({})
            .map((idx) => (
              <TaskCard />
            ))}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-white/80">Completed</h1>
        <div className="grid grid-cols-3 gap-4">
          {Array(9)
            .fill({})
            .map((idx) => (
              <TaskCard />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TasksDashboard;
