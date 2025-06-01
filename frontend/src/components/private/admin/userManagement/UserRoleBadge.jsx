import React from 'react'

export const UserRoleBadge = ({ role }) => {
  const roleStyles = {
    ADMIN: 'bg-purple-100 text-purple-800',
    TEACHER: 'bg-blue-100 text-blue-800',
    STUDENT: 'bg-green-100 text-green-800',
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleStyles[role]}`}>{role}</span>
}
