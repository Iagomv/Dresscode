import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { UserRow } from './UserRow'
import { useTranslation } from 'react-i18next'

export const UserTable = ({ users }) => {
  const [expandedUserId, setExpandedUserId] = useState(null)
  const { t } = useTranslation('userManagement')
  return (
    <div className="d-flex justify-content-center w-75">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('role')}</th>
            <th>{t('status')}</th>
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
    </div>
  )
}
