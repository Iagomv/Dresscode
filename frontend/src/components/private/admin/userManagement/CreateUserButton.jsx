import React from 'react'
import { Button } from 'react-bootstrap'
import { FaUserPlus } from 'react-icons/fa'
import { CreateUserModal } from './modal/CreateUserModal'
import { useCreateUserModal } from './hooks/useCreateUserModal'
import { useTranslation } from 'react-i18next'

export const CreateUserButton = ({ onCreate, onSuccess }) => {
  const { t } = useTranslation('admin')

  const handleCreate = async (userData) => {
    const success = await onCreate(userData)
    if (success) {
      onSuccess()
    }
  }

  const { isOpen, openModal, closeModal, formik } = useCreateUserModal(handleCreate)

  return (
    <>
      <Button variant="outline-primary" onClick={openModal} className="d-flex align-items-center gap-2">
        <FaUserPlus />
        <span className="small">{t('userManagement.addUserButton')}</span>
      </Button>

      <CreateUserModal isOpen={isOpen} onClose={closeModal} formik={formik} />
    </>
  )
}
