import React from 'react'
import { LoanFormFields } from './LoanFormFields'
import { useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/CommonModal'
import { useUpdateLoanModal } from './useUpdateLoanModal'

export const UpdateLoanModal = ({ show, onClose, onUpdate, loan }) => {
  const { t } = useTranslation('admin')
  const { formik } = useUpdateLoanModal(loan, onUpdate, onClose)

  return (
    <CommonModal
      show={show}
      onClose={onClose}
      formik={formik}
      titleText={t('loanManagement.updateLoanModalTitle')}
      FormFieldsComponent={LoanFormFields}
    />
  )
}
