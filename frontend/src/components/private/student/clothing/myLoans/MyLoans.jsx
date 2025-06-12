import React from 'react'

import { LoadingSpinner } from '../../../../common/LoadingSpinner'
import { LoanItem } from './LoanItem'
export const MyLoans = ({ loans, loading }) => {
  if (loading) return <LoadingSpinner />
  return (
    <div>
      {loans.map((loan) => (
        <LoanItem key={loan.id} loan={loan} />
      ))}
    </div>
  )
}
