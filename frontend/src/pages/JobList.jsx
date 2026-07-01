import { useState, useEffect } from "react";
import { BASE_URL } from "../context/AuthContext";

import JobCard from "../components/JobCard";
import JobCardSkeleton from "../components/JobCardSkeleton";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const [experience, setExperience] = useState("Any");
  const [salary, setSalary] = useState("Any");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/jobs/`);
      if (res.ok) {
        const data = await res.json();
        // Backend returns an array or paginated response. If it's a list:
        const jobList = Array.isArray(data) ? data : (data.results || []);
        // Transform backend fields to match frontend JobCard key expectations if needed
        const formatted = jobList.map(j => ({
          id: j.id,
          title: j.title,
          company: j.company,
          location: j.location,
          // Format salary to readable format if number
          salary: isNaN(j.salary) ? j.salary : `₹${Math.round(j.salary).toLocaleString("en-IN")}`,
          salaryVal: Number(j.salary),
          jobType: j.job_type,
          description: j.description,
          requirements: j.requirements,
          posted_by: j.posted_by,
        }));
        setJobs(formatted);
        setFilteredJobs(formatted);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    let result = [...jobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          (j.description && j.description.toLowerCase().includes(q))
      );
    }

    if (location.trim()) {
      const loc = location.toLowerCase();
      result = result.filter((j) => j.location.toLowerCase().includes(loc));
    }

    if (jobType !== "All") {
      result = result.filter((j) => j.jobType === jobType);
    }

    // Since experience field on backend jobs doesn't exist, we filter if matching requirements or skip
    if (experience !== "Any") {
      const expQ = experience.toLowerCase();
      result = result.filter(
        (j) =>
          (j.requirements && j.requirements.toLowerCase().includes(expQ)) ||
          (j.description && j.description.toLowerCase().includes(expQ))
      );
    }

    if (salary !== "Any") {
      const [min, max] = salary.split("-").map(Number);
      result = result.filter((j) => j.salaryVal >= min && j.salaryVal <= max);
    }

    setFilteredJobs(result);
  };

  // Run filter logic whenever filter variables or jobs list updates
  useEffect(() => {
    handleSearch();
  }, [search, location, jobType, experience, salary, jobs]);

  const handleClear = () => {
    setSearch("");
    setLocation("");
    setJobType("All");
    setExperience("Any");
    setSalary("Any");
  };

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
          <FilterSidebar
            jobType={jobType}
            setJobType={setJobType}
            experience={experience}
            setExperience={setExperience}
            salary={salary}
            setSalary={setSalary}
            handleClear={handleClear}
          />
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

            ) : filteredJobs.length === 0 ? (

              <div className="col-span-full text-center py-20 bg-white rounded-xl shadow border">

                <h2 className="text-2xl font-bold text-gray-700">
                  No Jobs Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try another search or reset your filters.
                </p>

              </div>

            ) : (

              filteredJobs.map((job) => (
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