import React from 'react'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { CartBadgeProps } from '../../../../common/badges/clothingItem/CartBadgeProps'

export const MyCartHeader = ({ loanList, setShowCart, requestLoan }) => {
  const { t } = useTranslation('student')
  const myCartText = t('content.static.vestuario.myCart')
  const requestLoansText = t('content.static.vestuario.requestLoanBtn')
  const backToLoansText = t('content.static.vestuario.backToLoans')
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded mb-4 mx-3 ">
      <h5 className="mb-0">
        {myCartText} <CartBadgeProps count={loanList?.length} />
      </h5>
      <div className="d-flex gap-2">
        <Button variant="outline" onClick={() => setShowCart(false)}>
          {backToLoansText}
        </Button>
        <Button variant="outline" onClick={requestLoan}>
          {requestLoansText}
        </Button>
      </div>
    </div>
  )
}
