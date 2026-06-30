import { useParams } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Hyderabad",
    salary: "₹8 LPA",
    jobType: "Full Time",
    experience: "1-3 Years",
    description:
      "We are looking for a Frontend Developer proficient in React.js to build responsive web applications.",
    requirements: [
      "Strong knowledge of React.js",
      "JavaScript ES6+",
      "HTML & CSS",
      "REST APIs",
    ],
    benefits: [
      "Health Insurance",
      "Flexible Working Hours",
      "Paid Leave",
      "Learning Budget",
    ],
  },
];

export default function JobDetail() {
  const { id } = useParams();

  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold">Job Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">

      {/* Header */}
      <div className="bg-white shadow rounded-xl p-8">

        <p className="text-blue-600 font-semibold">
          {job.company}
        </p>

        <h1 className="text-4xl font-bold mt-2">
          {job.title}
        </h1>

        <div className="flex flex-wrap gap-3 mt-5">

          <span className="bg-gray-100 px-4 py-2 rounded-full">
            📍 {job.location}
          </span>

          <span className="bg-gray-100 px-4 py-2 rounded-full">
            💰 {job.salary}
          </span>

          <span className="bg-gray-100 px-4 py-2 rounded-full">
            💼 {job.jobType}
          </span>

          <span className="bg-gray-100 px-4 py-2 rounded-full">
            ⭐ {job.experience}
          </span>

        </div>

        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
          Apply Now
        </button>

      </div>

      {/* Description */}
      <div className="bg-white shadow rounded-xl p-8 mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Job Description
        </h2>

        <p className="text-gray-700">
          {job.description}
        </p>

      </div>

      {/* Requirements */}
      <div className="bg-white shadow rounded-xl p-8 mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Requirements
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          {job.requirements.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>

      </div>

      {/* Benefits */}
      <div className="bg-white shadow rounded-xl p-8 mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Benefits
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          {job.benefits.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}