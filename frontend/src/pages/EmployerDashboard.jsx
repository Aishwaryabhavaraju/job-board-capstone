import DashboardHeader from "../components/ui/DashboardHeader";
import StatCard from "../components/ui/StatCard";

export default function EmployerDashboard() {
  return (
    <>

      <DashboardHeader
        title="Employer Dashboard"
        subtitle="Manage jobs and applications"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Posted Jobs"
          value="12"
        />

        <StatCard
          title="Applications"
          value="86"
        />

        <StatCard
          title="Interviews"
          value="15"
        />

        <StatCard
          title="Hired"
          value="4"
        />

      </div>

    </>
  );
}