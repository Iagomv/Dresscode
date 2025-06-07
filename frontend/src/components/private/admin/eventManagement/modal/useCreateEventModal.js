import { useFormik } from 'formik'
import { createEventSchema } from '../../../../../schema/AdminSchemas'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook to manage the state and logic for creating an event.
 *
 * @param {Function} onCreate - Callback function to handle event creation logic.
 * @param {Function} onClose - Callback function to handle modal close actions.
 * @returns {Object} An object containing formik instance for form handling.
 */

export const useCreateEventModal = (onCreate, onClose) => {
  const { t } = useTranslation('validation')

  const formik = useFormik({
    initialValues: {
      title: 'Test Event',
      description: 'Description test event',
      location: 'Location',
      eventDate: 'eventDate test',
      category: 'PUBLIC',
      status: 'DRAFT',
      image: '',
    },
    validationSchema: createEventSchema(t),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
      onCreate(values)
      onClose()
    },
  })

  return {
    formik,
  }
}
