// LocalNavigation.tsx
import React from 'react'
import { TypeList } from './TypeList'
import { CartBadgeProps } from '../../../../common/badges/clothingItem/CartBadgeProps'
import { InventoryCountBadge } from '../../../../common/badges/loan/InventoryCountBadge'

export const LocalNavigation = ({
  typeList,
  selectedType,
  setSelectedType,
  loanList,
  myLoans,
  setShowCart,
  setShowLoans,
  showCart,
  showLoans,
}) => {
  if (!typeList) return null

  const handleTypeSelect = (type) => {
    setShowCart(false)
    setShowLoans(false)
    setSelectedType(type)
  }

  const handleCartClick = () => {
    setShowCart((prev) => !prev)
    setShowLoans(false)
  }

  const handleLoansClick = () => {
    setShowLoans((prev) => !prev)
    setShowCart(false)
  }

  return (
    <div className="bg-white shadow-sm w-100 mb-3">
      <div className="d-flex flex-row align-items-center justify-content-around px-3">
        <TypeList typeList={typeList} selectedType={selectedType} onTypeSelect={handleTypeSelect} />
        {loanList.length > 0 && <CartBadgeProps count={loanList.length} setShowCart={handleCartClick} showCart={showCart} />}
        {myLoans.length > 0 && (
          <InventoryCountBadge count={myLoans.length} setShowLoans={handleLoansClick} showLoans={showLoans} />
        )}
      </div>
    </div>
  )
}
