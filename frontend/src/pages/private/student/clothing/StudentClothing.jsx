/* eslint-disable no-unused-vars */
import React from 'react'
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner'
import { useStudentClothing } from './useStudentClothing'
import { ClothingTypeList } from '../../../../components/private/student/clothing/ClothingTypeList'
import { ClothingList } from '../../../../components/private/student/clothing/ClothingList'
import { CartList } from '../../../../components/private/student/clothing/CartList'
import { MyCartTitle } from '../../../../components/private/student/clothing/MyCartTitle'
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

  if (loading) return <LoadingSpinner />

  return (
    <div className="container-fluid pt-5  w-100" style={{ alignSelf: 'stretch' }}>
      <span>
        {showCart ? (
          <MyCartTitle loanList={loanList} setShowCart={setShowCart} requestLoan={requestLoan} />
        ) : (
          <ClothingTypeList
            typeList={enums.type}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            loanList={loanList}
            setShowCart={setShowCart}
            showCart={showCart}
          />
        )}
      </span>
      {showCart ? (
        <CartList clothingItems={loanList} removeFromLoan={removeFromLoan} />
      ) : (
        <ClothingList clothingItems={clothingItems} addToLoan={addToLoan} />
      )}
    </div>
  )
}
