import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { UserFormFields } from './UserFormFields'
import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'

export const CreateUserModal = ({ isOpen, onClose, formik }) => {
  const { t } = useTranslation('admin')
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t('userManagement.createUser')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UserFormFields formik={formik} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              {t('userManagement.cancelar')}
            </Button>
            <Button variant="primary" type="submit">
              {t('userManagement.confirmar')}
            </Button>
          </Modal.Footer>
        </Form>
      </FormikProvider>
    </Modal>
  )
}
