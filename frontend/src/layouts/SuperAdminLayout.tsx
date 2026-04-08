import { Outlet } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";
import AppSidebar from "../components/layout/AppSidebar"; 

export default function SuperAdminLayout() {
    return (
    <div className="min-h-screen bg-slate-50">
      <AppSidebar />
      <AppHeader searchPlaceholder="Search ..." />
      <Outlet />
    </div>
  );
}