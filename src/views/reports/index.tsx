import ViewShell from "@/components/ViewShell";
import BarChartComponent from "./BarChart";
import ViewHeader from "./ViewHeader";

const ReportsView = () => {
  return (
    <ViewShell header={<ViewHeader />}>
      <BarChartComponent />
    </ViewShell>
  );
};

export default ReportsView;
