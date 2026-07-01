import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import { notifySuccess } from "../utils/toast";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
    setSavedJobs(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = savedJobs.filter((job) => job.id !== id);
    localStorage.setItem("saved_jobs", JSON.stringify(updated));
    setSavedJobs(updated);
    notifySuccess("Job removed from saved list.");
  };

  return (
    <div>
      <PageHeader
        title="Saved Jobs"
        subtitle="Jobs you saved for later."
      />

      {savedJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow border">
          <p className="text-gray-500">You haven't saved any jobs yet.</p>
          <Link to="/jobs" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {savedJobs.map((job) => (
            <Card key={job.id}>
              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h2>

                  <p className="text-gray-600 mt-1">{job.company}</p>

                  <p className="text-gray-500 text-sm mt-1">📍 {job.location}</p>
                </div>

                <div className="flex gap-2">

                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="outline">
                      View
                    </Button>
                  </Link>

                  <Button variant="danger" onClick={() => handleRemove(job.id)}>
                    Remove
                  </Button>

                </div>

              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}