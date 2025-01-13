import { useState, useEffect } from "react";

import { ActivityItem } from "@/components/ui/ActivityFeed";
import { Print } from "@/lib/supabase/database";
import { useDatabase } from "@/lib/supabase/context";

import { DbTables } from "@/lib/supabase/database";

type TableLog<T> = Omit<
  DbTables["table_logs"]["Row"],
  "new_record" | "old_record" | "changes"
> & {
  new_record: T | null;
  old_record: T | null;
  changes: Partial<T>;
};

type PrintTableLogs = TableLog<DbTables["prints"]["Row"]>[];
type UserProfiles = { [user_id: string]: DbTables["user_profiles"]["Row"] };

export const usePrintActivity = (print: Print) => {
  const [itemActivity, setItemActivity] = useState<ActivityItem[] | null>(null);
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();
  const [printLogs, setPrintLogs] = useState<PrintTableLogs>();
  const { db } = useDatabase();

  useEffect(() => {
    const fetchTableLogs = async (recordIds: string[]) => {
      const tableLogs = (await db.getTableLogs([print.id])) as PrintTableLogs;
      console.log("tableLogs", tableLogs);
      setPrintLogs(tableLogs);

      const userIds = tableLogs.reduce((acc, { new_record, old_record }) => {
        if (new_record?.locked_by) acc.add(new_record.locked_by);
        if (old_record?.locked_by) acc.add(old_record.locked_by);
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

    fetchTableLogs([print.id]);
  }, []);

  useEffect(() => {
    if (!printLogs || !userProfiles) return;

    let itemActivities: ActivityItem[] = [
      {
        date: print.versions[0].created_at,
        Content: <span className=" text-white/80">Printul a fost creeat.</span>,
        type: "positive",
        category: "general",
      },
    ];

    const activities = printLogs.reduce((acc, log) => {
      if (log.changes.locked !== undefined) {
        const Content = () => {
          return (
            <span className="text-white/80">
              {log.changes.locked
                ? `Fisierul a fost deschis de ${
                    userProfiles[log.changes!.locked_by!].name
                  }.`
                : `Fisierul a fostinchis.`}
            </span>
          );
        };
        acc.push({
          date: log.created_at,
          Content: <Content />,
          type: "positive",
          category: "file",
        });
      }
      return acc;
    }, itemActivities);

    activities.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    setItemActivity(activities);
  }, [printLogs, userProfiles]);

  return itemActivity;
};
