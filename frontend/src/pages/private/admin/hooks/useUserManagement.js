import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import userService from '../service/userService'

export const useUserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState(null)
  const { t } = useTranslation('common')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)

  // Generic wrapper to handle loading, errors, and toast
  const performApiAction = async (apiCall, { successMessage, errorMessageKey, onSuccess }) => {
    setLoading(true)
    try {
      const result = await apiCall()
      if (successMessage) toast.success(successMessage)
      if (onSuccess) onSuccess(result)
      return result
    } catch (err) {
      console.log(err)
      toast.error(t(errorMessageKey) + '\n' + (err?.response?.data?.message || ''))
      throw err // re-throw in case caller wants to catch
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = () =>
    performApiAction(() => userService.fetchUsers(), {
      errorMessageKey: 'error.fetch',
      onSuccess: setUsers,
    })

  useEffect(() => {
    fetchUsers()
  }, [])

  const createUser = (userData) =>
    performApiAction(() => userService.createUser(userData), {
      successMessage: t('user.created'),
      errorMessageKey: 'error.create',
      onSuccess: (newUser) => setUsers((prev) => [...prev, newUser]),
    })

  const updateUser = (id, userData) =>
    performApiAction(() => userService.updateUser(id, userData), {
      successMessage: t('user.updated'),
      errorMessageKey: 'error.update',
      onSuccess: () => setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...userData } : user))),
    })

  const toggleStatus = (id) =>
    performApiAction(() => userService.toggleUserStatus(id), {
      successMessage: t('user.updated'),
      errorMessageKey: 'error.user',
      onSuccess: () => setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user))),
    })

  const requestDelete = (id) => {
    setUserIdToDelete(id)
    setShowConfirmModal(true)
  }

  const confirmDelete = () => {
    if (!userIdToDelete) return Promise.resolve()
    return performApiAction(() => userService.deleteUser(userIdToDelete), {
      successMessage: t('user.deleted'),
      errorMessageKey: 'error.user',
      onSuccess: () => setUsers((prev) => prev.filter((user) => user.id !== userIdToDelete)),
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
