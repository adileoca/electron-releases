import { useEffect, useState } from "react";

import { OrderDetailedType } from "@/lib/supabase/database";
import { ActivityItem } from "@/components/ui/ActivityFeed";
import { useDatabase } from "@/lib/supabase/context";
import { DbTables, TableLog } from "@/lib/supabase/database";

type TaskTypes = Exclude<DbTables["tasks"]["Row"]["type"], null>;
type ItemsTableLogs = TableLog<DbTables["order_items"]["Row"]>[];
type TaskTableLogs = TableLog<DbTables["tasks"]["Row"]>[];
type UserProfiles = { [user_id: string]: DbTables["user_profiles"]["Row"] };

const taskTypeLabels: Record<TaskTypes, string> = {
  edit: "editare",
  print: "printare",
};

export const useItemActivity = (item: OrderDetailedType["items"][0]) => {
  const [activities, setActivities] = useState<ActivityItem[] | null>(null);
  const [itemLogs, setItemLogs] = useState<ItemsTableLogs>();
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();
  const [taskLogs, setTaskLogs] = useState<TaskTableLogs[]>();
  const { db } = useDatabase();

  useEffect(() => {
    const fetchData = async () => {
      const itemLogs = (await db.getTableLogs([item.id])) as ItemsTableLogs;
      setItemLogs(itemLogs);

      const tasksLogs = (await Promise.all(
        item.tasks.map((task) => db.getTableLogs([task.id]))
      )) as TaskTableLogs[];
      setTaskLogs(tasksLogs);

      const userIds = new Set(
        tasksLogs
          .flat() // flatten the logs arrays
          .flatMap(({ new_record, old_record }) => [new_record, old_record])
          .filter((record) => record?.user_id)
          .map((record) => record!.user_id!)
      );
      console.log("userIds", userIds);

      const userProfilesData = await db.getUserProfile({
        ids: Array.from(userIds),
      });

      const userProfiles = Object.fromEntries(
        userProfilesData.map((user) => [user.id, user])
      ) as UserProfiles;

      setUserProfiles(userProfiles);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("tasksLogs", taskLogs);
  // }, [taskLogs]);

  // useEffect(() => {
  //   console.log("itemLogs", itemLogs);
  // }, [itemLogs]);

  useEffect(() => {
    console.log("userProfiles", userProfiles);
  }, [userProfiles]);

  useEffect(() => {
    if (!itemLogs || !userProfiles) return;

    let activities: ActivityItem[] = [
      {
        id: "1",
        date: item.created_at!,
        Content: <div>Produsul a fost creeat.</div>,
        Details: <div>caca</div>,
        type: "positive",
        category: "general",
      },
      // {
      //   id: "2",
      //   date: item.tasks[0].created_at!,
      //   Content: <div>Clientul a sunat, vrea sa stie cand ajunge comanda.</div>,
      //   Details: (
      //     <div className="mb-4 mt-2 flex flex-col space-y-4">
      //       <div className="flex flex-col">
      //         <h1 className="font-semibold text-white/80">Summary</h1>
      //         <p className="mt-2 text-white/60">
      //           Hello. Do you want to buy a ceramic picture? No. Maybe six by
      //           nine. We can make it for you specially. Just know that it will
      //           take like two, three weeks more to deliver it to you.
      //         </p>
      //       </div>
      //       <div className="pt-2">
      //         {/* <MiniTable
      //           title="Sentiment analysis"
      //           data={{ Positive: "8", Negative: "1" }}
      //         /> */}
      //       </div>
      //       {/* <Button onClick={() => {}}>View full transcript</Button> */}
      //       <p></p>
      //     </div>
      //   ),
      //   type: "monitor",
      //   category: "general",
      // },
    ];
    item.tasks.forEach((task, idx) => {
      activities.push({
        id: `task.id-${idx}`,
        date: task.created_at!,
        Content: (
          <div>
            Sarcinǎ {taskTypeLabels[task.type]} creeatǎ de{" "}
            {userProfiles[task.user_id!]?.name || "sistem"}.
          </div>
        ),
        Details: <div>Detalii</div>,
        type: "positive",
        category: "general",
      });

    });

    activities.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setActivities(activities);
  }, [itemLogs, userProfiles]);

  return activities;
};
