import { useState } from "react";

import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
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
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <FilterSidebar />

        <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </>
  );
}