/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'
import { useClothingItemManagement } from './hooks/useClothingItemManagement'
import { SearchFilter } from '../../../components/private/common/SearchFilter'
import { CreateClothingItemButton } from '../../../components/private/admin/clothingItemManagement/CreateClothingItemButton'
import { useTranslation } from 'react-i18next'
import { ConfirmDeleteModal } from '../../../components/private/common/ConfirmDeleteModal'
import { UpdateClothingItemModal } from '../../../components/private/admin/clothingItemManagement/modal/UpdateClothingItemModal'
import { ClothingItemsTable } from '../../../components/private/admin/clothingItemManagement/ClothingItemsTable'
import { CreateClothingItemModal } from '../../../components/private/admin/clothingItemManagement/modal/CreateClothingItemModal'
export const AdminClothingManagement = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const { t } = useTranslation('admin')
  const {
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
    refetch,
  } = useClothingItemManagement()
  const [searchTerm, setSearchTerm] = useState('')
  const filteredClothingItems = clothingItems.filter((ci) =>
    `${ci.name} ${ci.color} ${ci.type} ${ci.size} ${ci.availability}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="user-management d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row align-self-start gap-3">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholderText={t('clothingItemManagement.searchClothingItems')}
        />
        <CreateClothingItemButton
          openModal={() => {
            setOpenCreateModal(true)
          }}
        />
        {openCreateModal && (
          <CreateClothingItemModal
            show={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            onCreate={createClothingItem}
          />
        )}
      </div>
      <ClothingItemsTable clothingItems={filteredClothingItems} requestUpdate={requestUpdate} requestDelete={requestDelete} />
      <ConfirmDeleteModal show={showConfirmModal} onConfirm={confirmDelete} onCancel={cancelDelete} />
      {showUpdateModal && clothingItemToEdit && (
        <UpdateClothingItemModal
          show={showUpdateModal}
          onClose={cancelUpdate}
          onUpdate={confirmUpdate}
          clothingItem={clothingItemToEdit}
        />
      )}
    </div>
  )
}
