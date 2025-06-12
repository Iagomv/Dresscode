import React from 'react'
import { useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/CommonModal'
import { useUpdateLoan } from './useUpdateLoan'
import { UpdateLoanFormFields } from './UpdateLoanFormFields'
export const UpdateLoanModal = ({ show, onClose, onUpdate, loan }) => {
  const { t } = useTranslation('admin')
  const { formik } = useUpdateLoan(loan, onUpdate, onClose)

  return (
    <CommonModal
      show={show}
      onClose={onClose}
      formik={formik}
      titleText={t('loanManagement.updateLoanModalTitle')}
      FormFieldsComponent={UpdateLoanFormFields}
    />
  )
}
