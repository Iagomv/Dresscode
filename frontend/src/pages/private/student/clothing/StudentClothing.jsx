import React from 'react'
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner'
import { useStudentClothing } from './useStudentClothing'

export const StudentClothing = () => {
  const { loading, enums } = useStudentClothing()
  const { availability, gender, size, state, type } = enums || {}

  if (loading) return <LoadingSpinner />
  return (
    <>
      <div>{type && type.map((a) => <div key={a}>{a}</div>)}</div>
    </>
  )
}
