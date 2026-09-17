import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../context/AuthContext";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/jobs/`);
        if (res.ok) {
          const data = await res.json();
          const jobList = Array.isArray(data) ? data : (data.results || []);
          setFeaturedJobs(jobList.slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching featured jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (locationQuery) params.append("loc", locationQuery);
    navigate(`/jobs?${params.toString()}`);
  };

  const categories = [
    { title: "Software Engineering", count: "1,240+ jobs", icon: "💻", bg: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "Product & Design", count: "850+ jobs", icon: "🎨", bg: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: "Marketing & Growth", count: "620+ jobs", icon: "📈", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { title: "Finance & Accounting", count: "430+ jobs", icon: "🏦", bg: "bg-amber-50 text-amber-600 border-amber-100" },
    { title: "Data & Analytics", count: "510+ jobs", icon: "📊", bg: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    { title: "Remote Opportunities", count: "980+ jobs", icon: "🌐", bg: "bg-rose-50 text-rose-600 border-rose-100" },
  ];

  return (
    <div className="space-y-20 pb-16">

      {/* Hero Section */}
      <section className="relative pt-6 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.50),white)] opacity-70" />
        
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Connecting 50,000+ Top Candidates with Leading Companies
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Find Your Dream Job & <span className="text-blue-600 underline decoration-blue-300 underline-offset-8">Build Your Career</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Search thousands of curated job listings from top verified startups, tech giants, and global enterprises in India and remote.
          </p>

          {/* Quick Hero Search Box */}
          <form
            onSubmit={handleHeroSearch}
            className="mt-10 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-12 gap-3 text-left max-w-3xl mx-auto"
          >
            <div className="sm:col-span-5 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Job title, skill, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
              />
            </div>

            <div className="sm:col-span-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                📍
              </span>
              <select
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full pl-10 pr-6 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 appearance-none cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="San Francisco, CA">San Francisco</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md shadow-blue-500/25 flex items-center justify-center gap-1"
              >
                Find Jobs
              </button>
            </div>
          </form>

          {/* Popular Tag Quick Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-700">Popular Searches:</span>
            {["React Developer", "Remote", "Full-Time", "Python", "Frontend"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?q=${tag}`)}
                className="bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 px-3 py-1 rounded-full transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-5xl font-extrabold text-blue-400">10,000+</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium">Active Job Openings</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-extrabold text-blue-400">500+</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium">Verified Hiring Companies</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-extrabold text-blue-400">50,000+</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium">Job Seekers Connected</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-extrabold text-blue-400">98%</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium">Successful Interview Matches</p>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Explore Top Categories</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Find roles suited to your skills across high-growth industries</p>
          </div>
          <Link to="/jobs" className="mt-4 md:mt-0 text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
            Browse All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/jobs`)}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${cat.bg}`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition text-base">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Job Openings</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Handpicked jobs from top employers looking for talent</p>
          </div>
          <Link to="/jobs" className="mt-4 md:mt-0 bg-blue-50 text-blue-600 hover:bg-blue-100 px-5 py-2.5 rounded-xl font-bold text-sm transition">
            View All Jobs ({featuredJobs.length})
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : featuredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border">
            <p className="text-gray-500">No jobs posted yet. Be the first employer to post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  ...job,
                  jobType: job.job_type,
                  salary: isNaN(job.salary) ? job.salary : `₹${Math.round(job.salary).toLocaleString("en-IN")}`,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50/80 rounded-3xl p-8 sm:p-14 border border-gray-200/60 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">How JobBoard Works</h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Simple 3-step process whether you are looking for your next career move or hiring top talent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xl mb-5 shadow-inner">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900">Create Profile</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Register an account, upload your resume, add your skills, education, and social links.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xl mb-5 shadow-inner">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900">Search & Bookmark</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Use our location dropdowns, salary filters, and 1-click Save Job feature to manage jobs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xl mb-5 shadow-inner">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900">Apply & Get Hired</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Submit applications directly to employers and track status updates live in your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-blue-600 text-white rounded-3xl p-10 sm:p-14 text-center shadow-xl shadow-blue-600/20 max-w-7xl mx-auto relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="mt-4 text-blue-100 text-base sm:text-lg">
            Join thousands of professionals already applying to top companies on JobBoard today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3.5 px-8 rounded-xl shadow-lg transition"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/jobs"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-8 rounded-xl transition border border-blue-500"
                >
                  Explore All Jobs
                </Link>
              </>
            ) : user.role === "employer" ? (
              <Link
                to="/employer/jobs/new"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3.5 px-8 rounded-xl shadow-lg transition"
              >
                Post a Job Now
              </Link>
            ) : (
              <Link
                to="/jobs"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3.5 px-8 rounded-xl shadow-lg transition"
              >
                Browse Job Listings
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}