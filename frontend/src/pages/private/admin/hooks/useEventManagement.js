import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import eventservice from '../service/eventservice'
import { performApiAction } from '../../../../utils/ApiUtils'

export const useEventManagement = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [eventIdToDelete, setEventIdToDelete] = useState(null)
  const { t } = useTranslation('common')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [eventToEdit, setEventToEdit] = useState(null)

  const fetchevents = () =>
    performApiAction(() => eventservice.fetchEvents(), {
      errorMessage: t('error.fetch'),
      onSuccess: setEvents,
      setLoading,
    })

  useEffect(() => {
    fetchevents()
  }, [])

  const createEvent = (eventData) =>
    performApiAction(() => eventservice.createEvent(eventData), {
      successMessage: t('event.created'),
      errorMessage: t('error.create'),
      onSuccess: (newEvent) => setEvents((prev) => [...prev, newEvent]),
      setLoading,
    })

  const updateEvent = (id, eventData) =>
    performApiAction(() => eventservice.updateEvent(id, eventData), {
      successMessage: t('event.updated'),
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
    return performApiAction(() => eventservice.deleteEvent(eventIdToDelete), {
      successMessage: t('event.deleted'),
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
    refetch: fetchevents,
  }
}
