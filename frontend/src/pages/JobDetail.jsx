import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../context/AuthContext";
import ApplyModal from "../components/ApplyModal";
import { useAuth } from "../context/AuthContext";
import { notifySuccess } from "../utils/toast";

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/jobs/${id}/`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);

          // Check if job is saved in localStorage
          const saved = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
          setIsSaved(saved.some((sj) => sj.id === data.id));
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleSaveToggle = () => {
    const saved = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
    if (isSaved) {
      const updated = saved.filter((sj) => sj.id !== job.id);
      localStorage.setItem("saved_jobs", JSON.stringify(updated));
      setIsSaved(false);
      notifySuccess("Job removed from saved list");
    } else {
      saved.push({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.job_type || job.jobType,
        salary: job.salary,
        company_url: job.company_url,
      });
      localStorage.setItem("saved_jobs", JSON.stringify(saved));
      setIsSaved(true);
      notifySuccess("Job saved to bookmarks!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border max-w-2xl mx-auto my-12">
        <h2 className="text-3xl font-bold text-gray-700">Job Not Found</h2>
        <p className="text-gray-500 mt-2">The job listing you are looking for does not exist or was removed.</p>
        <Link to="/jobs" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const reqList = job.requirements
    ? job.requirements.split("\n").filter((line) => line.trim() !== "")
    : [];

  const isCandidate = !user || user.role === "job_seeker";

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Back Button */}
      <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6 font-semibold transition">
        ← Back to search results
      </Link>

      {/* Main Header Banner */}
      <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md">
                {job.company}
              </span>
              {job.company_url && (
                <a
                  href={job.company_url.startsWith("http") ? job.company_url : `https://${job.company_url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline bg-blue-50/50 border border-blue-100 px-2.5 py-1 rounded-md"
                >
                  🌐 Visit Website
                </a>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 text-gray-900 tracking-tight">
              {job.title}
            </h1>
          </div>

          {isCandidate && (
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleSaveToggle}
                className={`px-5 py-3 rounded-xl border font-semibold text-sm transition flex items-center gap-2 ${
                  isSaved
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{isSaved ? "★" : "☆"}</span>
                {isSaved ? "Saved" : "Save Job"}
              </button>

              <button
                onClick={() => setIsApplyOpen(true)}
                className="flex-1 md:flex-initial bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 transition"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-6 text-xs text-gray-600 font-semibold border-t pt-5">
          <span className="bg-gray-100 px-4 py-2 rounded-xl flex items-center gap-1.5">
            📍 {job.location}
          </span>

          <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-100">
            💰 ₹{Number(job.salary).toLocaleString("en-IN")} / year
          </span>

          <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl flex items-center gap-1.5">
            💼 {job.job_type}
          </span>
        </div>

      </div>

      {/* Job Description */}
      <div className="bg-white shadow-sm rounded-2xl p-8 mt-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <span>📋</span> Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {job.description}
        </p>
      </div>

      {/* Requirements */}
      <div className="bg-white shadow-sm rounded-2xl p-8 mt-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <span>🎯</span> Key Requirements & Skills
        </h2>

        {reqList.length > 0 ? (
          <ul className="space-y-2.5 text-gray-700 text-sm sm:text-base">
            {reqList.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="text-blue-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base">{job.requirements}</p>
        )}
      </div>

      {/* Apply Modal */}
      {isApplyOpen && (
        <ApplyModal
          isOpen={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
          jobId={job.id}
        />
      )}
    </div>
  );
}