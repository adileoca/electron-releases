import { useEffect } from "react";

import LoadingBody from "@/components/ui/LoadingBody";
import ViewShell from "@/components/ViewShell";
import { useFetchPrints } from "./hooks/useFetchPrints";
import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";
import { PrintsDisplayProvider } from "./context";

const PrintsView = () => {
  const prints = useFetchPrints();

  useEffect(() => {
    console.log("prints", prints);
  }, [prints]);

  return (
    <PrintsDisplayProvider>
      <ViewBody />
    </PrintsDisplayProvider>
  );
};

export default PrintsView;
