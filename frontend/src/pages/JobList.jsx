import JobCard from "../components/JobCard";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Hyderabad",
    salary: "₹8 LPA",
    jobType: "Full Time",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "InnovateX",
    location: "Bangalore",
    salary: "₹10 LPA",
    jobType: "Remote",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "Chennai",
    salary: "₹7 LPA",
    jobType: "Hybrid",
  },
];

export default function JobList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}