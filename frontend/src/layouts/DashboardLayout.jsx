import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout({ role = "candidate" }) {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">

      {/* Sidebar */}
      <DashboardSidebar role={role} />

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}