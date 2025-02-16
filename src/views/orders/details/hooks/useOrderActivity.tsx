import { useState, useEffect } from "react";

import { OrderDetailedType } from "@/lib/supabase/database";
import { ActivityItem } from "@/components/ui/ActivityFeed";
import MiniTable from "@/components/ui/MiniTable";
import { useDatabase } from "@/lib/supabase/context";
import { DbTables } from "@/lib/supabase/database";
import Button from "@/components/ui/Button";
import LargeButton from "@/components/ui/LargeButton";

type TableLog<T> = Omit<
  DbTables["table_logs"]["Row"],
  "new_record" | "old_record" | "changes"
> & {
  new_record: T | null;
  old_record: T | null;
  changes: Partial<T>;
};

type OrderTableLogs = TableLog<DbTables["orders"]["Row"]>[];
type UserProfiles = { [user_id: string]: DbTables["user_profiles"]["Row"] };

export const useOrderActivity = (order: OrderDetailedType) => {
  const [itemActivity, setItemActivity] = useState<ActivityItem[] | null>(null);
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();
  const [orderLogs, setOrderLogs] = useState<OrderTableLogs>();
  const { db } = useDatabase();

  useEffect(() => {
    const fetchTableLogs = async () => {
      const tableLogs = (await db.getTableLogs([order.id])) as OrderTableLogs;
      console.log("tableLogs", tableLogs);
      setOrderLogs(tableLogs);

      // fetches the profiles of the users referenced in the main logs
      const userIds = tableLogs.reduce((acc, { new_record, old_record }) => {
        if (new_record?.user_id) acc.add(new_record.user_id);
        if (old_record?.user_id) acc.add(old_record.user_id);
        return acc;
      }, new Set<string>());

      const userProfilesArray = await db.getUserProfile({
        ids: Array.from(userIds),
      });

      const userProfiles = userProfilesArray.reduce((acc, user) => {
        return { ...acc, [user.id]: user };
      }, {} as UserProfiles);

      setUserProfiles(userProfiles);
    };

    fetchTableLogs();
  }, []);

  useEffect(() => {
    if (!orderLogs || !userProfiles) return;

    let activities: ActivityItem[] = [
      {
        id: "1",
        date: order.created_at!,
        Content: <div>Comanda a fost creeatǎ.</div>,
        Details: <div>caca</div>,
        type: "positive",
        category: "general",
      },
      {
        id: "2",
        date: new Date(new Date(order.created_at!).getTime() + 10000000).toISOString(),
        Content: <div>Clientul a sunat, vrea sa stie cand ajunge comanda.</div>,
        Details: (
          <div className="mb-4 mt-2 flex flex-col space-y-4">
            <div className="flex flex-col">
              <h1 className="font-semibold text-white/80">Summary</h1>
              <p className="mt-2 text-white/60">
                Hello. Do you want to buy a ceramic picture? No. Maybe six by
                nine. We can make it for you specially. Just know that it will
                take like two, three weeks more to deliver it to you.
              </p>
            </div>
            <div className="pt-2">
              <MiniTable
                title="Sentiment analysis"
                data={{ Positive: "8", Negative: "1" }}
              />
            </div>
            <Button onClick={() => {}}>View full transcript</Button>
            <p></p>
          </div>
        ),
        type: "monitor",
        category: "general",
      },
    ];

    // activities = orderLogs.reduce((acc, log) => {
    //   if (log.changes.locked !== undefined) {
    //     const Content = () => {
    //       return (
    //         <div className="text-white/80">
    //           {log.changes.locked ? (
    //             <span>
    //               Fisierul a fost deschis de&nbsp;
    //               <a href="/" className="font-semibold hover:underline">
    //                 {userProfiles[log.changes!.locked_by!].name}
    //               </a>
    //             </span>
    //           ) : (
    //             `Fisierul a fost inchis.`
    //           )}
    //         </div>
    //       );
    //     };
    //     acc.push({
    //       date: log.created_at,
    //       Content: <Content />,
    //       type: "positive",
    //       category: "file",
    //     });
    //   }
    //   return acc;
    // }, itemActivities);

    activities.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setItemActivity(activities);
  }, [orderLogs, userProfiles]);

  return itemActivity;
};
