import React from "react";
import LoadingBody from "./ui/LoadingBody";

const ViewShell: React.FC<{
  children: any;

  header: React.ReactNode;
}> = ({ children, header }) => {
  return (
    <>
      {header}
      <div
        style={{
          width: "calc(100% - 200px)",
          boxShadow: "0 0 0 0.5px black",
        }}
        className="ring-offset fixed bottom-2 right-2 top-12 overflow-hidden rounded-lg border border-x-white/20 border-b-white/20 border-t-white/30"
      >
        <div className="relative h-full w-full overflow-y-auto bg-white dark:bg-neutral-900 ">
          {children}
        </div>
      </div>
    </>
  );
};

export default ViewShell;
