import React from 'react'
import { LoanStateBadge } from '../../../../common/badges/LoanStateBadge'
import { useTranslation } from 'react-i18next'

export const LoanSummary = ({ loan, showDetails, setShowDetails }) => {
  const { t } = useTranslation('common')

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center border rounded p-3 mb-3 bg-light w-75 mx-auto cursor-pointer hover-shadow"
      onClick={() => setShowDetails(!showDetails)}
      style={{
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease-in-out',
        boxShadow: showDetails ? '0 0 0 0.2rem rgba(0,123,255,.25)' : 'none',
      }}
    >
      <div className="text-center">
        <p className="mb-1 fw-semibold">{t('loan.data.acceptedBy')}:</p>
        <div>{loan.acceptedByName ?? '—'}</div>
      </div>
      <div className="text-center">
        <p className="mb-1 fw-semibold">{t('loan.data.startingDate')}:</p>
        <div>{loan.startingDate}</div>
      </div>
      <div className="text-center">
        <p className="mb-1 fw-semibold">{t('loan.data.endingDate')}:</p>
        <div>{loan.endingDate ?? '—'}</div>
      </div>
      <div className="text-center">
        <p className="mb-1 fw-semibold">{t('loan.data.state')}:</p>
        <LoanStateBadge state={loan.state} />
      </div>
    </div>
  )
}
