import React from 'react'
import { Button } from 'react-bootstrap'
import { RiAddLargeLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
export const CreateLoanButton = ({ openModal }) => {
  const { t } = useTranslation('admin')
  return (
    <>
      <Button variant="outline-primary" onClick={openModal} className="d-flex align-items-center gap-2">
        <span className="small">{t('loanManagement.addLoanButton')}</span>
        <RiAddLargeLine />
      </Button>
    </>
  )
}
