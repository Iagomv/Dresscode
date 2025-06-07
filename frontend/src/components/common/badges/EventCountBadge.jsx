import React from 'react'
import Badge from '@mui/material/Badge'
import { MdEventAvailable } from 'react-icons/md'
export const EventCountBadge = ({ count }) => {
  return (
    <div>
      <Badge badgeContent={count} color="secondary">
        <MdEventAvailable size={24} />
      </Badge>
    </div>
  )
}
