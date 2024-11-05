import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";

import TasksDashboardView from "./views/TasksViews/TasksDashboardView";
import EmailDetailedView from "./views/EmailViews/EmailDetailsView";
import OrderDetailsView from "./views/OrderViews/OrderDetailsView";
import DashboardView from "./views/DashboardViews/DashboardView";
import OrdersView from "./views/OrderViews/OrdersView";
import EmailsView from "./views/EmailViews/EmailsView";

const AppRoutes = () => {
  return (
    <Router>
      <div className="relative">
        <Sidebar />
        <div className="z-50">
          <Routes>
            <Route path="/" element={<DashboardView />} index />
            <Route path="/tasks" element={<TasksDashboardView />} index />

            <Route path="/orders" element={<OrdersView />} index />
            <Route
              path="/orders/details"
              element={<OrderDetailsView />}
              index
            />

            <Route path="/emails" element={<EmailsView />} index />
            <Route path="/emails/:emailId" element={<EmailDetailedView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
