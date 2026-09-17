import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/", { replace: true });
  };

  // Map backend role to role string
  const userRole = user?.role === "job_seeker" ? "candidate" : user?.role;

  // Strict link active class calculation - only exact match highlights
  const isLinkActive = (path, end = false) => {
    if (end) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path, end = false) => {
    const active = isLinkActive(path, end);
    return `px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1.5 ${
      active
        ? "bg-blue-50 text-blue-600 font-semibold border-b-2 border-blue-600 shadow-sm"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
    }`;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 tracking-tight hover:opacity-90 transition"
          >
            <span className="bg-blue-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20">
              J
            </span>
            <span>Job<span className="text-gray-900">Board</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={() => getLinkClass("/", true)}>
              Home
            </NavLink>

            <NavLink to="/jobs" className={() => getLinkClass("/jobs")}>
              Search Jobs
            </NavLink>

            {user && userRole === "candidate" && (
              <>
                <NavLink to="/candidate/dashboard" className={() => getLinkClass("/candidate/dashboard", true)}>
                  Dashboard
                </NavLink>

                <NavLink to="/candidate/applications" className={() => getLinkClass("/candidate/applications")}>
                  My Applications
                </NavLink>

                <NavLink to="/candidate/saved" className={() => getLinkClass("/candidate/saved")}>
                  Saved Jobs
                </NavLink>

                <NavLink to="/profile" className={() => getLinkClass("/profile")}>
                  Profile
                </NavLink>
              </>
            )}

            {user && userRole === "employer" && (
              <>
                <NavLink to="/employer/dashboard" className={() => getLinkClass("/employer/dashboard", true)}>
                  Dashboard
                </NavLink>

                <NavLink to="/employer/jobs" end className={() => getLinkClass("/employer/jobs", true)}>
                  My Jobs
                </NavLink>

                <NavLink to="/employer/jobs/new" className={() => getLinkClass("/employer/jobs/new")}>
                  Post a Job
                </NavLink>

                <NavLink to="/employer/applications" className={() => getLinkClass("/employer/applications")}>
                  Applications
                </NavLink>

                <NavLink to="/profile" className={() => getLinkClass("/profile")}>
                  Company Profile
                </NavLink>
              </>
            )}
          </nav>

          {/* Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-800">{user.username}</p>
                  <p className="text-[10px] text-blue-600 font-medium capitalize">{userRole}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition border border-red-200 hover:border-red-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold rounded-lg transition ${
                      isActive ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-blue-500/20 transition duration-200"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={() => getLinkClass("/", true)}
          >
            Home
          </NavLink>

          <NavLink
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className={() => getLinkClass("/jobs")}
          >
            Search Jobs
          </NavLink>

          {user && userRole === "candidate" && (
            <>
              <NavLink
                to="/candidate/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/candidate/dashboard", true)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/candidate/applications"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/candidate/applications")}
              >
                My Applications
              </NavLink>
              <NavLink
                to="/candidate/saved"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/candidate/saved")}
              >
                Saved Jobs
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/profile")}
              >
                Profile
              </NavLink>
            </>
          )}

          {user && userRole === "employer" && (
            <>
              <NavLink
                to="/employer/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/employer/dashboard", true)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/employer/jobs"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/employer/jobs", true)}
              >
                My Jobs
              </NavLink>
              <NavLink
                to="/employer/jobs/new"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/employer/jobs/new")}
              >
                Post a Job
              </NavLink>
              <NavLink
                to="/employer/applications"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/employer/applications")}
              >
                Applications
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={() => getLinkClass("/profile")}
              >
                Company Profile
              </NavLink>
            </>
          )}

          {user ? (
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                <p className="text-xs text-blue-600 capitalize">{userRole}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold border border-red-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}