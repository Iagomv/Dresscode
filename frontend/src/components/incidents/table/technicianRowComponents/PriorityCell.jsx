import React from 'react'
import { Badge, Form } from 'react-bootstrap'
import { getBadgeVariant } from '../../../../utils/IncidentUtils'

export default function PriorityCell({
  isEditing,
  priority,
  setPriority,
  isUpdating,
}) {
  return (
    <td className="table-cell">
      {isEditing ? (
        <Form.Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isUpdating}
        >
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </Form.Select>
      ) : (
        <Badge
          bg={getBadgeVariant('priority', priority)}
          className="badge-small"
        >
          {priority}
        </Badge>
      )}
    </td>
  )
}
