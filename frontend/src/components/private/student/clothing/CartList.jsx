import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { CartCard } from './CartCard'

export const CartList = ({ clothingItems, removeFromLoan }) => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 8 // adjust as needed

  const handleChange = (event, value) => {
    setPage(value)
  }

  // Calculate slice indices
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = clothingItems.slice(startIndex, endIndex)

  const totalPages = Math.ceil(clothingItems.length / itemsPerPage)

  return (
    <>
      <div className="row justify-content-center">
        {currentItems.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3 mb-4 d-flex">
            <CartCard item={item} removeFromLoan={removeFromLoan} />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center my-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      </div>
    </>
  )
}
