import { useState, useEffect } from "react";

import { ActivityItem } from "@/components/ui/ActivityFeed";
import { useDatabase } from "@/lib/supabase/context";
import {
  OrderDetailedType,
  DbTables,
  TableLog,
  Supabase,
} from "@/lib/supabase/database";

import MiniTable from "@/components/ui/MiniTable";
import Button from "@/components/ui/Button";

type OrderTableLogs = TableLog<DbTables["orders"]["Row"]>[];
type UserProfiles = { [user_id: string]: DbTables["user_profiles"]["Row"] };

export const useOrderActivity = (order: OrderDetailedType) => {
  const [activities, setActivities] = useState<ActivityItem[] | null>(null);
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();
  const [callLogs, setCallsLogs] = useState<CallLogsType>();
  const [orderLogs, setOrderLogs] = useState<OrderTableLogs>();
  const { db, supabase } = useDatabase();

  useEffect(() => {
    const fetchTableLogs = async () => {
      const callLogs = await fetchCallLogs(supabase, order.phone);
      setCallsLogs(callLogs);

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
    console.log("callLogs", callLogs);
  }, [callLogs]);

  useEffect(() => {
    if (!orderLogs || !userProfiles) return;

    let activities: ActivityItem[] = [
      {
        id: "1",
        date: order.created_at!,
        Content: <div>Comanda a fost plasatǎ.</div>,
        Details: <div>caca</div>,
        type: "positive",
        category: "general",
      },
    ];

    callLogs?.forEach((log) => {
      activities.push({
        id: log.id,
        type: "monitor",
        date: log.created_at!,
        category: "general",
        Content: <div>Clientul a sunat.</div>,
        Details: (
          <div className="mb-4 mt-2 flex flex-col space-y-4">
            <div className="flex flex-col">
              <h1 className="font-semibold text-white/80">Summary</h1>
              <p className="mt-2 text-white/60">
                {(log.transcript as { text: string }).text}
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
      });
    });

    activities.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setActivities(activities);
  }, [orderLogs, userProfiles]);

  return activities;
};

const fetchCallLogs = async (supabase: Supabase, phone: string) => {
  const { data, error } = await supabase
    .from("call_logs")
    .select("*, dialed:dialed_numbers(*)")
    .eq("from", phone);

  if (error) {
    console.error("Error fetching call logs", error);
    throw error;
  }

  return data;
};

type CallLogsType = Awaited<ReturnType<typeof fetchCallLogs>>;
