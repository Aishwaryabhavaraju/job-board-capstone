import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/ui/DashboardHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function CandidateDashboard() {
  const { user, authenticatedFetch } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedCount, setSavedCount] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch user applications
        const appRes = await authenticatedFetch(`${BASE_URL}/api/applications/`);
        if (appRes.ok) {
          const appData = await appRes.json();
          const list = Array.isArray(appData) ? appData : (appData.results || []);
          setAppliedJobs(list);
        }

        // Saved count from local storage
        const saved = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
        setSavedCount(saved.length);

        // Fetch candidate profile
        const profRes = await authenticatedFetch(`${BASE_URL}/api/profiles/`);
        if (profRes.ok) {
          const profData = await profRes.json();
          const list = Array.isArray(profData) ? profData : (profData.results || []);
          if (list.length > 0) {
            setProfile(list[0]);
          }
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Calculate profile completion score
  const getProfileCompletion = () => {
    if (!profile) return 20;
    let score = 30; // base score for account
    if (profile.phone) score += 15;
    if (profile.skills) score += 15;
    if (profile.education) score += 15;
    if (profile.resume) score += 15;
    if (profile.linkedin || profile.github || profile.portfolio) score += 10;
    return Math.min(score, 100);
  };

  const completionPercent = getProfileCompletion();

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "shortlisted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <DashboardHeader
        title={`Welcome back, ${user?.username || "Candidate"}! 👋`}
        subtitle="Track your applications, saved jobs, and profile status."
      />

      {/* Quick Action Banner & Profile Completion Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Profile Progress Card */}
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Candidate Profile
              </span>
              <span className="text-xl font-bold">{completionPercent}% Complete</span>
            </div>

            <h2 className="text-2xl font-bold mb-2">Stand out to top recruiters</h2>
            <p className="text-blue-100 text-sm max-w-xl">
              Complete your skills, education, and resume to get matched faster with relevant job openings.
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-3 mt-4">
              <div
                className="bg-emerald-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/profile"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs py-2.5 px-5 rounded-xl transition shadow-md"
            >
              ✏️ Update Profile & Resume
            </Link>
            <Link
              to="/jobs"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition border border-white/20"
            >
              🔍 Browse New Jobs
            </Link>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🚀</span> Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/jobs"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold text-sm transition"
              >
                <span>Search All Jobs</span>
                <span>→</span>
              </Link>
              <Link
                to="/candidate/saved"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 font-semibold text-sm transition"
              >
                <span>Saved Jobs ({savedCount})</span>
                <span>★</span>
              </Link>
              <Link
                to="/candidate/applications"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-semibold text-sm transition"
              >
                <span>View Applications ({appliedJobs.length})</span>
                <span>📂</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Applied Jobs"
          value={loading ? "..." : appliedJobs.length.toString()}
        />

        <StatCard
          title="Saved Jobs"
          value={loading ? "..." : savedCount.toString()}
        />

        <StatCard
          title="Shortlisted / Accepted"
          value={
            loading
              ? "..."
              : appliedJobs
                  .filter((a) => ["accepted", "shortlisted"].includes(a.status?.toLowerCase()))
                  .length.toString()
          }
        />
      </div>

      {/* Recent Applications Summary */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
          <Link to="/candidate/applications" className="text-sm font-semibold text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center bg-white rounded-2xl border text-gray-500">Loading applications...</div>
        ) : appliedJobs.length === 0 ? (
          <Card>
            <div className="text-center py-10">
              <p className="text-gray-500">You haven't applied for any jobs yet.</p>
              <Link to="/jobs" className="mt-4 inline-block bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition">
                Explore Jobs & Apply Now
              </Link>
            </div>
          </Card>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {appliedJobs.slice(0, 5).map((app) => (
                <div key={app.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50/80 transition">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {app.job_details?.title || app.job?.title || "Job Position"}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">
                      {app.job_details?.company || app.job?.company || "Company"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Applied on: {new Date(app.applied_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                      {app.status || "Pending"}
                    </span>
                    <Link
                      to={`/jobs/${app.job_details?.id || app.job?.id || app.job}`}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}