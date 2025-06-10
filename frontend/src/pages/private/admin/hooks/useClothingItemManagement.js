import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { clothingItemService } from '../../../../service/clothingItemService'
import { performApiAction } from '../../../../utils/ApiUtils'

export const useClothingItemManagement = () => {
  const [clothingItems, setClothingItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [clothingItemIdToDelete, setClothingItemIdToDelete] = useState(null)
  const { t } = useTranslation('common')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [clothingItemToEdit, setClothingItemToEdit] = useState(null)
  const newSuccessMessage = (messageKey) => `Event ${t(messageKey)}`

  const fetchClothingItems = () =>
    performApiAction(() => clothingItemService.fetchClothingItems(), {
      errorMessage: t('error.fetch'),
      onSuccess: setClothingItems,
      setLoading,
    })

  useEffect(() => {
    fetchClothingItems()
  }, [])

  const createClothingItem = (itemData) =>
    performApiAction(() => clothingItemService.createClothingItem(itemData), {
      successMessage: newSuccessMessage('success.created'),
      errorMessage: t('error.create'),
      onSuccess: (newClothingItem) => setClothingItems((prev) => [...prev, newClothingItem]),
      setLoading,
    })

  const updateClothingItem = (id, itemData) =>
    performApiAction(() => clothingItemService.updateClothingItem(id, itemData), {
      successMessage: newSuccessMessage('success.updated'),
      errorMessage: t('error.update'),
      onSuccess: () => setClothingItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...itemData } : item))),
      setLoading,
    })

  const requestDelete = (id) => {
    setClothingItemIdToDelete(id)
    setShowConfirmModal(true)
  }

  const confirmDelete = () => {
    if (!clothingItemIdToDelete) return Promise.resolve()
    return performApiAction(() => clothingItemService.deleteClothingItem(clothingItemIdToDelete), {
      successMessage: newSuccessMessage('success.deleted'),
      errorMessage: t('error.event'),
      onSuccess: () => setClothingItems((prev) => prev.filter((item) => item.id !== clothingItemIdToDelete)),
      setLoading,
    }).finally(() => {
      setShowConfirmModal(false)
      setClothingItemIdToDelete(null)
    })
  }

  const requestUpdate = (item) => {
    setClothingItemToEdit(item)
    setShowUpdateModal(true)
  }

  const cancelUpdate = () => {
    setClothingItemToEdit(null)
    setShowUpdateModal(false)
  }

  const confirmUpdate = async (id, itemData) => {
    await updateClothingItem(id, itemData)
    cancelUpdate()
  }

  const cancelDelete = () => {
    setShowConfirmModal(false)
    setClothingItemIdToDelete(null)
  }

  return {
    clothingItems,
    loading,
    createClothingItem,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    updateClothingItem,
    showUpdateModal,
    clothingItemToEdit,
    requestUpdate,
    cancelUpdate,
    confirmUpdate,
    refetch: fetchClothingItems,
  }
}
