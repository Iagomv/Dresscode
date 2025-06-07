import React from 'react'
import { EventFormFields } from './EventFormFields'
import { useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/CommonModal'
import { useCreateEventModal } from './useCreateEventModal'
export const CreateEventModal = ({ show, onClose, onCreate }) => {
  const { t } = useTranslation('admin')
  const { formik } = useCreateEventModal(onCreate, onClose)
  console.log('formik:', formik)

  return (
    <CommonModal
      show={show}
      onClose={onClose}
      formik={formik}
      titleText={t('eventManagement.createEvent')}
      FormFieldsComponent={EventFormFields}
    />
  )
}
