import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardSidebar({ role = "candidate" }) {
  const { user, logout } = useAuth();
  
  const employerLinks = [
    { name: "Dashboard", path: "/employer/dashboard" },
    { name: "Post Job", path: "/employer/jobs/new" },
    { name: "My Jobs", path: "/employer/jobs" },
    { name: "Applications", path: "/employer/applications" },
  ];

  const candidateLinks = [
    { name: "Dashboard", path: "/candidate/dashboard" },
    { name: "Browse Jobs", path: "/jobs" },
    { name: "Applied Jobs", path: "/candidate/applications" },
    { name: "Saved Jobs", path: "/candidate/saved" },
  ];

  const links = role === "employer" ? employerLinks : candidateLinks;

  return (
    <aside
      className="
        w-full
        md:w-64
        bg-slate-900
        text-white
        p-6
        md:min-h-screen
        flex
        flex-col
        justify-between
      "
    >
      <div>
        <h1 className="text-2xl font-bold mb-6">
          JobBoard
        </h1>

        {user && (
          <div className="mb-8 p-3 bg-slate-800/60 border border-slate-700/50 rounded-lg text-sm text-slate-300">
            Hi, <span className="font-semibold text-white">{user.username}</span>
          </div>
        )}

        <nav
          className="
            flex
            md:block
            gap-3
            overflow-x-auto
            md:overflow-visible
            whitespace-nowrap
          "
        >

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                px-4
                py-3
                rounded-lg
                transition
                inline-block
                md:block
                mb-1
                ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }
              `
              }
            >
              {link.name}
            </NavLink>
          ))}

        </nav>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-slate-850 hover:text-red-300 hover:bg-slate-800 transition font-medium flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>

    </aside>
  );
}