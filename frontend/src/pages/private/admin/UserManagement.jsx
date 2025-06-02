import React, { useState } from 'react'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'
import { useUserManagement } from './hooks/useUserManagement'
import { UserFilters } from '../../../components/private/admin/userManagement/UserFilters'
import { CreateUserButton } from '../../../components/private/admin/userManagement/CreateUserButton'
import { UserTable } from '../../../components/private/admin/userManagement/UserTable'

export const UserManagement = () => {
  const { users, loading, error, refetch, createUser } = useUserManagement()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="user-management d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row gap-3">
        <UserFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CreateUserButton onCreate={createUser} onSuccess={refetch} />
      </div>

      <UserTable users={filteredUsers} />
    </div>
  )
}
