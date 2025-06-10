import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { UserRow } from './UserRow'
import { useTranslation } from 'react-i18next'
import Pagination from 'react-bootstrap/Pagination'
import config from '../../../../../config.json'
export const UserTable = ({ users, requestUpdate, requestDelete, toggleStatus }) => {
  const [expandedUserId, setExpandedUserId] = useState(null)
  const [page, setPage] = useState(1) // current page starts at 1 for bootstrap pagination
  const { t } = useTranslation('admin')

  const itemsPerPage = config.management.user.pagination.limit
  const totalPages = Math.ceil(users.length / itemsPerPage)

  // Get current users for this page
  const paginatedUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // optional scroll to top
  }

  return (
    <div className="d-flex flex-column align-items-center w-75">
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
          {paginatedUsers.map((user) => (
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

      {/* Pagination */}
      {users.length > itemsPerPage && (
        <Pagination className="mt-3">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
          <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />

          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
        </Pagination>
      )}
    </div>
  )
}
