import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import JobList from "../pages/JobList";
import JobDetail from "../pages/JobDetail";

import EmployerDashboard from "../pages/EmployerDashboard";
import CandidateDashboard from "../pages/CandidateDashboard";

import PostJob from "../pages/PostJob";
import MyJobs from "../pages/MyJobs";
import EmployerApplications from "../pages/EmployerApplications";
import AppliedJobs from "../pages/AppliedJobs";
import SavedJobs from "../pages/SavedJobs";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Route>

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Employer Dashboard */}
      <Route element={<DashboardLayout role="employer" />}>
        <Route
          path="/employer/dashboard"
          element={<EmployerDashboard />}
        />
      </Route>

      {/* Candidate Dashboard */}
      <Route element={<DashboardLayout role="candidate" />}>
        <Route
          path="/candidate/dashboard"
          element={<CandidateDashboard />}
        />
      </Route>

      <Route
        path="/employer/jobs/new"
        element={<PostJob />}
      />

      <Route
        path="/employer/jobs"
        element={<MyJobs />}
      />

      <Route
        path="/employer/applications"
        element={<EmployerApplications />}
      />

      <Route
        path="/candidate/applications"
        element={<AppliedJobs />}
      />

      <Route
        path="/candidate/saved"
        element={<SavedJobs />}
      />

    </Routes>
  );
}