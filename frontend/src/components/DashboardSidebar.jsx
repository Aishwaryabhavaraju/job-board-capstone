import { NavLink } from "react-router-dom";

export default function DashboardSidebar({ role = "candidate" }) {
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
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        JobBoard
      </h1>

      <nav className="space-y-3">

        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}