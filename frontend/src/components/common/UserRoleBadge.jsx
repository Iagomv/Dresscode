import React from 'react'
import Badge from 'react-bootstrap/Badge'
import { ROLE_VARIANTS } from '../../constants/theme'
export const UserRoleBadge = ({ role }) => {
  const badgeVariant = ROLE_VARIANTS[role?.toUpperCase()] || 'secondary'

  return (
    <Badge bg={badgeVariant} className="text-uppercase">
      {role}
    </Badge>
  )
}
