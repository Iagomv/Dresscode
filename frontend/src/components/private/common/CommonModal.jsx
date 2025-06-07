import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line no-unused-vars
export const CommonModal = ({ show, onClose, formik, titleText, FormFieldsComponent }) => {
  const { t } = useTranslation('common')

  if (!formik) return null // defensive check to avoid crash

  return (
    <Modal show={show} onHide={onClose} centered>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{titleText}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormFieldsComponent />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              {t('form.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
              {t('form.confirm')}
            </Button>
          </Modal.Footer>
        </Form>
      </FormikProvider>
    </Modal>
  )
}
