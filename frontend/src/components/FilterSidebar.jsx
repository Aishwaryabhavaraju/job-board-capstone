export default function FilterSidebar({
  jobType,
  setJobType,
  experience,
  setExperience,
  salary,
  setSalary,
  handleClear,
}) {
  return (
    <aside className="bg-white shadow-md rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Filters
      </h2>

      {/* Job Type */}
      <div className="mb-5">
        <label className="block font-medium mb-2">
          Job Type
        </label>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="All">All</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <label className="block font-medium mb-2">
          Experience
        </label>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="Any">Any</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 Years">1–3 Years</option>
          <option value="3-5 Years">3–5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
      </div>

      {/* Salary */}
      <div className="mb-5">
        <label className="block font-medium mb-2">
          Salary Range
        </label>

        <select
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="Any">Any</option>
          <option value="0-300000">Under ₹3 LPA</option>
          <option value="300000-500000">₹3–5 LPA</option>
          <option value="500000-1000000">₹5–10 LPA</option>
          <option value="1000000-2000000">₹10–20 LPA</option>
          <option value="2000000-99999999">₹20+ LPA</option>
        </select>
      </div>

      {/* Clear */}
      <button
        onClick={handleClear}
        className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg py-2 transition"
      >
        Clear Filters
      </button>

    </aside>
  );
}