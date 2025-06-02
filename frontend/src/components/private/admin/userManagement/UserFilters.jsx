import { Input } from '@mui/material'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export const UserFilters = ({ searchTerm, onSearchChange }) => {
  const { t } = useTranslation('userManagement')

  const handleChange = (e) => onSearchChange(e.target.value)

  return (
    <div className="d-flex flex-row gap-3">
      <Input type="text" placeholder={t('searchUsers')} value={searchTerm} onChange={handleChange} />
      <FaSearch className="mt-2" />
    </div>
  )
}
