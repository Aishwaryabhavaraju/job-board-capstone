export default function FilterSidebar() {
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

        <select className="w-full border rounded-lg p-2">
          <option>All</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Remote</option>
          <option>Internship</option>
        </select>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <label className="block font-medium mb-2">
          Experience
        </label>

        <select className="w-full border rounded-lg p-2">
          <option>Any</option>
          <option>Fresher</option>
          <option>1–3 Years</option>
          <option>3–5 Years</option>
          <option>5+ Years</option>
        </select>
      </div>

      {/* Salary */}
      <div className="mb-5">
        <label className="block font-medium mb-2">
          Salary
        </label>

        <select className="w-full border rounded-lg p-2">
          <option>Any</option>
          <option>₹3–5 LPA</option>
          <option>₹5–10 LPA</option>
          <option>₹10–20 LPA</option>
          <option>₹20+ LPA</option>
        </select>
      </div>

      {/* Clear */}
      <button
        className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg py-2"
      >
        Clear Filters
      </button>

    </aside>
  );
}