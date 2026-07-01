import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        border
        p-6
        h-full
        flex
        flex-col
        justify-between
      "
    >
      {/* Company */}
      <p className="text-sm text-blue-600 font-medium">
        {job.company}
      </p>

      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-800 mt-2">
        {job.title}
      </h2>

      {/* Location */}
      <p className="text-gray-500 mt-2">
        📍 {job.location}
      </p>

      {/* Job Type & Salary */}
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-3
          mt-5
        "
      >
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {job.jobType}
        </span>

        <span className="font-semibold text-green-600">
          {job.salary}
        </span>
      </div>

      {/* Button */}
      <Link
        to={`/jobs/${job.id}`}
        className="block text-center mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        View Details
      </Link>
    </div>
  );
}