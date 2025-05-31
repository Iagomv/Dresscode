import React from 'react'
import { Form } from 'react-bootstrap'
import { INCIDENT_ASSIGNMENT_TEXT, INCIDENT_STATUS, INCIDENT_PRIORITY } from '../../../constants/textConstants'

const AssignmentFilters = ({ filters, onFilterChange }) => (
  <div className="mb-4 p-3 bg-light rounded">
    <div className="d-flex gap-3">
      <Form.Group>
        <Form.Label htmlFor="assigned-select">{INCIDENT_ASSIGNMENT_TEXT.labelAssignStatusSelect}</Form.Label>
        <Form.Select
          id="assigned-select"
          value={filters.assignmentStatus}
          onChange={(e) => onFilterChange('assignmentStatus', e.target.value)}
        >
          <option value="all">{INCIDENT_ASSIGNMENT_TEXT.all}</option>
          <option value="assigned">{INCIDENT_ASSIGNMENT_TEXT.assigned}</option>
          <option value="unassigned">{INCIDENT_ASSIGNMENT_TEXT.unassigned}</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="priority-select">{INCIDENT_ASSIGNMENT_TEXT.labelPrioritySelect}</Form.Label>
        <Form.Select
          id="priority-select"
          value={filters.priority}
          onChange={(e) => onFilterChange('priority', e.target.value)}
        >
          <option value="all">{INCIDENT_ASSIGNMENT_TEXT.all}</option>
          <option value="HIGH">{INCIDENT_PRIORITY.HIGH}</option>
          <option value="MEDIUM">{INCIDENT_PRIORITY.MEDIUM}</option>
          <option value="LOW">{INCIDENT_PRIORITY.LOW}</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="status-select">{INCIDENT_ASSIGNMENT_TEXT.labelIncidentStatusSelect}</Form.Label>
        <Form.Select
          id="status-select"
          value={filters.incidentStatus}
          onChange={(e) => onFilterChange('incidentStatus', e.target.value)}
        >
          <option value="all">{INCIDENT_ASSIGNMENT_TEXT.all}</option>
          <option value="OPEN">{INCIDENT_STATUS.OPEN}</option>
          <option value="IN_PROGRESS">{INCIDENT_STATUS.IN_PROGRESS}</option>
          {/* <option value="CLOSED">Closed</option> Closed incidents are not being retrieved at the moment */}
        </Form.Select>
      </Form.Group>
    </div>
  </div>
)

export default AssignmentFilters
