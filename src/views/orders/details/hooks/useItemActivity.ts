import { useEffect, useState } from "react";

import { OrderDetailedType } from "@/lib/supabase/database";
import { ActivityItem } from "@/components/ui/ActivityFeed";
import { useDatabase } from "@/lib/supabase/context";
import { DbTables } from "@/lib/supabase/database";

type TaskTypes = Exclude<DbTables["tasks"]["Row"]["type"], null>;

const taskTypeLabels: Record<TaskTypes, string> = {
  edit: "editare",
  print: "printare",
};

export const useItemActivity = (item: OrderDetailedType["items"][0]) => {
  const [itemActivity, setItemActivity] = useState<ActivityItem[]>([]);
  const { db } = useDatabase();

  useEffect(() => {
    const fetchTableLogs = async (recordIds: string[]) => {
      const tableLogs = await db.getTableLogs(recordIds);
    };
  }, []);

  // const taskActivities: ActivityItem[] = item.tasks.map((task, idx) => ({
  //   date: task.updated_at!,
  //   description: `Sarcina de ${taskTypeLabels[task.type!]} ${
  //     task.id.split("-")[1]
  //   }   a fost creeata.`,
  //   type: "positive",
  // }));

  return [];
};
