export default function SearchBar({
  search,
  setSearch,
  location,
  setLocation,
  availableLocations = [],
  onSearchSubmit,
}) {
  // Common locations list
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

  // Combine available locations with defaults
  const locationOptions = Array.from(
    new Set([...defaultLocations, ...availableLocations.filter(Boolean)])
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (onSearchSubmit) onSearchSubmit();
        }}
        className="grid gap-4 md:grid-cols-12 items-center"
      >

        {/* Search Keywords */}
        <div className="md:col-span-5 relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Job title, skills, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50/50 hover:bg-white transition"
          />
        </div>

        {/* Location Select Dropdown */}
        <div className="md:col-span-4 relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            📍
          </span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50/50 hover:bg-white transition appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 text-xs">
            ▼
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 text-sm"
          >
            Search Jobs
          </button>
        </div>

      </form>
    </div>
  );
}