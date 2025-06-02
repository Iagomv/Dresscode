import React from 'react'
import Badge from 'react-bootstrap/Badge'

export const UserRoleBadge = ({ role }) => {
  const variantMap = {
    ADMIN: 'primary',
    TEACHER: 'info',
    STUDENT: 'success',
  }

  const badgeVariant = variantMap[role?.toUpperCase()] || 'secondary'

  return (
    <Badge bg={badgeVariant} className="text-uppercase">
      {role}
    </Badge>
  )
}
