import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { UserFormFields } from './UserFormFields'
import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'

export const CreateUserModal = ({ isOpen, onClose, formik }) => {
  const { t } = useTranslation('userManagement')
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t('createUser')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UserFormFields formik={formik} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              {t('cancelar')}
            </Button>
            <Button variant="primary" type="submit">
              {t('confirmar')}
            </Button>
          </Modal.Footer>
        </Form>
      </FormikProvider>
    </Modal>
  )
}
