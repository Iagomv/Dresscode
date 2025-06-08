import React from 'react'
import { ClothingItemFormFields } from './ClothingItemFormFields'
import { useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/CommonModal'
import { useCreateClothingItemModal } from './useCreateClothingItemModal'

export const UpdateClothingItemModal = ({ show, onClose, onUpdate, clothingItem }) => {
  const { t } = useTranslation('admin')
  const { formik } = useCreateClothingItemModal(onUpdate, onClose, clothingItem)

  return (
    <CommonModal
      show={show}
      onClose={onClose}
      formik={formik}
      titleText={t('clothingItemManagement.updateClothingItemModalTitle')}
      FormFieldsComponent={ClothingItemFormFields}
    />
  )
}
