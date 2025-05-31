import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import { FiEye } from 'react-icons/fi'

import './Row.css'

export const Row = ({ incident, showDetails }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getBadgeVariant = (type, value) => {
    const variants = {
      priority: {
        HIGH: 'danger',
        MEDIUM: 'warning',
        LOW: 'success',
      },
      status: {
        OPEN: 'primary',
        IN_PROGRESS: 'warning',
        CLOSED: 'success',
      },
    }
    return variants[type][value] || 'secondary'
  }

  return (
    <tr className="incident-row">
      <td className="table-cell text-content">
        <span className="truncated">{incident.title}</span>
      </td>
      <td className="table-cell">{incident.category}</td>
      <td className="table-cell">
        <Badge bg={getBadgeVariant('priority', incident.priority)} className="badge-small">
          {incident.priority}
        </Badge>
      </td>
      <td className="table-cell">
        <Badge bg={getBadgeVariant('status', incident.status)} className="badge-small">
          {incident.status}
        </Badge>
      </td>
      <td className="table-cell text-content">
        <span className="truncated">{incident.description}</span>
      </td>
      <td className="table-cell text-content">
        <span className="truncated">{formatDate(incident.createdAt)}</span>
      </td>
      <td className="table-cell">
        <Button
          variant="link"
          className="button-small toggle-btn"
          onClick={(e) => {
            e.stopPropagation()
            showDetails(incident)
          }}
        >
          <FiEye />
        </Button>
      </td>
    </tr>
  )
}
