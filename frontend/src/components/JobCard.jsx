import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { notifySuccess } from "../utils/toast";

export default function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
    setIsSaved(saved.some((sj) => sj.id === job.id));
  }, [job.id]);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();

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
        jobType: job.jobType || job.job_type,
        salary: job.salary,
        company_url: job.company_url,
      });
      localStorage.setItem("saved_jobs", JSON.stringify(saved));
      setIsSaved(true);
      notifySuccess("Job saved to your bookmarks!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col justify-between group hover:-translate-y-1 relative">

      <div>
        {/* Top Header: Company + Save Button */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {job.company}
            </span>
            {job.company_url && (
              <a
                href={job.company_url.startsWith("http") ? job.company_url : `https://${job.company_url}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block ml-2 text-xs text-gray-400 hover:text-blue-600 hover:underline"
              >
                🌐 Website
              </a>
            )}
          </div>

          {/* Bookmark / Save Job Button */}
          <button
            onClick={toggleSave}
            title={isSaved ? "Remove from saved jobs" : "Save this job"}
            className={`p-2 rounded-xl transition-all duration-200 ${
              isSaved
                ? "bg-amber-100 text-amber-600 hover:bg-amber-200 shadow-sm"
                : "bg-gray-50 text-gray-400 hover:text-amber-500 hover:bg-amber-50"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {job.title}
        </h3>

        {/* Location & Tags */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
            📍 {job.location}
          </span>
          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
            💼 {job.jobType || job.job_type}
          </span>
        </div>
      </div>

      {/* Footer: Salary & Action Link */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-400 block font-medium uppercase">Salary</span>
          <span className="font-bold text-emerald-600 text-sm">
            {typeof job.salary === "number"
              ? `₹${job.salary.toLocaleString("en-IN")}`
              : job.salary}
          </span>
        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="bg-gray-900 hover:bg-blue-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition duration-200 shadow-sm flex items-center gap-1"
        >
          View Job
          <span>→</span>
        </Link>
      </div>

    </div>
  );
}