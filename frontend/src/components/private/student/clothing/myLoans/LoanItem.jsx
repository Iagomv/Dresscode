import React from 'react'

import { ItemDetails } from './ItemDetails'
import { ClothingCard } from '../ClothingCard'
export const LoanItem = ({ loan }) => {
  return (
    <div>
      <ClothingCard loan={loan} />
    </div>
  )
}
