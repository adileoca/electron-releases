import { useState, useEffect } from "react";

import { ActivityItem } from "@/components/ui/ActivityFeed";
import { Print } from "@/lib/supabase/database";
import { useDatabase } from "@/lib/supabase/context";

export const usePrintActivity = (print: Print) => {
  const [itemActivity, setItemActivity] = useState<ActivityItem[]>([]);
  const { db } = useDatabase();

  useEffect(() => {
    const fetchTableLogs = async (recordIds: string[]) => {
      const tableLogs = await db.getTableLogs([print.id]);
    };
  }, []);

  // const taskActivities: ActivityItem[] = print.tasks.map((task, idx) => ({
  //   date: task.updated_at!,
  //   description: `Sarcina de ${taskTypeLabels[task.type!]} ${
  //     task.id.split("-")[1]
  //   }   a fost creeata.`,
  //   type: "positive",
  // }));

  // return taskActivities;
};
