import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const getLinkClass = ({ isActive }) =>
    `font-medium transition pb-1 border-b-2 ${
      isActive
        ? "text-blue-600 border-blue-600 font-semibold"
        : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-400"
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          JobBoard
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={getLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/jobs"
            className={getLinkClass}
          >
            Jobs
          </NavLink>

          {user ? (
            <>
              <NavLink
                to={user.role === "employer" ? "/employer/dashboard" : "/candidate/dashboard"}
                className={getLinkClass}
              >
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={getLinkClass}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition font-medium ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}