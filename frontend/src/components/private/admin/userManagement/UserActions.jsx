import React from 'react'
import { Button } from 'react-bootstrap'
import { FaUserEdit, FaToggleOn, FaToggleOff, FaUserSlash } from 'react-icons/fa'

export const UserActions = ({ user, requestDelete, toggleStatus }) => {
  return (
    <div className="d-flex flex-row gap-2">
      <Button aria-label="Edit" variant="outline-primary" title="Edit">
        <FaUserEdit />
      </Button>
      <Button aria-label="Toggle status" variant="outline-primary" title="Toggle Status" onClick={() => toggleStatus(user.id)}>
        {user.active ? <FaToggleOn /> : <FaToggleOff />}
      </Button>
      <Button aria-label="Delete" variant="outline-danger" title="Delete" onClick={() => requestDelete(user.id)}>
        <FaUserSlash />
      </Button>
    </div>
  )
}
