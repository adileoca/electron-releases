import React from "react";
import clsx from "clsx";

import useAnimateWidthTransition from "@/hooks/useAnimateWidth";
import { useGlobalContext } from "@/context/global";

const ViewShell: React.FC<{
  children: any;
  header: React.ReactNode;
  loading?: boolean;
}> = ({ children, header }) => {
  // const ref = useAnimateWidthTransition(true);
  const {
    state: { platform },
  } = useGlobalContext();
  return (
    <>
      {header}
      <div
        // ref={ref}
        style={{
          width: "calc(100% - 200px)",
          boxShadow: platform === "darwin" ? "0 0 0 0.5px black" : "",
        }}
        className={clsx(
          " fixed bottom-2 right-2 top-12 overflow-hidden rounded-lg",
          platform === "darwin" &&
            "border border-x-white/20 border-b-white/20 border-t-white/30",
          platform === "win32" && "border border-white/10"
        )}
      >
        <div className="relative h-full w-full overflow-y-auto bg-white dark:bg-neutral-900 ">
          {children}
        </div>
      </div>
    </>
  );
};

export default ViewShell;
