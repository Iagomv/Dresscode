import React from 'react'
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner'
import { useStudentClothing } from './useStudentClothing'
import { ClothingTypeList } from '../../../../components/private/student/clothing/ClothingTypeFilter'
export const StudentClothing = () => {
  const { loading, enums, clothingItems, setClothingItems, selectedType, setSelectedType } = useStudentClothing()
  const { availability, gender, size, state, type } = enums || {}

  if (loading) return <LoadingSpinner />
  return (
    <div className="d-flex flex-column">
      <ClothingTypeList typeList={type} selectedType={selectedType} setSelectedType={setSelectedType} />
    </div>
  )
}
