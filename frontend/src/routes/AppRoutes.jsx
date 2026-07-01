import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Map job_seeker to candidate
  const userRole = user.role === "job_seeker" ? "candidate" : user.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const redirectPath = userRole === "employer" ? "/employer/dashboard" : "/candidate/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Route>

      {/* Authentication Pages - redirect if already logged in */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={user.role === "employer" ? "/employer/dashboard" : "/candidate/dashboard"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          user ? (
            <Navigate
              to={user.role === "employer" ? "/employer/dashboard" : "/candidate/dashboard"}
              replace
            />
          ) : (
            <Register />
          )
        }
      />

      {/* Employer Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <DashboardLayout role="employer" />
          </ProtectedRoute>
        }
      >
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/jobs/new" element={<PostJob />} />
        <Route path="/employer/jobs/edit/:id" element={<PostJob />} />
        <Route path="/employer/jobs" element={<MyJobs />} />
        <Route path="/employer/applications" element={<EmployerApplications />} />
      </Route>

      {/* Candidate Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <DashboardLayout role="candidate" />
          </ProtectedRoute>
        }
      >
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/applications" element={<AppliedJobs />} />
        <Route path="/candidate/saved" element={<SavedJobs />} />
      </Route>

    </Routes>
  );
}