import JobCard from "./JobCard";

const featuredJobs = [
  {
    id: 1,
    title: "React Developer",
    company: "Google",
    location: "Bangalore",
    salary: "₹18 LPA",
    jobType: "Full Time",
  },
  {
    id: 2,
    title: "Python Developer",
    company: "Microsoft",
    location: "Hyderabad",
    salary: "₹16 LPA",
    jobType: "Remote",
  },
  {
    id: 3,
    title: "UI Designer",
    company: "Adobe",
    location: "Pune",
    salary: "₹12 LPA",
    jobType: "Hybrid",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">
        Featured Jobs
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}