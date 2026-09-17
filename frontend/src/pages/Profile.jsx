import { useState, useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function Profile() {
  const { user, authenticatedFetch } = useAuth();
  const userRole = user?.role === "job_seeker" ? "candidate" : user?.role;

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    address: "",
    skills: "",
    education: "",
    experience: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await authenticatedFetch(`${BASE_URL}/api/profiles/`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.results || []);
          if (list.length > 0) {
            const prof = list[0];
            setProfile(prof);
            setForm({
              phone: prof.phone || "",
              address: prof.address || "",
              skills: prof.skills || "",
              education: prof.education || "",
              experience: prof.experience || "",
              linkedin: prof.linkedin || "",
              github: prof.github || "",
              portfolio: prof.portfolio || "",
            });
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("phone", form.phone || "");
      formData.append("address", form.address || "");
      formData.append("skills", form.skills || "");
      formData.append("education", form.education || "");
      formData.append("experience", form.experience || "");
      formData.append("linkedin", form.linkedin || "");
      formData.append("github", form.github || "");
      formData.append("portfolio", form.portfolio || "");

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      let res;
      if (profile) {
        res = await authenticatedFetch(`${BASE_URL}/api/profiles/${profile.id}/`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        res = await authenticatedFetch(`${BASE_URL}/api/profiles/`, {
          method: "POST",
          body: formData,
        });
      }

      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        notifySuccess("Profile details updated successfully!");
        setResumeFile(null);
      } else {
        let errorMsg = "Failed to save profile.";
        if (data.phone) errorMsg = `Phone: ${data.phone[0]}`;
        else if (data.resume) errorMsg = `Resume: ${data.resume[0]}`;
        else if (data.non_field_errors) errorMsg = data.non_field_errors[0];
        throw new Error(errorMsg);
      }
    } catch (err) {
      notifyError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <PageHeader
        title={userRole === "employer" ? "Company & Account Profile" : "My Profile & Resume"}
        subtitle={userRole === "employer" ? "Manage your hiring profile and company information." : "Keep your profile up-to-date so employers can find you."}
      />

      {/* Account Info Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-2xl border-2 border-white/30 backdrop-blur-sm shadow-inner">
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.username}</h2>
            <p className="text-blue-100 text-sm">{user?.email}</p>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white capitalize">
              Role: {userRole}
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 text-right text-xs">
          <p className="text-blue-100">Account ID: #{user?.id}</p>
          <p className="text-blue-200 mt-0.5">Status: Active</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-3">
            {userRole === "employer" ? "Company Information" : "Personal & Contact Details"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {userRole === "employer" ? "Company Website / Link" : "Portfolio / Website URL"}
              </label>
              <input
                name="portfolio"
                type="url"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn Profile URL
              </label>
              <input
                name="linkedin"
                type="url"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {userRole === "candidate" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GitHub Profile URL
                </label>
                <input
                  name="github"
                  type="url"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {userRole === "employer" ? "Company Office Address" : "Current Address / Location"}
            </label>
            <textarea
              name="address"
              rows="2"
              value={form.address}
              onChange={handleChange}
              placeholder="City, State, Country"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {userRole === "candidate" ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills (comma separated)
                </label>
                <textarea
                  name="skills"
                  rows="2"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, Node.js, Python, Django, Tailwind CSS"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Education Background
                </label>
                <textarea
                  name="education"
                  rows="2"
                  value={form.education}
                  onChange={handleChange}
                  placeholder="Degree, Institution, Graduation Year"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work Experience
                </label>
                <textarea
                  name="experience"
                  rows="3"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Previous job roles, projects, or internships..."
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Resume Attachment (PDF, DOC, DOCX up to 5MB)
                </label>
                {profile && profile.resume && (
                  <div className="mb-3 text-sm text-green-700 bg-green-50 p-3 rounded-xl border border-green-200 flex items-center justify-between">
                    <span>✓ Resume file uploaded</span>
                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-semibold hover:text-green-900"
                    >
                      Download / View Resume
                    </a>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Description / Bio
              </label>
              <textarea
                name="experience"
                rows="4"
                value={form.experience}
                onChange={handleChange}
                placeholder="Tell job seekers about your company culture, mission, and benefits..."
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving Profile..." : (profile ? "Update Profile" : "Create Profile")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
