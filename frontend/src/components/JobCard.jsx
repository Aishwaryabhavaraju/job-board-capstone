import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {job.title}
          </h2>

          <p className="text-gray-600 mt-1">
            {job.company}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
          {job.jobType}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-gray-600">
        <p>📍 {job.location}</p>
        <p>💰 {job.salary}</p>
      </div>

      <Link
        to={`/jobs/${job.id}`}
        className="mt-5 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}