import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { loanService } from '../../../../service/loanService'
import { performApiAction } from '../../../../utils/ApiUtils'

export const useLoanManagement = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [loanIdToDelete, setLoanIdToDelete] = useState(null)
  const { t } = useTranslation('common')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [loanToEdit, setLoanToEdit] = useState(null)
  const newSuccessMessage = (messageKey) => `Loan ${t(messageKey)}`

  const fetchAllLoans = () =>
    performApiAction(() => loanService.fetchAllLoansWithUserInfo(), {
      errorMessage: t('error.fetch'),
      onSuccess: setLoans,
      setLoading,
    })

  useEffect(() => {
    fetchAllLoans()
  }, [])

  const createLoanAsAdmin = (loanData) => {
    // Remove the clothingItems property from the object before sending
    const dataToSend = { ...loanData }
    delete dataToSend.clothingItems

    return performApiAction(() => loanService.createLoanAsAdmin(dataToSend), {
      successMessage: newSuccessMessage('success.created'),
      errorMessage: t('error.create'),
      onSuccess: fetchAllLoans,
      setLoading,
    })
  }

  const updateLoan = (id, loanData) =>
    performApiAction(() => loanService.updateLoan(id, loanData), {
      successMessage: newSuccessMessage('success.updated'),
      errorMessage: t('error.update'),
      onSuccess: fetchAllLoans,
      setLoading,
    })

  const requestDelete = (id) => {
    setLoanIdToDelete(id)
    setShowConfirmModal(true)
  }

  const confirmDelete = () => {
    if (!loanIdToDelete) return Promise.resolve()
    return performApiAction(() => loanService.deleteLoan(loanIdToDelete), {
      successMessage: newSuccessMessage('success.deleted'),
      errorMessage: t('error.loan'),
      onSuccess: () => setLoans((prev) => prev.filter((loan) => loan.id !== loanIdToDelete)),
      setLoading,
    }).finally(() => {
      setShowConfirmModal(false)
      setLoanIdToDelete(null)
    })
  }

  const requestUpdate = (loan) => {
    setLoanToEdit(loan)
    setShowUpdateModal(true)
  }

  const cancelUpdate = () => {
    setLoanToEdit(null)
    setShowUpdateModal(false)
  }

  const confirmUpdate = async (values) => {
    await updateLoan(values.id, values)
    cancelUpdate()
  }

  const cancelDelete = () => {
    setShowConfirmModal(false)
    setLoanIdToDelete(null)
  }

  return {
    loans,
    loading,
    createLoanAsAdmin,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    updateLoan,
    showUpdateModal,
    loanToEdit,
    requestUpdate,
    cancelUpdate,
    confirmUpdate,
    refetch: fetchAllLoans,
  }
}
