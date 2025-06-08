import { useFormik } from 'formik'
import { createClothingItemSchema } from '../../../../../schema/AdminSchemas'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook to manage the state and logic for creating or updating a clothing item.
 *
 * @param {Function} onSubmit - Callback function to handle clothing item creation or update logic.
 * @param {Function} onClose - Callback function to handle modal close actions.
 * @param {Object} initialClothingItemData - Optional initial clothing item data for editing.
 * @returns {Object} An object containing the formik instance for form handling.
 */
export const useCreateClothingItemModal = (onSubmit, onClose, initialClothingItemData = null) => {
  const { t } = useTranslation('validation')

  const formik = useFormik({
    initialValues: {
      id: initialClothingItemData?.id || '',
      name: initialClothingItemData?.name || '',
      imageUrl: initialClothingItemData?.imageUrl || '',
      description: initialClothingItemData?.description || '',
      quantity: initialClothingItemData?.quantity || 0,
      color: initialClothingItemData?.color || '',
      price: initialClothingItemData?.price || 0,
      state: initialClothingItemData?.state || 'NUEVA',
      gender: initialClothingItemData?.gender || 'UNISEX',
      type: initialClothingItemData?.type || 'SHIRT',
      size: initialClothingItemData?.size || 'M',
      availability: initialClothingItemData?.availability || 'AVAILABLE',
    },
    validationSchema: createClothingItemSchema(t),
    onSubmit: (values) => {
      if (initialClothingItemData?.id !== '' && initialClothingItemData?.id !== undefined) {
        onSubmit(values.id, values)
      } else {
        delete values.id
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
