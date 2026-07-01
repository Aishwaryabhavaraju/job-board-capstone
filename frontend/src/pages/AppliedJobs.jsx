import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function AppliedJobs() {
  const { authenticatedFetch } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await authenticatedFetch(`${BASE_URL}/api/applications/`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.results || []);
          setApplications(list);
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "green";
      case "Rejected":
        return "red";
      case "Shortlisted":
        return "purple";
      default:
        return "blue";
    }
  };

  return (
    <div>
      <PageHeader
        title="Applied Jobs"
        subtitle="Track your job applications."
      />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading your applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow border">
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
          <Link to="/jobs" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {applications.map((app) => (
            <Card key={app.id}>
              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {app.job_title}
                  </h2>

                  <p className="text-gray-600 mt-1">{app.company}</p>
                  <p className="text-xs text-gray-400 mt-2">Applied on: {new Date(app.applied_at).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-3 items-center">

                  <Badge color={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>

                  <Link to={`/jobs/${app.job}`}>
                    <Button variant="outline">
                      View Job
                    </Button>
                  </Link>

                </div>

              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
