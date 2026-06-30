import { useState } from "react";

import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";

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
    company: "CodeCraft",
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
  {
    id: 4,
    title: "Python Developer",
    company: "NextGen Solutions",
    location: "Pune",
    salary: "₹9 LPA",
    jobType: "Full Time",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    salary: "₹12 LPA",
    jobType: "Remote",
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Insight Analytics",
    location: "Mumbai",
    salary: "₹6 LPA",
    jobType: "Full Time",
  },
];

export default function JobList() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="py-10">

      <h1 className="text-4xl font-bold mb-8">
        Explore Jobs
      </h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
      />

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Job Grid */}
        <div className="lg:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}