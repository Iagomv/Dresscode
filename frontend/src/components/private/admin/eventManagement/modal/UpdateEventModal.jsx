import React from 'react'
import { EventFormFields } from './EventFormFields'
import { useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/CommonModal'
import { useCreateEventModal } from './useCreateEventModal'

export const UpdateEventModal = ({ show, onClose, onUpdate, event }) => {
  const { t } = useTranslation('admin')
  const { formik } = useCreateEventModal(onUpdate, onClose, event)

  return (
    <CommonModal
      show={show}
      onClose={onClose}
      formik={formik}
      titleText={t('eventManagement.updateEventModalTitle')}
      FormFieldsComponent={EventFormFields}
    />
  )
}
