import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import UserTable from '../../../../src/components/admin/userManagement/UsersTable'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

const mockUsers = [
  {
    id: 1,
    username: 'alice',
    email: 'alice@example.com',
    role: 'USER',
    createdAt: '2023-06-01T00:00:00Z',
  },
  {
    id: 2,
    username: 'bob',
    email: '',
    role: 'TECHNICIAN',
    createdAt: '2023-06-02T00:00:00Z',
  },
  {
    id: 3,
    username: 'charlie',
    email: 'charlie@example.com',
    role: 'ADMIN',
    createdAt: '2023-06-03T00:00:00Z',
  },
]

describe('UserTable', () => {
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
  })

  it('renders all users with correct data', () => {
    expect(screen.getByText('alice')).toBeInTheDocument()
    expect(screen.getByText('bob')).toBeInTheDocument()
    expect(screen.getByText('charlie')).toBeInTheDocument()

    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument() // For missing email

    expect(screen.getAllByText('USER')[0]).toBeInTheDocument()
    expect(screen.getByText('TECHNICIAN')).toBeInTheDocument()
    expect(screen.getByText('ADMIN')).toBeInTheDocument()
  })

  it('renders role badges with correct variant classes', () => {
    const userBadge = screen.getAllByText('USER')[0]
    const technicianBadge = screen.getByText('TECHNICIAN')
    const adminBadge = screen.getByText('ADMIN')

    expect(userBadge).toHaveClass('bg-primary')
    expect(technicianBadge).toHaveClass('bg-warning')
    expect(adminBadge).toHaveClass('bg-danger')
  })

  it('calls onEdit with correct user when edit button is clicked', () => {
    const editButtons = screen.getAllByLabelText('Edit')
    fireEvent.click(editButtons[0])
    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0])
  })

  it('calls onDelete with correct user ID when delete button is clicked', () => {
    const deleteButtons = screen.getAllByLabelText('Delete')
    fireEvent.click(deleteButtons[2])
    expect(mockOnDelete).toHaveBeenCalledWith(mockUsers[2].id)
  })
})
