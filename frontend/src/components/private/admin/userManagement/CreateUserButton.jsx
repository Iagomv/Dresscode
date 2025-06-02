import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaUserPlus } from 'react-icons/fa'
import { CreateUserModal } from './CreateUserModal'
import { FONTSIZE } from '../../../../constants/theme'
import { useTranslation } from 'react-i18next'

export const CreateUserButton = ({ onCreate, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('userManagement')

  const handleCreate = async (userData) => {
    const success = await onCreate(userData)
    if (success) {
      setIsOpen(false)
      onSuccess()
    }
  }

  return (
    <>
      <Button variant="outline-primary" onClick={() => setIsOpen(true)}>
        <span className="d-flex align-items-center">
          <FaUserPlus className="me-2" />
          <span style={{ fontSize: FONTSIZE.sm }}>{t('createUser')}</span>
        </span>
      </Button>
      <CreateUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handleCreate} />
    </>
  )
}
