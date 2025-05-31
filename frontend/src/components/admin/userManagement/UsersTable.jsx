import React from 'react'
import { Table, Button, Badge } from 'react-bootstrap'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { ADMIN_USER_MANAGEMENT_TEXT } from '../../../constants/textConstants'

const UserTable = ({ users, onEdit, onDelete }) => {
  const getRoleBadge = (role) => {
    const variants = {
      USER: 'primary',
      TECHNICIAN: 'warning',
      ADMIN: 'danger',
    }
    return <Badge bg={variants[role]}>{role}</Badge>
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>{ADMIN_USER_MANAGEMENT_TEXT.userTable.username}</th>
          <th>{ADMIN_USER_MANAGEMENT_TEXT.userTable.email}</th>
          <th>{ADMIN_USER_MANAGEMENT_TEXT.userTable.role}</th>
          <th>{ADMIN_USER_MANAGEMENT_TEXT.userTable.createdAt}</th>
          <th>{ADMIN_USER_MANAGEMENT_TEXT.userTable.actions}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email || '-'}</td>
            <td>{getRoleBadge(user.role)}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
              <Button variant="link" onClick={() => onEdit(user)} aria-label="Edit">
                <FiEdit />
              </Button>
              <Button variant="link" className="text-danger" onClick={() => onDelete(user.id)} aria-label="Delete">
                <FiTrash2 />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default UserTable
