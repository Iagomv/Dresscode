import React from 'react'
import { Button } from 'react-bootstrap'
import { RiAddLargeLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
export const CreateClothingItemButton = ({ openModal }) => {
  const { t } = useTranslation('admin')
  return (
    <>
      <Button variant="outline-primary" onClick={openModal} className="d-flex align-items-center gap-2">
        <span className="small">{t('clothingItemManagement.addClothingItemButton')}</span>
        <RiAddLargeLine />
      </Button>
    </>
  )
}
