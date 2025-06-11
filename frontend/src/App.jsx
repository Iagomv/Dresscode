import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { LoginPage, Home, About, Events, Activities } from './pages/public/PublicIndex'
import { UserManagement, EventManagement, ClothingManagement, LoanManagement } from './pages/private/admin/PrivateAdminIndex'
import { StudentClothing, StudentClasses } from './pages/private/student/studentIndex'

import Layout from './layout/Layout'
import ProfilePage from './pages/private/ProfilePage'
import PrivateHome from './pages/private/Home'
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
        <Route path={PATHS.dresscode.admin.eventManagement} element={<EventManagement />} />
        <Route path={PATHS.dresscode.admin.clothingManagement} element={<ClothingManagement />} />
        <Route path={PATHS.dresscode.admin.loanManagement} element={<LoanManagement />} />
        <Route path={PATHS.dresscode.student.clothing} element={<StudentClothing />} />
        <Route path={PATHS.dresscode.student.classes} element={<StudentClasses />} />
      </Route>

      {/* Catch-all redirect to "/"  */}
      <Route path="*" element={<Navigate to={PATHS.slash} replace />} />
    </Routes>
  )
}

export default App
