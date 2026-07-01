import { useState, useEffect } from "react";
import DashboardHeader from "../components/ui/DashboardHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function CandidateDashboard() {
  const { user, authenticatedFetch } = useAuth();
  const [appliedCount, setAppliedCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // Profile Form State
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
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [submittingProfile, setSubmittingProfile] = useState(false);

  useEffect(() => {
    const fetchStatsAndProfile = async () => {
      try {
        setLoadingStats(true);
        setLoadingProfile(true);

        // Fetch applications count
        const appRes = await authenticatedFetch(`${BASE_URL}/api/applications/`);
        if (appRes.ok) {
          const appData = await appRes.json();
          const list = Array.isArray(appData) ? appData : (appData.results || []);
          setAppliedCount(list.length);
        }

        // Fetch saved jobs count from localStorage
        const saved = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
        setSavedCount(saved.length);

        // Fetch profile
        const profileRes = await authenticatedFetch(`${BASE_URL}/api/profiles/`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData && profileData.length > 0) {
            const prof = profileData[0];
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
        console.error("Dashboard data load error:", err);
      } finally {
        setLoadingStats(false);
        setLoadingProfile(false);
      }
    };

    if (user) {
      fetchStatsAndProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!form.phone || !form.skills || !form.education) {
      notifyError("Phone, Skills, and Education are required fields.");
      return;
    }

    setSubmittingProfile(true);
    try {
      const formData = new FormData();
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("skills", form.skills);
      formData.append("education", form.education);
      formData.append("experience", form.experience);
      formData.append("linkedin", form.linkedin);
      formData.append("github", form.github);
      formData.append("portfolio", form.portfolio);

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      let res;
      if (profile) {
        // Update profile
        res = await authenticatedFetch(`${BASE_URL}/api/profiles/${profile.id}/`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        // Create profile
        res = await authenticatedFetch(`${BASE_URL}/api/profiles/`, {
          method: "POST",
          body: formData,
        });
      }

      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        notifySuccess("Profile saved successfully!");
        setResumeFile(null);
      } else {
        // Display validation errors from backend
        let errorMsg = "Failed to save profile.";
        if (data.phone) errorMsg = `Phone: ${data.phone[0]}`;
        else if (data.resume) errorMsg = `Resume: ${data.resume[0]}`;
        else if (data.non_field_errors) errorMsg = data.non_field_errors[0];
        throw new Error(errorMsg);
      }
    } catch (err) {
      notifyError(err.message);
    } finally {
      setSubmittingProfile(false);
    }
  };

  return (
    <>
      <DashboardHeader
        title="Candidate Dashboard"
        subtitle="Track your job applications and manage your profile."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
        <StatCard
          title="Applied Jobs"
          value={loadingStats ? "..." : appliedCount.toString()}
        />

        <StatCard
          title="Saved Jobs"
          value={loadingStats ? "..." : savedCount.toString()}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applicant Profile</h2>
        {loadingProfile ? (
          <div className="p-10 text-center bg-white rounded-xl shadow border">
            Loading profile details...
          </div>
        ) : (
          <Card>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9988776655"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio URL</label>
                  <input
                    name="portfolio"
                    type="url"
                    value={form.portfolio}
                    onChange={handleChange}
                    placeholder="https://myportfolio.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                    name="linkedin"
                    type="url"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub URL</label>
                  <input
                    name="github"
                    type="url"
                    value={form.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address</label>
                <textarea
                  name="address"
                  rows="2"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, City, Country"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Skills * (comma separated)</label>
                <textarea
                  name="skills"
                  rows="2"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, Python, Django, Tailwind CSS"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Education *</label>
                <textarea
                  name="education"
                  rows="2"
                  value={form.education}
                  onChange={handleChange}
                  placeholder="B.Tech in Computer Science - XYZ University (2020-2024)"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                <textarea
                  name="experience"
                  rows="3"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Frontend Developer Intern at ABC Corp (6 months) - built dashboard..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload/Change Resume (PDF, DOC, DOCX up to 5MB)</label>
                {profile && profile.resume && (
                  <div className="mb-3 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                    ✓ Existing Resume:{" "}
                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-semibold hover:text-green-800"
                    >
                      View uploaded resume
                    </a>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100 cursor-pointer"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={submittingProfile}>
                  {submittingProfile ? "Saving Profile..." : (profile ? "Update Profile" : "Create Profile")}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}