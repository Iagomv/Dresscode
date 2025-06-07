import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { UserRow } from './UserRow'
import { useTranslation } from 'react-i18next'

export const UserTable = ({ users, requestUpdate, requestDelete, toggleStatus }) => {
  const [expandedUserId, setExpandedUserId] = useState(null)
  const { t } = useTranslation('admin')
  return (
    <div className="d-flex justify-content-center w-75">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('userManagement.name')}</th>
            <th>{t('userManagement.phoneNumber')}</th>
            <th>{t('userManagement.email')}</th>
            <th>{t('userManagement.role')}</th>
            <th>{t('userManagement.status')}</th>
            <th className="text-right">{t('userManagement.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              requestUpdate={requestUpdate}
              requestDelete={requestDelete}
              toggleStatus={toggleStatus}
              isExpanded={expandedUserId === user.id}
              onToggleExpand={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
