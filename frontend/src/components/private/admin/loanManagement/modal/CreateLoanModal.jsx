import React from 'react'
import { LoanFormFields } from './LoanFormFields'
import { useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/CommonModal'
import { useCreateLoanModal } from './useCreateLoanModal'
export const CreateLoanModal = ({ show, onClose, onCreate }) => {
  const { t } = useTranslation('admin')
  const { formik } = useCreateLoanModal(onCreate, onClose)

  return (
    <CommonModal
      show={show}
      onClose={onClose}
      formik={formik}
      titleText={t('loanManagement.createLoan')}
      FormFieldsComponent={LoanFormFields}
    />
  )
}
