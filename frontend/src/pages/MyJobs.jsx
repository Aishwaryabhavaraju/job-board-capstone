import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function MyJobs() {
  const { user, authenticatedFetch } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      // Filter jobs by logged in user's id
      const res = await fetch(`${BASE_URL}/api/jobs/?posted_by=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.results || []);
        setJobs(list);
      }
    } catch (err) {
      console.error("Error loading my jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyJobs();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await authenticatedFetch(`${BASE_URL}/api/jobs/${id}/`, {
        method: "DELETE",
      });

      if (res.status === 204 || res.ok) {
        notifySuccess("Job deleted successfully!");
        fetchMyJobs();
      } else {
        notifyError("Failed to delete job.");
      }
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <div>
      <PageHeader
        title="My Jobs"
        subtitle="Manage your posted jobs."
      />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading your jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow border">
          <p className="text-gray-500">You haven't posted any jobs yet.</p>
          <Link to="/employer/jobs/new" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
            Post a Job
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {jobs.map((job) => (
            <Card key={job.id}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-gray-500 mt-1">{job.company}</p>
                  <p className="text-gray-400 text-sm mt-1">📍 {job.location}</p>
                </div>

                <div className="text-right">
                  <Badge color="green">
                    {job.applications_count || 0} Applicants
                  </Badge>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" onClick={() => navigate(`/employer/jobs/edit/${job.id}`)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(job.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}