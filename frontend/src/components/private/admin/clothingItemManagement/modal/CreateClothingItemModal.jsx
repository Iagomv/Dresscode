import React from 'react'
import { ClothingItemFormFields } from './ClothingItemFormFields'
import { useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/CommonModal'
import { useCreateClothingItemModal } from './useCreateClothingItemModal'
export const CreateClothingItemModal = ({ show, onClose, onCreate }) => {
  const { t } = useTranslation('admin')
  const { formik } = useCreateClothingItemModal(onCreate, onClose)

  return (
    <CommonModal
      show={show}
      onClose={onClose}
      formik={formik}
      titleText={t('clothingItemManagement.createClothingItem')}
      FormFieldsComponent={ClothingItemFormFields}
    />
  )
}
