import React, { useState } from 'react'
import { LoadingSpinner } from '../../../../common/LoadingSpinner'
import { LoanDetails } from './LoanDetails'
import { LoanSummary } from './LoanSummary'

export const MyLoans = ({ loans, loading }) => {
  const [expandedLoans, setExpandedLoans] = useState(new Set())

  const toggleLoanDetails = (loanId) => {
    setExpandedLoans((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(loanId)) {
        newSet.delete(loanId)
      } else {
        newSet.add(loanId)
      }
      return newSet
    })
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      {loans.map((loan) => {
        const isExpanded = expandedLoans.has(loan.id)
        return (
          <div key={loan.id}>
            <LoanSummary loan={loan} showDetails={isExpanded} setShowDetails={() => toggleLoanDetails(loan.id)} />
            {isExpanded && <LoanDetails loan={loan} />}
          </div>
        )
      })}
    </div>
  )
}
