/* eslint-disable no-unused-vars */
import React from 'react'
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner'
import { useStudentClothing } from './useStudentClothing'
import { ClothingList } from '../../../../components/private/student/clothing/ClothingList'
import { CartList } from '../../../../components/private/student/clothing/cart/CartList'
import { MyCartHeader } from '../../../../components/private/student/clothing/cart/MyCartHeader'
import { LocalNavigation } from '../../../../components/private/student/clothing/localNav/LocalNavigation'
import { useMyLoans } from './useMyLoans'
import { MyLoans } from '../../../../components/private/student/clothing/myLoans/MyLoans'
export const StudentClothing = () => {
  const {
    loading,
    enums,
    clothingItems,
    setClothingItems,
    selectedType,
    setSelectedType,
    loanList,
    setLoanList,
    addToLoan,
    requestLoan,
    showCart,
    setShowCart,
    removeFromLoan,
  } = useStudentClothing()
  const { myLoans, loadingMyLoans, showLoans, setShowLoans } = useMyLoans()

  if (loading) return <LoadingSpinner />
  const renderHeader = () =>
    showCart ? (
      <MyCartHeader loanList={loanList} setShowCart={setShowCart} requestLoan={requestLoan} />
    ) : (
      <LocalNavigation
        typeList={enums.type}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        loanList={loanList}
        setShowCart={setShowCart}
        showCart={showCart}
        myLoans={myLoans}
        showLoans={showLoans}
        setShowLoans={setShowLoans}
      />
    )

  const renderContent = () => {
    if (showLoans) {
      return <MyLoans loans={myLoans} loading={loadingMyLoans} />
    }

    if (showCart) {
      return <CartList clothingItems={loanList} removeFromLoan={removeFromLoan} />
    }

    return <ClothingList clothingItems={clothingItems} addToLoan={addToLoan} />
  }

  return (
    <div className="container-fluid pt-5 w-100" style={{ alignSelf: 'stretch' }}>
      <span>{renderHeader()}</span>
      {renderContent()}
    </div>
  )
}
