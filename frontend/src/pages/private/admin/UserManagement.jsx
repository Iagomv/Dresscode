import React, { useState } from 'react'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'
import { useUserManagement } from './hooks/useUserManagement'
import { SearchFilter } from '../../../components/private/common/SearchFilter'
import { CreateUserButton } from '../../../components/private/admin/userManagement/CreateUserButton'
import { UserTable } from '../../../components/private/admin/userManagement/UserTable'
import { ConfirmDeleteModal } from '../../../components/private/common/ConfirmDeleteModal'
import { UpdateUserModal } from '../../../components/private/admin/userManagement/modal/UpdateUserModal'
import { useTranslation } from 'react-i18next'
export const UserManagement = () => {
  const { t } = useTranslation('admin')
  const {
    users,
    loading,
    refetch,
    createUser,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    toggleStatus,
    showUpdateModal,
    userToEdit,
    requestUpdate,
    cancelUpdate,
    confirmUpdate,
  } = useUserManagement()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="user-management d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row gap-3">
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholderText={t('userManagement.searchUsers')} />
        <CreateUserButton onCreate={createUser} onSuccess={refetch} />
      </div>
      <UserTable users={filteredUsers} requestUpdate={requestUpdate} requestDelete={requestDelete} toggleStatus={toggleStatus} />
      <ConfirmDeleteModal show={showConfirmModal} onConfirm={confirmDelete} onCancel={cancelDelete} />
      {showUpdateModal && userToEdit && <UpdateUserModal user={userToEdit} onClose={cancelUpdate} onUpdate={confirmUpdate} />}
    </div>
  )
}
