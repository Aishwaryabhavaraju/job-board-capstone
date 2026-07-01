import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../context/AuthContext";
import ApplyModal from "../components/ApplyModal";
import { useAuth } from "../context/AuthContext";

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
          setIsSaved(saved.some(sj => sj.id === data.id));
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
      const updated = saved.filter(sj => sj.id !== job.id);
      localStorage.setItem("saved_jobs", JSON.stringify(updated));
      setIsSaved(false);
    } else {
      saved.push({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.job_type || job.jobType,
        salary: job.salary,
      });
      localStorage.setItem("saved_jobs", JSON.stringify(saved));
      setIsSaved(true);
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
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-700">Job Not Found</h2>
        <Link to="/jobs" className="mt-4 inline-block text-blue-600 hover:underline">Back to search</Link>
      </div>
    );
  }

  // Helper to split requirements text by newlines
  const reqList = job.requirements
    ? job.requirements.split("\n").filter(line => line.trim() !== "")
    : [];

  const isCandidate = !user || user.role === "job_seeker";

  return (
    <div className="max-w-5xl mx-auto py-10">

      {/* Header */}
      <div className="bg-white shadow rounded-xl p-8 border">

        <p className="text-blue-600 font-semibold uppercase tracking-wide">
          {job.company}
        </p>

        <h1 className="text-4xl font-bold mt-2 text-gray-800">
          {job.title}
        </h1>

        <div className="flex flex-wrap gap-3 mt-5 text-sm text-gray-600 font-medium">

          <span className="bg-gray-100 px-4 py-2 rounded-full">
            📍 {job.location}
          </span>

          <span className="bg-gray-100 px-4 py-2 rounded-full">
            💰 ₹{Number(job.salary).toLocaleString("en-IN")}
          </span>

          <span className="bg-gray-100 px-4 py-2 rounded-full">
            💼 {job.job_type}
          </span>

        </div>

        {isCandidate && (
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setIsApplyOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Apply Now
            </button>

            <button
              onClick={handleSaveToggle}
              className={`px-6 py-3 rounded-lg border font-semibold transition ${
                isSaved
                  ? "bg-green-50 border-green-600 text-green-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {isSaved ? "✓ Saved" : "Save Job"}
            </button>
          </div>
        )}

      </div>

      {/* Description */}
      <div className="bg-white shadow rounded-xl p-8 mt-8 border">

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Job Description
        </h2>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {job.description}
        </p>

      </div>

      {/* Requirements */}
      <div className="bg-white shadow rounded-xl p-8 mt-8 border">

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Requirements
        </h2>

        {reqList.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {reqList.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
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