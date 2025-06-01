import React from 'react'

export const UserStatusBadge = ({ active }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
  >
    {active ? 'Active' : 'Inactive'}
  </span>
)
