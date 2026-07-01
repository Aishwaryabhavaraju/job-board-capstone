import { useState, useEffect } from "react";
import { BASE_URL } from "../context/AuthContext";
import JobCard from "./JobCard";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/`);
        if (res.ok) {
          const data = await res.json();
          const jobList = Array.isArray(data) ? data : (data.results || []);
          // Slice top 3 featured jobs
          setJobs(jobList.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching featured jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">
        Loading featured jobs...
      </div>
    );
  }

  if (jobs.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">
        Featured Jobs
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={{
              ...job,
              jobType: job.job_type,
              salary: isNaN(job.salary) ? job.salary : `₹${Math.round(job.salary).toLocaleString("en-IN")}`,
            }}
          />
        ))}
      </div>
    </section>
  );
}