import { useFormik } from 'formik'
import { createLoanSchema } from '../../../../../schema/AdminSchemas'
import { useTranslation } from 'react-i18next'
/**
 * Custom hook to manage the state and logic for creating or updating a clothing item.
 *
 * @param {Function} onSubmit - Callback function to handle clothing item creation or update logic.
 * @param {Function} onClose - Callback function to handle modal close actions.
 * @returns {Object} An object containing the formik instance for form handling.
 */
export const useUpdateLoanModal = (initialValues, onSubmit, onClose) => {
  const { t } = useTranslation('validation')
  const formik = useFormik({
    initialValues: {
      id: initialValues.id || '',
      userId: initialValues.user.id || '',
      acceptedById: initialValues.acceptedById || '',
      startingDate: initialValues.startingDate || '',
      endingDate: initialValues.endingDate || '',
      state: initialValues.state || '',
      clothingItemIds: initialValues.clothingItemIds || [],
    },

    validationSchema: createLoanSchema(t),
    onSubmit: (values) => {
      onSubmit({
        ...values,
      })
      onClose()
    },
    enableReinitialize: true,
  })
  return {
    formik,
  }
}
