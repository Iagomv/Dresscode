import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export const ConfirmDeleteModal = ({ show, onConfirm, onCancel }) => {
  const { t } = useTranslation('common')
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('form.confirmDeleteTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('form.confirmDeleteMessage')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {t('form.cancel')}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {t('form.confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
