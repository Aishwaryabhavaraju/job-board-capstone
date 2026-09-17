import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../context/AuthContext";

import JobCard from "../components/JobCard";
import JobCardSkeleton from "../components/JobCardSkeleton";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";

export default function JobList() {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialLoc = searchParams.get("loc") || "";

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState(initialQ);
  const [location, setLocation] = useState(initialLoc);
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
        const jobList = Array.isArray(data) ? data : (data.results || []);
        const formatted = jobList.map((j) => ({
          id: j.id,
          title: j.title,
          company: j.company,
          company_url: j.company_url,
          location: j.location,
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

  // Get unique locations from actual jobs
  const availableLocations = Array.from(new Set(jobs.map((j) => j.location).filter(Boolean)));

  return (
    <div className="py-6 max-w-7xl mx-auto px-4">

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Job Openings
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Discover your next career opportunity from top verified employers
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-sm font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl">
          Showing <span className="text-blue-600 font-bold">{filteredJobs.length}</span> jobs
        </div>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        availableLocations={availableLocations}
        onSearchSubmit={handleSearch}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar Filter */}
        <div className="lg:col-span-1">
          <FilterSidebar
            jobType={jobType}
            setJobType={setJobType}
            experience={experience}
            setExperience={setExperience}
            salary={salary}
            setSalary={setSalary}
            location={location}
            setLocation={setLocation}
            handleClear={handleClear}
          />
        </div>

        {/* Job Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {loading ? (

              Array.from({ length: 6 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))

            ) : filteredJobs.length === 0 ? (

              <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  🔍
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  No Matching Jobs Found
                </h2>

                <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
                  We couldn't find any jobs matching your current filter criteria. Try adjusting location or keyword parameters.
                </p>

                <button
                  onClick={handleClear}
                  className="mt-6 bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
                >
                  Reset All Filters
                </button>

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