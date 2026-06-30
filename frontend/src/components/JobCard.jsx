import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
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
      <div className="flex justify-between items-center mt-4">
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