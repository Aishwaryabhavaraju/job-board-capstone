import { useState, useEffect } from "react";
import DashboardHeader from "../components/ui/DashboardHeader";
import StatCard from "../components/ui/StatCard";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function EmployerDashboard() {
  const { user, authenticatedFetch } = useAuth();
  const [postedCount, setPostedCount] = useState(0);
  const [appCount, setAppCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch posted jobs count
        const jobsRes = await fetch(`${BASE_URL}/api/jobs/?posted_by=${user.id}`);
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          const list = Array.isArray(jobsData) ? jobsData : (jobsData.results || []);
          setPostedCount(list.length);
        }

        // Fetch applications count
        const appRes = await authenticatedFetch(`${BASE_URL}/api/applications/`);
        if (appRes.ok) {
          const appData = await appRes.json();
          const list = Array.isArray(appData) ? appData : (appData.results || []);
          setAppCount(list.length);
        }
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  return (
    <>
      <DashboardHeader
        title="Employer Dashboard"
        subtitle="Manage jobs and applications."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        <StatCard
          title="Posted Jobs"
          value={loading ? "..." : postedCount.toString()}
        />

        <StatCard
          title="Received Applications"
          value={loading ? "..." : appCount.toString()}
        />
      </div>
    </>
  );
}