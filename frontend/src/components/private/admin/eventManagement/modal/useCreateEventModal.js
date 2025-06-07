import { useFormik } from 'formik'
import { createEventSchema } from '../../../../../schema/AdminSchemas'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook to manage the state and logic for creating or updating an event.
 *
 * @param {Function} onSubmit - Callback function to handle event creation or update logic.
 * @param {Function} onClose - Callback function to handle modal close actions.
 * @param {Object} initialEventData - Optional initial event data for editing an existing event.
 * @returns {Object} An object containing formik instance for form handling.
 */
export const useCreateEventModal = (onSubmit, onClose, initialEventData = null) => {
  const { t } = useTranslation('validation')

  const formik = useFormik({
    initialValues: {
      id: initialEventData?.id || '',
      title: initialEventData?.title || '',
      description: initialEventData?.description || '',
      location: initialEventData?.location || '',
      eventDate: initialEventData?.eventDate || '',
      category: initialEventData?.category || 'PUBLIC',
      status: initialEventData?.status || 'DRAFT',
      image: initialEventData?.image || '',
    },
    validationSchema: createEventSchema(t),
    onSubmit: (values) => {
      if (initialEventData?.id !== '' && initialEventData?.id !== undefined) {
        onSubmit(values.id, values)
      } else {
        onSubmit(values)
      }
      onClose()
    },
    enableReinitialize: true,
  })

  return {
    formik,
  }
}
