import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold text-gray-800">
        Find Your Dream Job
      </h1>

      <p className="mt-6 text-gray-600 text-lg">
        Search thousands of jobs from top companies across India.
      </p>

      <div className="mt-8">
        <Link
          to="/jobs"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Explore Jobs
        </Link>
      </div>
    </section>
  );
}