import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import IncidentCard from './IncidentCard'
import { INCIDENTS_TABLE_TEXT } from '../../constants/textConstants'

export default function IncidentModal({ showModal, handleClose, selectedIncident }) {
  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{INCIDENTS_TABLE_TEXT.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{selectedIncident && <IncidentCard incident={selectedIncident} />}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {INCIDENTS_TABLE_TEXT.modalCloseButton}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
