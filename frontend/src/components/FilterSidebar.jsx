export default function FilterSidebar({
  jobType,
  setJobType,
  experience,
  setExperience,
  salary,
  setSalary,
  location,
  setLocation,
  handleClear,
}) {
  const defaultLocations = [
    "Remote",
    "Bengaluru",
    "Hyderabad",
    "Mumbai",
    "Delhi NCR",
    "Pune",
    "Chennai",
    "San Francisco, CA",
    "New York, NY",
    "London, UK",
    "Austin, TX",
  ];

  return (
    <aside className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 sticky top-24">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span>⚡</span> Filter Jobs
        </h2>
        <button
          onClick={handleClear}
          className="text-xs text-blue-600 font-semibold hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Location Filter Dropdown */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          📍 Location
        </label>
        <select
          value={location || ""}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-white"
        >
          <option value="">All Locations</option>
          {defaultLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          💼 Employment Type
        </label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-white"
        >
          <option value="All">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          🎓 Experience Level
        </label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-white"
        >
          <option value="Any">Any Experience</option>
          <option value="Fresher">Fresher / Entry Level</option>
          <option value="1-3 Years">1–3 Years</option>
          <option value="3-5 Years">3–5 Years</option>
          <option value="5+ Years">5+ Years (Senior)</option>
        </select>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          💰 Salary Expectation
        </label>
        <select
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-white"
        >
          <option value="Any">Any Salary</option>
          <option value="0-300000">Under ₹3 LPA</option>
          <option value="300000-500000">₹3–5 LPA</option>
          <option value="500000-1000000">₹5–10 LPA</option>
          <option value="1000000-2000000">₹10–20 LPA</option>
          <option value="2000000-99999999">₹20+ LPA</option>
        </select>
      </div>

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl py-2.5 text-sm transition"
      >
        Clear All Filters
      </button>
    </aside>
  );
}