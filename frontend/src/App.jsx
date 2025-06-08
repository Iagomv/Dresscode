import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/public/LoginPage'
import Layout from './layout/Layout'
import ProfilePage from './pages/private/ProfilePage'
import Home from './pages/public/Home'
import PrivateHome from './pages/private/Home'
import About from './pages/public/About'
import Activities from './pages/public/Activities'
import { Events } from './pages/public/Events'
import { UserManagement } from './pages/private/admin/UserManagement'
import { AdminEventManagement } from './pages/private/admin/AdminEventManagement'
import { AdminClothingManagement } from './pages/private/admin/AdminClothingManagement'
import { PATHS } from './constants/routes'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path={PATHS.slash} element={<Home />} />
        <Route path={PATHS.login} element={<LoginPage />} />
        <Route path={PATHS.events} element={<Events />} />
        <Route path={PATHS.about} element={<About />} />
        <Route path={PATHS.activities} element={<Activities />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path={PATHS.dresscode.home}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<PrivateHome />} />
        <Route path={PATHS.dresscode.profile} element={<ProfilePage />} />
        <Route path={PATHS.dresscode.admin.userManagement} element={<UserManagement />} />
        <Route path={PATHS.dresscode.admin.eventManagement} element={<AdminEventManagement />} />
        <Route path={PATHS.dresscode.admin.clothingManagement} element={<AdminClothingManagement />} />
      </Route>

      {/* Catch-all redirect to "/"  */}
      <Route path="*" element={<Navigate to={PATHS.slash} replace />} />
    </Routes>
  )
}

export default App
