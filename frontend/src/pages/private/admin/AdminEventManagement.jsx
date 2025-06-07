/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'
import { useEventManagement } from './hooks/useEventManagement'
import { SearchFilter } from '../../../components/private/common/SearchFilter'
import { CreateEventButton } from '../../../components/private/admin/eventManagement/CreateEventButton'
import { useTranslation } from 'react-i18next'
import { EventsTable } from '../../../components/private/admin/eventManagement/EventsTable'
import { ConfirmDeleteModal } from '../../../components/private/common/ConfirmDeleteModal'
import { CreateEventModal } from '../../../components/private/admin/eventManagement/modal/CreateEventModal'
import { UpdateEventModal } from '../../../components/private/admin/eventManagement/modal/UpdateEventModal'
export const AdminEventManagement = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const { t } = useTranslation('admin')
  const {
    events,
    loading,
    refetch,
    createEvent,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    showUpdateModal,
    eventToEdit,
    requestUpdate,
    cancelUpdate,
    confirmUpdate,
  } = useEventManagement()
  const [searchTerm, setSearchTerm] = useState('')
  const filteredEvents = events.filter((e) =>
    `${e.title} ${e.location} ${e.status}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="user-management d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row gap-3">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholderText={t('eventManagement.searchEvents')}
        />
        <CreateEventButton
          openModal={() => {
            setOpenCreateModal(true)
          }}
        />
        {openCreateModal && (
          <CreateEventModal show={openCreateModal} onClose={() => setOpenCreateModal(false)} onCreate={createEvent} />
        )}
      </div>
      <EventsTable events={filteredEvents} requestUpdate={requestUpdate} requestDelete={requestDelete} />
      <ConfirmDeleteModal show={showConfirmModal} onConfirm={confirmDelete} onCancel={cancelDelete} />
      {showUpdateModal && eventToEdit && (
        <UpdateEventModal show={showUpdateModal} onClose={cancelUpdate} onUpdate={confirmUpdate} event={eventToEdit} />
      )}
    </div>
  )
}
