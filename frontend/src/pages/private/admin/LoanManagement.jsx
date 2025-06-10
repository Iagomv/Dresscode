/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'
import { useLoanManagement } from './hooks/useLoanManagement'
import { CreateLoanButton } from '../../../components/private/admin/loanManagement/CreateLoanButton'
import { LoansTable } from '../../../components/private/admin/loanManagement/LoansTable'
// import { ConfirmDeleteModal } from '../../../components/private/common/ConfirmDeleteModal'
// import { UpdateLoanModal } from '../../../components/private/admin/loanManagement/modal/UpdateLoanModal'
import { CreateLoanModal } from '../../../components/private/admin/loanManagement/modal/CreateLoanModal'
import { useTranslation } from 'react-i18next'
import { SearchFilter } from '../../../components/private/common/SearchFilter'
export const LoanManagement = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const { t } = useTranslation('admin')
  const {
    loans,
    loading,
    createLoanAsAdmin,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    showUpdateModal,
    loanToEdit,
    requestUpdate,
    cancelUpdate,
    confirmUpdate,
  } = useLoanManagement()
  const [searchTerm, setSearchTerm] = useState('')
  const filteredLoans = loans.filter((loan) => `${loan.state}`.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) return <LoadingSpinner />

  return (
    <div className="user-management d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row gap-3">
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholderText={t('loanManagement.searchLoans')} />
        <CreateLoanButton
          openModal={() => {
            setOpenCreateModal(true)
          }}
        />
        {openCreateModal && (
          <CreateLoanModal show={openCreateModal} onClose={() => setOpenCreateModal(false)} onCreate={createLoanAsAdmin} />
        )}
      </div>
      {loans.length > 0 && <LoansTable loans={filteredLoans} requestUpdate={requestUpdate} requestDelete={requestDelete} />}
      {/* <ConfirmDeleteModal show={showConfirmModal} onConfirm={confirmDelete} onCancel={cancelDelete} />
      {showUpdateModal && loanToEdit && (
        <UpdateLoanModal show={showUpdateModal} onClose={cancelUpdate} onUpdate={confirmUpdate} loan={loanToEdit} />
      )} */}
    </div>
  )
}
