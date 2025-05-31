import React from 'react'
import { Button } from 'react-bootstrap'
import { FiSave, FiX, FiEdit, FiEye } from 'react-icons/fi'

export default function TechnicianButtons({
  isEditing,
  setIsEditing,
  incident,
  showDetails,
  priority,
  status,
  handleChange,
  handleCancel,
  isUpdating,
}) {
  return (
    <div className="d-flex gap-2">
      {isEditing ? (
        <>
          <Button
            variant="success"
            size="sm"
            onClick={() => handleChange(priority, status)}
            disabled={isUpdating}
            title="Save Changes"
          >
            {isUpdating ? <FiSave className="spin" /> : <FiSave />}
          </Button>
          {incident.status !== 'CLOSED' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              disabled={isUpdating}
              title="Cancel"
            >
              <FiX />
            </Button>
          )}
        </>
      ) : (
        <>
          {incident.status !== 'CLOSED' && (
            <Button
              variant="link"
              className="button-small"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              <FiEdit />
            </Button>
          )}
          <Button
            variant="link"
            className="button-small"
            onClick={(e) => {
              e.stopPropagation()
              showDetails(incident)
            }}
            title="View Details"
          >
            <FiEye />
          </Button>
        </>
      )}
    </div>
  )
}
