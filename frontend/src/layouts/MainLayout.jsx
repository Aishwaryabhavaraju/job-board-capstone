import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <div className="bg-white shadow p-4">
        <h1 className="text-xl font-bold text-blue-600">
          JobBoard
        </h1>
      </div>

      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}