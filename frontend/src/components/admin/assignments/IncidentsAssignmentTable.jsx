import React from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { FiEye } from 'react-icons/fi'
import { INCIDENT_ASSIGNMENT_TEXT } from '../../../constants/textConstants'

const IncidentAssignmentTable = ({ incidents, sortConfig, selectedIncidents, onSort, onSelect, showDetails }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>
            <Form.Check
              checked={selectedIncidents.length === incidents.length}
              onChange={(e) => e.target.checked}
              disabled={incidents.length === 0}
            />
          </th>
          <th onClick={() => onSort('title')} className="cursor-pointer">
            {INCIDENT_ASSIGNMENT_TEXT.table.titleTh} {getSortIcon('title')}
          </th>
          <th onClick={() => onSort('priority')} className="cursor-pointer">
            {INCIDENT_ASSIGNMENT_TEXT.table.priorityTh} {getSortIcon('priority')}
          </th>
          <th onClick={() => onSort('status')} className="cursor-pointer">
            {INCIDENT_ASSIGNMENT_TEXT.table.statusTh} {getSortIcon('status')}
          </th>
          <th onClick={() => onSort('technicianName')} className="cursor-pointer">
            {INCIDENT_ASSIGNMENT_TEXT.table.assignedToTh} {getSortIcon('technicianName')}
          </th>
          <th onClick={() => onSort('createdAt')} className="cursor-pointer">
            {INCIDENT_ASSIGNMENT_TEXT.table.createdAtTh} {getSortIcon('createdAt')}
          </th>
          <th>{INCIDENT_ASSIGNMENT_TEXT.table.detailsTh}</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((incident) => (
          <tr key={incident.id}>
            <td>
              <Form.Check
                checked={selectedIncidents.includes(incident.id)}
                onChange={() => onSelect(incident.id)}
                aria-label={`Select incident ${incident.title}`}
              />
            </td>
            <td>{incident.title}</td>
            <td>
              <span className={`badge bg-${getPriorityVariant(incident.priority)}`}>{incident.priority}</span>
            </td>
            <td>{incident.status}</td>
            <td>{incident.technicianName}</td>
            <td>{new Date(incident.createdAt).toLocaleDateString()}</td>
            <td>
              <Button
                variant="link"
                className="button-small toggle-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  showDetails(incident)
                }}
              >
                <FiEye className="text-primary" role="button" size={18} onClick={() => showDetails(incident)} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const getPriorityVariant = (priority) => {
  const variants = { HIGH: 'danger', MEDIUM: 'warning', LOW: 'success' }
  return variants[priority] || 'secondary'
}

export default IncidentAssignmentTable
