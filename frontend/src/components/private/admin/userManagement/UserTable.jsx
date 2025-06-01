import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { UserRow } from './UserRow'

export const UserTable = ({ users }) => {
  const [expandedUserId, setExpandedUserId] = useState(null)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            isExpanded={expandedUserId === user.id}
            onToggleExpand={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)}
          />
        ))}
      </tbody>
    </Table>
  )
}
