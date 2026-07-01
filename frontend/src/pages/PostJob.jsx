import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth, BASE_URL } from "../context/AuthContext";

export default function PostJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authenticatedFetch } = useAuth();
  
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full-Time",
    salary: "",
    description: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/${id}/`);
        if (res.ok) {
          const data = await res.json();
          setForm({
            title: data.title || "",
            company: data.company || "",
            location: data.location || "",
            job_type: data.job_type || "Full-Time",
            salary: Math.round(Number(data.salary)) || "",
            description: data.description || "",
            requirements: data.requirements || "",
          });
        } else {
          notifyError("Failed to fetch job details.");
          navigate("/employer/jobs");
        }
      } catch (err) {
        console.error("Error loading job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.company || !form.location || !form.salary || !form.description) {
      notifyError("All core fields are required.");
      return;
    }

    setSubmitting(true);
    try {
      const url = isEditMode ? `${BASE_URL}/api/jobs/${id}/` : `${BASE_URL}/api/jobs/`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await authenticatedFetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          salary: Number(form.salary),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        notifySuccess(isEditMode ? "Job updated successfully!" : "Job posted successfully!");
        navigate("/employer/jobs");
      } else {
        throw new Error(data.detail || "Failed to save job posting.");
      }
    } catch (err) {
      notifyError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className="
        max-w-5xl
        mx-auto
        px-4
        sm:px-6
        py-8
      "
    >
      <PageHeader
        title={isEditMode ? "Edit Job Listing" : "Post a New Job"}
        subtitle={isEditMode ? "Modify details of the job listing." : "Fill in the details below to publish a new job."}
      />

      <Card>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Input
            label="Job Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Frontend Developer"
            required
          />

          <Input
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="TechNova"
            required
          />

          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Hyderabad"
            required
          />

          <Select
            label="Job Type"
            name="job_type"
            value={form.job_type}
            onChange={handleChange}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </Select>

          <Input
            label="Salary (Annual in INR)"
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
            placeholder="800000"
            required
          />

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="6"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job description..."
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Requirements
            </label>
            <textarea
              name="requirements"
              rows="5"
              value={form.requirements}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Requirements..."
              required
            />
          </div>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-end
              gap-3
            "
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/employer/jobs")}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : (isEditMode ? "Update Job" : "Publish Job")}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}