import { useState } from "react";

import JobCard from "../components/JobCard";
import JobCardSkeleton from "../components/JobCardSkeleton";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import EmptyState from "../components/ui/EmptyState";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-4
          gap-8
        "
      >

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Job Grid */}
        <div className="lg:col-span-3">
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {loading ? (

              Array.from({ length: 6 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))

            ) : jobs.length === 0 ? (

              <div className="col-span-full text-center py-20">

                <h2 className="text-2xl font-bold">
                  No Jobs Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try another search.
                </p>

              </div>

            ) : (

              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))

            )}

          </div>
        </div>

      </div>

    </div>
  );
}