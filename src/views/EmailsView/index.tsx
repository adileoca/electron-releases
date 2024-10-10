import React from "react";
import ViewHeader from "./ViewHeader";
import EmailsTable from "./EmailsTable";

const EmailsView: React.FC = () => {
  return (
    <div
      style={{ width: "calc(100% - 240px)" }}
      className="fixed right-0 h-screen overflow-hidden shadow shadow-neutral-300 dark:shadow-none"
    >
      <ViewHeader />
      <div className="h-full w-full overflow-y-auto dark:bg-opacity-95">
        <EmailsTable />
      </div>
    </div>
  );
};

export default EmailsView;
