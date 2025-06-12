import React from 'react'

import { ItemDetails } from './ItemDetails'
import { ItemSummary } from './ItemSummary'
export const LoanItem = ({ loan }) => {
  return (
    <div>
      <ItemSummary loan={loan} />
      <ItemDetails loan={loan} />
    </div>
  )
}
