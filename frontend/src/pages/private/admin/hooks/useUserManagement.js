import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import userService from '../service/userService'
import { performApiAction } from '../../../../utils/ApiUtils'
export const useUserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState(null)
  const { t } = useTranslation('common')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)

  // Generic wrapper to handle loading, errors, and toast

  const fetchUsers = () =>
    performApiAction(() => userService.fetchUsers(), {
      errorMessage: t('error.fetch'),
      onSuccess: setUsers,
      setLoading,
    })

  useEffect(() => {
    fetchUsers()
  }, [])

  const createUser = (userData) =>
    performApiAction(() => userService.createUser(userData), {
      successMessage: newSuccessMessage('success.created'),
      errorMessage: t('error.create'),
      onSuccess: (newUser) => setUsers((prev) => [...prev, newUser]),
      setLoading,
    })

  const updateUser = (id, userData) =>
    performApiAction(() => userService.updateUser(id, userData), {
      successMessage: newSuccessMessage('success.updated'),
      errorMessage: t('error.update'),
      onSuccess: () => setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...userData } : user))),
      setLoading,
    })

  const toggleStatus = (id) =>
    performApiAction(() => userService.toggleUserStatus(id), {
      successMessage: newSuccessMessage('success.updated'),
      errorMessage: t('error.user'),
      onSuccess: () => setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user))),
      setLoading,
    })

  const requestDelete = (id) => {
    setUserIdToDelete(id)
    setShowConfirmModal(true)
  }

  const confirmDelete = () => {
    if (!userIdToDelete) return Promise.resolve()
    return performApiAction(() => userService.deleteUser(userIdToDelete), {
      successMessage: newSuccessMessage('success.deleted'),
      errorMessage: t('error.user'),
      onSuccess: () => setUsers((prev) => prev.filter((user) => user.id !== userIdToDelete)),
      setLoading,
    }).finally(() => {
      setShowConfirmModal(false)
      setUserIdToDelete(null)
    })
  }

  const requestUpdate = (user) => {
    setUserToEdit(user)
    setShowUpdateModal(true)
  }

  const cancelUpdate = () => {
    setUserToEdit(null)
    setShowUpdateModal(false)
  }

  // === New: Confirm update ===
  const confirmUpdate = async (id, userData) => {
    await updateUser(id, userData)
    cancelUpdate()
  }

  const cancelDelete = () => {
    setShowConfirmModal(false)
    setUserIdToDelete(null)
  }

  const newSuccessMessage = (messageKey) => `Usuario ${t(messageKey)}`

  return {
    users,
    loading,
    createUser,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    toggleStatus,
    updateUser,
    showUpdateModal,
    userToEdit,
    requestUpdate,
    cancelUpdate,
    confirmUpdate,
    refetch: fetchUsers,
  }
}
