import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout({
  role = "candidate",
}) {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <DashboardSidebar role={role} />

      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}