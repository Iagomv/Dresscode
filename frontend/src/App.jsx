import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";
import IncidentsVisualizationPage from "./pages/user/IncidentsVisualizationPage";
import IncidentsRegisterPage from "./pages/user/IncidentsRegisterPage";
import ProfilePage from "./pages/ProfilePage";
import TechnicianIncidentsPage from "./pages/technician/TechnicianIncidentsPage";
import AdminUserManagement from "./pages/admin/AdminUserManagementPage";
import AdminAssigmentsPage from "./pages/admin/IncidentAssignmentPage";
import StatisticsPage from "./pages/admin/StatisticsPage";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Activities from "./pages/public/Activities";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities" element={<Activities />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dresscode"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="visualization" element={<IncidentsVisualizationPage />} />
        <Route
          path="assigned-incidents"
          element={<TechnicianIncidentsPage />}
        />
        <Route path="register" element={<IncidentsRegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="assignments" element={<AdminAssigmentsPage />} />
        <Route path="user-management" element={<AdminUserManagement />} />
        <Route path="statistics" element={<StatisticsPage />} />
      </Route>

      {/* Catch-all redirect to "/"  */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
