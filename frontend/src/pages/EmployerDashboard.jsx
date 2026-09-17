import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/ui/DashboardHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function EmployerDashboard() {
  const { user, authenticatedFetch } = useAuth();
  const [postedJobs, setPostedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        setLoading(true);

        // Fetch posted jobs
        const jobsRes = await fetch(`${BASE_URL}/api/jobs/?posted_by=${user?.id}`);
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          const list = Array.isArray(jobsData) ? jobsData : (jobsData.results || []);
          // Filter if backend doesn't filter by posted_by automatically
          const myJobs = list.filter((j) => j.posted_by === user?.id || j.employer_name === user?.username);
          setPostedJobs(myJobs.length > 0 ? myJobs : list);
        }

        // Fetch received applications
        const appRes = await authenticatedFetch(`${BASE_URL}/api/applications/`);
        if (appRes.ok) {
          const appData = await appRes.json();
          const list = Array.isArray(appData) ? appData : (appData.results || []);
          setApplications(list);
        }
      } catch (err) {
        console.error("Error loading employer dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEmployerData();
    }
  }, [user]);

  const shortlistedCount = applications.filter((a) =>
    ["shortlisted", "accepted"].includes(a.status?.toLowerCase())
  ).length;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      <DashboardHeader
        title={`Employer Portal - Welcome, ${user?.username || "Employer"}! 🏢`}
        subtitle="Manage your hiring campaigns, track job applications, and find candidate talent."
      />

      {/* Hero CTA & Quick Actions Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Employer Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-3">Ready to Hire Top Talent?</h2>
          <p className="text-gray-300 text-sm mt-1 max-w-xl">
            Post new job listings, specify salary ranges and company links, and review candidates in real-time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/employer/jobs/new"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition flex items-center gap-2"
          >
            <span>➕</span> Post a New Job
          </Link>
          <Link
            to="/profile"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-3 px-5 rounded-xl transition border border-white/20"
          >
            ⚙️ Company Profile
          </Link>
        </div>
      </div>

      {/* Key Metrics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Job Openings"
          value={loading ? "..." : postedJobs.length.toString()}
        />

        <StatCard
          title="Total Received Applications"
          value={loading ? "..." : applications.length.toString()}
        />

        <StatCard
          title="Shortlisted Candidates"
          value={loading ? "..." : shortlistedCount.toString()}
        />

        <StatCard
          title="Applications Pending Review"
          value={
            loading
              ? "..."
              : applications.filter((a) => !a.status || a.status.toLowerCase() === "pending").length.toString()
          }
        />
      </div>

      {/* Manage Jobs & Applications Quick Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Posted Jobs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📋</span> Your Posted Jobs
              </h3>
              <Link to="/employer/jobs" className="text-xs font-bold text-blue-600 hover:underline">
                View All ({postedJobs.length})
              </Link>
            </div>

            {loading ? (
              <p className="text-gray-400 text-sm py-6 text-center">Loading jobs...</p>
            ) : postedJobs.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm">No jobs published yet.</p>
                <Link to="/employer/jobs/new" className="mt-3 inline-block text-xs text-blue-600 font-bold hover:underline">
                  + Create your first job post
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {postedJobs.slice(0, 4).map((job) => (
                  <div key={job.id} className="p-3.5 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{job.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        📍 {job.location} • 💼 {job.job_type || job.jobType}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/employer/jobs/edit/${job.id}`}
                        className="text-xs font-semibold bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Received Applications */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📥</span> Recent Applications
              </h3>
              <Link to="/employer/applications" className="text-xs font-bold text-blue-600 hover:underline">
                View All ({applications.length})
              </Link>
            </div>

            {loading ? (
              <p className="text-gray-400 text-sm py-6 text-center">Loading applications...</p>
            ) : applications.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm">No candidate applications received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="p-3.5 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {app.applicant_name || app.applicant?.username || "Applicant"}
                      </h4>
                      <p className="text-xs text-blue-600 font-medium mt-0.5">
                        Applied for: {app.job_title || app.job?.title || "Job Opening"}
                      </p>
                    </div>

                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      {app.status || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}