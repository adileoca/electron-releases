import { useEffect } from "react";

import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";

import LoadingBody from "@/components/ui/LoadingBody";
import ViewShell from "@/components/ViewShell";

import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";

const PrintsView = () => {
  const { db } = useDatabase();
  const prints = useFetchData(db.getPrints());

  useEffect(() => {
    console.log("prints", prints);
  }, [prints]);

  return (
    <ViewShell header={<ViewHeader />}>
      {prints ? <ViewBody prints={prints} /> : <LoadingBody />}
    </ViewShell>
  );
};

export default PrintsView;
