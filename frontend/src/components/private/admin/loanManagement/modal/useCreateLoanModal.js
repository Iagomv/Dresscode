import { useFormik } from 'formik'
import { createLoanSchema } from '../../../../../schema/AdminSchemas'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../../../context/AuthContext'
/**
 * Custom hook to manage the state and logic for creating or updating a clothing item.
 *
 * @param {Function} onSubmit - Callback function to handle clothing item creation or update logic.
 * @param {Function} onClose - Callback function to handle modal close actions.
 * @returns {Object} An object containing the formik instance for form handling.
 */
export const useCreateLoanModal = (onSubmit, onClose) => {
  const { t } = useTranslation('validation')
  const { auth } = useAuth()
  const formik = useFormik({
    initialValues: {
      userId: '',
      acceptedById: '',
      startingDate: '',
      endingDate: '',
      state: 'ACTIVE',
      clothingItemIds: [],
    },

    validationSchema: createLoanSchema(t),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        acceptedById: auth?.user?.id,
        userId: Number(values.userId),
        startingDate: values.startingDate || null,
        endingDate: values.endingDate || null,
        clothingItemIds,
      })
      onClose()
    },
    enableReinitialize: true,
  })

  return {
    formik,
  }
}
