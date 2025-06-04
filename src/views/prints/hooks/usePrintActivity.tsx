import { useState, useEffect } from "react";

import { ActivityItem } from "@/components/ui/ActivityFeed";
import { Print, DbTables } from "@/lib/supabase/database";

type UserProfiles = { [user_id: string]: DbTables["user_profiles"]["Row"] };

export const usePrintActivity = (print: Print) => {
  const [itemActivity, setItemActivity] = useState<ActivityItem[] | null>(null);
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();

  useEffect(() => {
    if (!userProfiles) return;

    let itemActivities: ActivityItem[] = [
      {
        date: print.versions[0].created_at,
        Content: <span className=" text-white/80">Printul a fost creeat.</span>,
        type: "positive",
        category: "general",
      },
    ];

    // const activities = printLogs.reduce((acc, log) => {
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

    // activities.sort((a, b) => {
    //   return new Date(a.date).getTime() - new Date(b.date).getTime();
    // });

    // setItemActivity(activities);
  }, [userProfiles]);

  return itemActivity;
};
