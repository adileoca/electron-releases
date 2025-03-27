import { HashRouter as _, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import TasksDashboardView from "./views/TasksViews/TasksDashboardView";
import EmailDetailedView from "./views/emails/details";
import OrderDetailsView from "./views/orders/details";
import DashboardView from "./views/dashboard";
import OrdersView from "./views/orders/index";
import EmailsView from "./views/emails/index";
import PrintsView from "./views/prints";
import ReportsView from "./views/reports";
import DocumentsView from "./views/documents";
import SettingsView from "./views/settings";
import ProfileView from "./views/profile";
import SessionsView from "./views/sessions";
import TemplatesView from "./views/templates";
const AppRoutes = () => {
  return (
    <div className="relative ">
      <Sidebar />
      <div className="z-50">
        <Routes>
          <Route path="/" element={<DashboardView />} index />
          {/* <Route path="/tasks" element={<TasksDashboardView />} index /> */}

          <Route path="/orders" element={<OrdersView />} index />
          <Route
            path="/orders/:order_id"
            element={<OrderDetailsView />}
            index
          />

          <Route path="/prints" element={<PrintsView />} index />
          <Route path="/sessions" element={<SessionsView />} index />
          <Route path="/reports" element={<ReportsView />} index />
          <Route path="/documents" element={<DocumentsView />} index />
          <Route path="/settings" element={<SettingsView />} index />
          <Route path="/profile" element={<ProfileView />} index />
          <Route path="/templates" element={<TemplatesView />} index />
          {/* <Route path="/emails" element={<EmailsView />} index />
            <Route path="/emails/:emailId" element={<EmailDetailedView />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;


// EXISTS (
//   SELECT 1
//   FROM public.user_profile_roles upr
//   JOIN public.user_roles ur ON ur.id = upr.user_role
//   WHERE upr.user_id = (select auth.uid()) AND ur.title = 'grafician'
// )
