import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { AdminHome } from './admin/AdminHome'
import { StudentHome } from './student/home/Home'

export default function Home() {
  const { auth } = useAuth()

  const role = auth?.user?.role?.replace('ROLE_', '') || null

  if (!role) {
    return <div>NO ROLE ERROR</div>
  }

  switch (role.toUpperCase()) {
    case 'STUDENT':
      return <StudentHome />
    case 'TEACHER':
      return <div>TEACHER HOME</div>
    case 'ADMIN':
      return <AdminHome />

    default:
      return <div>UNKNOWN ERROR</div>
  }
}
