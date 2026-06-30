export default function SearchBar({
  search,
  setSearch,
  location,
  setLocation,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Job title or keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
}