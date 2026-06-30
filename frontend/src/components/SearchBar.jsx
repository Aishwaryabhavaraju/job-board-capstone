export default function SearchBar({
  search,
  setSearch,
  location,
  setLocation,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-8">
      <div className="grid gap-4 md:grid-cols-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          🔍 Search Jobs
        </button>

      </div>
    </div>
  );
}