import ViewShell from "@/components/ViewShell";
import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";

const SettingsView = () => {
  return (
    <ViewShell header={<ViewHeader />}>
      <ViewBody />
    </ViewShell>
  );
};

export default SettingsView;
