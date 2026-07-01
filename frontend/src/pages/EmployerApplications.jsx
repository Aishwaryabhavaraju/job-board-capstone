import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import PageHeader from "../components/ui/PageHeader";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function EmployerApplications() {
  const { authenticatedFetch } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error("Error fetching employer applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await authenticatedFetch(`${BASE_URL}/api/applications/${id}/update_status/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        notifySuccess(`Application ${status.toLowerCase()} successfully!`);
        // Update local state
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status } : app))
        );
      } else {
        const errData = await res.json();
        notifyError(errData.error || "Failed to update application status.");
      }
    } catch (err) {
      notifyError(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
      case "Shortlisted":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "yellow";
    }
  };

  return (
    <div>
      <PageHeader
        title="Applications"
        subtitle="Manage job applications."
      />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow border">
          <p className="text-gray-500">No applications received yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {applications.map((application) => {
            const profile = application.applicant_profile;
            return (
              <Card key={application.id}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 border-b pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {application.applicant_name}
                      </h2>
                      <p className="text-blue-600 font-semibold mt-1">
                        Applied for: {application.job_title}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Date: {new Date(application.applied_at).toLocaleDateString()}
                      </p>
                      <div className="mt-3">
                        <Badge color={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {application.resume ? (
                        <a
                          href={application.resume}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button variant="outline">
                            View Resume
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" disabled>
                          No Resume
                        </Button>
                      )}

                      {application.status !== "Shortlisted" && (
                        <Button
                          variant="success"
                          onClick={() => handleUpdateStatus(application.id, "Shortlisted")}
                        >
                          Shortlist
                        </Button>
                      )}

                      {application.status !== "Rejected" && (
                        <Button
                          variant="danger"
                          onClick={() => handleUpdateStatus(application.id, "Rejected")}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Cover Letter</h3>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border whitespace-pre-line leading-relaxed">
                        {application.cover_letter}
                      </p>
                    </div>

                    {profile ? (
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-700">Applicant Details</h3>
                        <p className="text-gray-600"><strong>Phone:</strong> {profile.phone || "N/A"}</p>
                        <p className="text-gray-600"><strong>Skills:</strong> {profile.skills || "N/A"}</p>
                        <p className="text-gray-600"><strong>Education:</strong> {profile.education || "N/A"}</p>
                        <p className="text-gray-600"><strong>Experience:</strong> {profile.experience || "N/A"}</p>
                        <div className="flex gap-3 text-xs font-semibold text-blue-600 pt-1">
                          {profile.linkedin && (
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                          )}
                          {profile.github && (
                            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                          )}
                          {profile.portfolio && (
                            <a href={profile.portfolio} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic flex items-center">
                        Applicant has not created a detailed profile yet.
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}