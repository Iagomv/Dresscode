import React, { useState } from 'react'
import { LoanRow } from './LoanRow'
import Table from 'react-bootstrap/Table'
import { useTranslation } from 'react-i18next'

export const LoansTable = ({ loans, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('common')
  const [expandedRowId, setExpandedRowId] = useState(null)

  const handleToggleExpand = (loanId) => {
    setExpandedRowId((prev) => (prev === loanId ? null : loanId))
  }

  return (
    <div className="d-flex justify-content-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('loan.data.userId')}</th>
            {/* <th>{t('loan.data.clothingItemIds')}</th> */}
            <th>{t('loan.data.state')}</th>
            <th>{t('loan.data.startingDate')}</th>
            <th>{t('loan.data.endingDate')}</th>
            <th>{t('loan.data.acceptedById')}</th>
            <th className="text-right">{t('eventManagement.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <LoanRow
              key={loan.id}
              loan={loan}
              isExpanded={expandedRowId === loan.id}
              onToggleExpand={() => handleToggleExpand(loan.id)}
              requestUpdate={requestUpdate}
              requestDelete={requestDelete}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
