import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function ApplyModal({ isOpen, onClose, jobId }) {
  const { user, authenticatedFetch } = useAuth();
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;

    const checkProfile = async () => {
      try {
        setLoading(true);
        const res = await authenticatedFetch(`${BASE_URL}/api/profiles/`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProfile(data[0]); // User has a profile
          }
        }
      } catch (err) {
        console.error("Error checking profile:", err);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [isOpen, user]);

  if (!isOpen) return null;

  // If user is not logged in
  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl border text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Apply for Job</h2>
          <p className="text-gray-600 mb-6">You must be logged in as a candidate to apply for jobs.</p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={() => { onClose(); navigate("/login"); }}>Login</Button>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in but is an employer
  if (user.role === "employer") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl border text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Apply for Job</h2>
          <p className="text-gray-600 mb-6">Employers cannot apply for jobs. Please log in with a Job Seeker account.</p>
          <div className="flex justify-center">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleApply = async (e) => {
    e.preventDefault();

    if (!coverLetter.trim()) {
      notifyError("Please write a cover letter.");
      return;
    }

    setSubmitting(true);
    try {
      let activeProfile = profile;

      // 1. Handle resume upload/update if a file is selected
      if (resumeFile) {
        const formData = new FormData();
        formData.append("resume", resumeFile);

        if (!activeProfile) {
          // If no profile exists, create a basic one. We need default values for required fields.
          formData.append("phone", "9999999999");
          formData.append("skills", "Update your skills on your dashboard.");
          formData.append("education", "Update your education on your dashboard.");
          
          const profileRes = await authenticatedFetch(`${BASE_URL}/api/profiles/`, {
            method: "POST",
            body: formData, // Do NOT set Content-Type header when using FormData; fetch does it automatically
          });

          if (profileRes.ok) {
            activeProfile = await profileRes.json();
            setProfile(activeProfile);
          } else {
            const errData = await profileRes.json();
            throw new Error(errData.resume ? errData.resume[0] : "Failed to create profile with resume.");
          }
        } else {
          // If profile exists, PATCH the resume
          const profileRes = await authenticatedFetch(`${BASE_URL}/api/profiles/${activeProfile.id}/`, {
            method: "PATCH",
            body: formData,
          });

          if (profileRes.ok) {
            activeProfile = await profileRes.json();
            setProfile(activeProfile);
          } else {
            const errData = await profileRes.json();
            throw new Error(errData.resume ? errData.resume[0] : "Failed to update profile resume.");
          }
        }
      }

      // 2. Submit application
      const appRes = await authenticatedFetch(`${BASE_URL}/api/applications/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job: jobId,
          cover_letter: coverLetter,
        }),
      });

      if (appRes.ok) {
        notifySuccess("Application submitted successfully!");
        onClose();
      } else {
        const errData = await appRes.json();
        throw new Error(errData.non_field_errors ? errData.non_field_errors[0] : "You have already applied for this job.");
      }
    } catch (err) {
      notifyError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl border">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Apply for Job</h2>

        {loading ? (
          <div className="py-10 text-center text-gray-500">Checking profile details...</div>
        ) : (
          <form onSubmit={handleApply} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Cover Letter</label>
              <textarea
                rows="5"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Explain why you are a good fit for this role..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Resume</label>
              {profile && profile.resume ? (
                <div className="mb-3 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                  ✓ Current Resume attached:{" "}
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-semibold hover:text-green-800"
                  >
                    View uploaded file
                  </a>
                </div>
              ) : (
                <div className="mb-3 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  ⚠ No resume found. Please upload one below or on your profile dashboard.
                </div>
              )}

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100 cursor-pointer"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}