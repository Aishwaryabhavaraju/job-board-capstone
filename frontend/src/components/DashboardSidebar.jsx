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
    <aside
      className="
        w-full
        md:w-64
        bg-slate-900
        text-white
        p-6
        md:min-h-screen
      "
    >
      <h1 className="text-2xl font-bold mb-10">
        JobBoard
      </h1>

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

    </aside>
  );
}