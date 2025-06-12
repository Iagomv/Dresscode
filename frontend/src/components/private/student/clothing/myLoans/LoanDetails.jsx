import React from 'react'
import { ClothingCard } from '../ClothingCard'

export const LoanDetails = ({ loan }) => {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center my-3">
      {loan.clothingItems?.map((item) => (
        <div key={item.id} className="flex-shrink-0">
          <ClothingCard item={item} />
        </div>
      ))}
    </div>
  )
}
