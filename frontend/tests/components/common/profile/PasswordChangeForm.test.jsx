import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import PasswordChangeForm from '../../../../src/components/common/profile/PasswordChangeForm'
import ApiConfig from '../../../../src/api/apiConfig'
import '@testing-library/jest-dom'

vi.mock('../../../../src/api/apiConfig', () => ({
  default: {
    updatePassword: vi.fn(),
  },
}))

vi.mock('../../../../src/schema/ProfileSchema', () => ({
  passwordChangeSchema: {
    validate: vi.fn().mockResolvedValue({}), // always passes validation
  },
}))

describe('PasswordChangeForm', () => {
  const mockOnSuccess = vi.fn()
  const mockOnError = vi.fn()
  const mockOnClose = vi.fn()
  const setup = () => {
    render(<PasswordChangeForm onSuccess={mockOnSuccess} onError={mockOnError} onClose={mockOnClose} />)
  }
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form correctly', () => {
    setup()
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByText(/back to profile/i)).toBeInTheDocument()
    expect(screen.getByText(/change password/i)).toBeInTheDocument()
  })

  it('handles form submission successfully', async () => {
    ApiConfig.updatePassword.mockResolvedValueOnce({})

    setup()

    fireEvent.change(screen.getByLabelText(/current password/i), {
      target: { value: 'currentPass123' },
    })
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'newPass123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newPass123' },
    })

    fireEvent.click(screen.getByText(/change password/i))

    await waitFor(() => {
      expect(ApiConfig.updatePassword).toHaveBeenCalledWith({
        currentPassword: 'currentPass123',
        newPassword: 'newPass123',
      })
      expect(mockOnSuccess).toHaveBeenCalledWith('Password changed successfully')
    })
  })

  it('handles API errors', async () => {
    const errorMessage = 'Invalid current password'
    ApiConfig.updatePassword.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    })

    setup()

    fireEvent.change(screen.getByLabelText(/current password/i), {
      target: { value: 'wrongPassword' },
    })
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'newPass123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newPass123' },
    })

    fireEvent.click(screen.getByText(/change password/i))

    await waitFor(() => {
      expect(ApiConfig.updatePassword).toHaveBeenCalled()
      expect(mockOnError).toHaveBeenCalledWith(errorMessage)
    })
  })

  it('handles generic API errors', async () => {
    // Mock API error with no specific message
    ApiConfig.updatePassword.mockRejectedValueOnce({})

    setup()

    fireEvent.change(screen.getByLabelText(/current password/i), {
      target: { value: 'currentPass123' },
    })
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'newPass123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newPass123' },
    })

    fireEvent.click(screen.getByText(/change password/i))

    await waitFor(() => {
      expect(ApiConfig.updatePassword).toHaveBeenCalled()
      expect(mockOnError).toHaveBeenCalledWith('Failed to change password')
    })
  })

  it('calls onClose when back button is clicked', () => {
    setup()

    fireEvent.click(screen.getByText(/back to profile/i))

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('shows loading state during submission', async () => {
    ApiConfig.updatePassword.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({}), 100)
        })
    )

    setup()

    fireEvent.change(screen.getByLabelText(/current password/i), {
      target: { value: 'currentPass123' },
    })
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'newPass123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newPass123' },
    })

    fireEvent.click(screen.getByText(/change password/i))

    expect(screen.getByText(/updating/i)).toBeInTheDocument()
    const updatingButton = screen.getByRole('button', {
      name: /updating\.\.\./i,
    })
    expect(updatingButton).toBeDisabled()

    await waitFor(() => {
      expect(ApiConfig.updatePassword).toHaveBeenCalled()
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })
})
