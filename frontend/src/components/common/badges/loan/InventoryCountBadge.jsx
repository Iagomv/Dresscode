import * as React from 'react'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Inventory2Icon from '@mui/icons-material/Inventory2'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}))

// ✅ Fix: InventoryCountBadge.jsx
export const InventoryCountBadge = ({ count, setShowLoans, showLoans }) => {
  return (
    <IconButton aria-label="loan" onClick={() => setShowLoans(!showLoans)}>
      <StyledBadge badgeContent={count} color="primary">
        <Inventory2Icon />
      </StyledBadge>
    </IconButton>
  )
}
