import * as React from 'react'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}))

export const CartBadgeProps = ({ count, setShowCart, showCart }) => {
  return (
    <IconButton aria-label="cart" onClick={() => setShowCart(!showCart)}>
      <StyledBadge badgeContent={count} color="primary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}
