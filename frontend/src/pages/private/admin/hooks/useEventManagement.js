import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import eventService from '../service/eventService'
import { performApiAction } from '../../../../utils/ApiUtils'

export const useEventManagement = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [eventIdToDelete, setEventIdToDelete] = useState(null)
  const { t } = useTranslation('common')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [eventToEdit, setEventToEdit] = useState(null)
  const newSuccessMessage = (messageKey) => `Event ${t(messageKey)}`

  const fetchEvents = () =>
    performApiAction(() => eventService.fetchEvents(), {
      errorMessage: t('error.fetch'),
      onSuccess: setEvents,
      setLoading,
    })

  useEffect(() => {
    fetchEvents()
  }, [])

  const createEvent = (eventData) =>
    performApiAction(() => eventService.createEvent(eventData), {
      successMessage: newSuccessMessage('success.created'),
      errorMessage: t('error.create'),
      onSuccess: (newEvent) => setEvents((prev) => [...prev, newEvent]),
      setLoading,
    })

  const updateEvent = (id, eventData) =>
    performApiAction(() => eventService.updateEvent(id, eventData), {
      successMessage: newSuccessMessage('success.updated'),
      errorMessage: t('error.update'),
      onSuccess: () => setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...eventData } : event))),
      setLoading,
    })

  const requestDelete = (id) => {
    setEventIdToDelete(id)
    setShowConfirmModal(true)
  }

  const confirmDelete = () => {
    if (!eventIdToDelete) return Promise.resolve()
    return performApiAction(() => eventService.deleteEvent(eventIdToDelete), {
      successMessage: newSuccessMessage('success.deleted'),
      errorMessage: t('error.event'),
      onSuccess: () => setEvents((prev) => prev.filter((event) => event.id !== eventIdToDelete)),
      setLoading,
    }).finally(() => {
      setShowConfirmModal(false)
      setEventIdToDelete(null)
    })
  }

  const requestUpdate = (event) => {
    setEventToEdit(event)
    setShowUpdateModal(true)
  }

  const cancelUpdate = () => {
    setEventToEdit(null)
    setShowUpdateModal(false)
  }

  const confirmUpdate = async (id, eventData) => {
    await updateEvent(id, eventData)
    cancelUpdate()
  }

  const cancelDelete = () => {
    setShowConfirmModal(false)
    setEventIdToDelete(null)
  }

  return {
    events,
    loading,
    createEvent,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    updateEvent,
    showUpdateModal,
    eventToEdit,
    requestUpdate,
    cancelUpdate,
    confirmUpdate,
    refetch: fetchEvents,
  }
}
