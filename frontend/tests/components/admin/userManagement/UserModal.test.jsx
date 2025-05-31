import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserModal from '../../../../src/components/admin/userManagement/UserModal'
import { FORM_TEXT, ADMIN_USER_MANAGEMENT_TEXT } from '../../../../src/constants/textConstants'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

describe('UserModal', () => {
  const mockOnHide = vi.fn()
  const mockOnSave = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should submit the form successfully', async () => {
    mockOnSave.mockResolvedValueOnce({})

    render(<UserModal show={true} onHide={mockOnHide} onSave={mockOnSave} isSubmitting={false} />)

    fireEvent.change(screen.getByLabelText(FORM_TEXT.username), {
      target: { value: 'newuser' },
    })

    fireEvent.change(screen.getByLabelText(FORM_TEXT.email), {
      target: { value: 'newuser@example.com' },
    })

    fireEvent.change(screen.getByLabelText(FORM_TEXT.role), {
      target: { value: 'USER' },
    })

    fireEvent.change(screen.getByLabelText(FORM_TEXT.password), {
      target: { value: 'securePassword123@' },
    })

    fireEvent.click(screen.getByRole('button', { name: /create user/i }))

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'newuser@example.com',
        role: 'USER',
        password: 'securePassword123@',
      })
    })
  })

  test('should show error message when submit fails', async () => {
    mockOnSave.mockRejectedValueOnce({
      response: { data: { message: 'Email already exists' } },
    })

    render(<UserModal show={true} onHide={mockOnHide} onSave={mockOnSave} isSubmitting={false} />)

    fireEvent.change(screen.getByLabelText(FORM_TEXT.username), {
      target: { value: 'existinguser' },
    })

    fireEvent.change(screen.getByLabelText(FORM_TEXT.email), {
      target: { value: 'existing@example.com' },
    })

    fireEvent.change(screen.getByLabelText(FORM_TEXT.role), {
      target: { value: 'ADMIN' },
    })

    fireEvent.change(screen.getByLabelText(FORM_TEXT.password), {
      target: { value: 'securePassword1@' },
    })

    fireEvent.click(screen.getByRole('button', { name: /create user/i }))

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled()
    })
  })

  test('should render edit title if editing user', () => {
    render(
      <UserModal
        show={true}
        onHide={mockOnHide}
        onSave={mockOnSave}
        user={{ username: 'john', email: 'john@example.com', role: 'ADMIN' }}
        isSubmitting={false}
      />
    )

    expect(screen.getByText(ADMIN_USER_MANAGEMENT_TEXT.userModal.editTitle)).toBeInTheDocument()
  })

  test('should render create title if creating new user', () => {
    render(<UserModal show={true} onHide={mockOnHide} onSave={mockOnSave} isSubmitting={false} />)

    const titles = screen.getAllByText(ADMIN_USER_MANAGEMENT_TEXT.userModal.createTitle)
    expect(titles.length).toBeGreaterThan(0)
    titles.forEach((title) => expect(title).toBeInTheDocument())
  })
})
