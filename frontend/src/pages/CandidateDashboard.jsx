import DashboardHeader from "../components/ui/DashboardHeader";
import StatCard from "../components/ui/StatCard";

export default function CandidateDashboard() {
  return (
    <>

      <DashboardHeader
        title="Candidate Dashboard"
        subtitle="Track your job applications"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Applied Jobs"
          value="18"
        />

        <StatCard
          title="Saved Jobs"
          value="10"
        />

        <StatCard
          title="Interviews"
          value="5"
        />

        <StatCard
          title="Offers"
          value="2"
        />

      </div>

    </>
  );
}