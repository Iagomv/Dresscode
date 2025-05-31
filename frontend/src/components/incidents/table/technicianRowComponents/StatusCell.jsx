import React from 'react'
import { Badge, Form } from 'react-bootstrap'
import { getBadgeVariant } from '../../../../utils/IncidentUtils'

export default function StatusCell({
  isEditing,
  status,
  setStatus,
  isUpdating,
}) {
  return (
    <td className="table-cell">
      {isEditing ? (
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isUpdating}
        >
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="CLOSED">CLOSED</option>
        </Form.Select>
      ) : (
        <Badge bg={getBadgeVariant('status', status)} className="badge-small">
          {status}
        </Badge>
      )}
    </td>
  )
}
