import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/public/LoginPage";
import Layout from "./layout/Layout";
import ProfilePage from "./pages/private/ProfilePage";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Activities from "./pages/public/Activities";
import { PATHS } from "./constants/routes";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path={PATHS.slash} element={<Home />} />
        <Route path={PATHS.login} element={<LoginPage />} />
        <Route path={PATHS.about} element={<About />} />
        <Route path={PATHS.activities} element={<Activities />} />
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
        <Route path={PATHS.dresscode.profile} element={<ProfilePage />} />
      </Route>

      {/* Catch-all redirect to "/"  */}
      <Route path="*" element={<Navigate to={PATHS.slash} replace />} />
    </Routes>
  );
}

export default App;
