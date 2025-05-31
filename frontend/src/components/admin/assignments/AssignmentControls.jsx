import React from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { INCIDENT_ASSIGNMENT_TEXT } from '../../../constants/textConstants'

const AssignmentControls = ({
  selectedIncidents,
  technicians,
  selectedTechnician,
  onTechnicianChange,
  onAssign,
  onSelectAll,
  totalItems,
}) => (
  <Stack direction="horizontal" gap={3} className="mb-3">
    <Form.Check
      id="select-all-checkbox"
      type="checkbox"
      label={`Select all (${selectedIncidents.length}/${totalItems})`}
      checked={selectedIncidents.length === totalItems}
      onChange={(e) => onSelectAll(e.target.checked)}
      className="me-3"
    />

    <Form.Select value={selectedTechnician} onChange={onTechnicianChange} style={{ width: '300px' }}>
      <option value="">{INCIDENT_ASSIGNMENT_TEXT.technicianSelectDefaultOption}</option>
      {technicians.map((tech) => (
        <option key={tech.id} value={tech.id}>
          {tech.username} ({tech.incidentCount} assigned)
        </option>
      ))}
    </Form.Select>

    <Button variant="primary" onClick={onAssign} disabled={!selectedTechnician || selectedIncidents.length === 0}>
      Assign {selectedIncidents.length} Incident(s)
    </Button>
  </Stack>
)

export default AssignmentControls
