import React from 'react'
import { Button } from 'react-bootstrap'
import { FaRegCalendarPlus } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
export const CreateEventButton = ({ openModal }) => {
  const { t } = useTranslation('admin')
  return (
    <>
      <Button variant="outline-primary" onClick={openModal} className="d-flex align-items-center gap-2">
        <FaRegCalendarPlus />
        <span className="small">{t('eventManagement.addEventButton')}</span>
      </Button>
    </>
  )
}
