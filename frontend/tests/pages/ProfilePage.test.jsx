import { describe, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ProfilePage from '../../src/pages/ProfilePage'

vi.mock('../../src/components/common/profile/ProfileInfoForm', () => ({
  default: ({ onSuccess, onError }) => (
    <div data-testid="profile-info-form">
      Profile Info Form
      <button
        data-testid="trigger-success"
        onClick={() => onSuccess('Profile updated successfully')}
      >
        Trigger Success
      </button>
      <button
        data-testid="trigger-error"
        onClick={() => onError('Failed to update profile')}
      >
        Trigger Error
      </button>
    </div>
  ),
}))

vi.mock('../../src/components/common/profile/PasswordChangeForm', () => ({
  default: ({ onSuccess, onError, onClose }) => (
    <div data-testid="password-change-form">
      Password Change Form
      <button
        data-testid="trigger-password-success"
        onClick={() => onSuccess('Password changed successfully')}
      >
        Trigger Password Success
      </button>
      <button
        data-testid="trigger-password-error"
        onClick={() => onError('Failed to change password')}
      >
        Trigger Password Error
      </button>
      <button data-testid="close-password-form" onClick={onClose}>
        Close Form
      </button>
    </div>
  ),
}))

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the profile info form by default', () => {
    render(<ProfilePage />)

    expect(screen.getByTestId('profile-info-form')).toBeInTheDocument()
    expect(screen.queryByTestId('password-change-form')).not.toBeInTheDocument()
    expect(screen.getByText('User Profile')).toBeInTheDocument()
    expect(screen.getByText('🔑 Change Password')).toBeInTheDocument()
  })

  it('displays success message when profile is updated', async () => {
    render(<ProfilePage />)

    const successButton = screen.getByTestId('trigger-success')
    await userEvent.click(successButton)

    expect(screen.getByText('Profile updated successfully')).toBeInTheDocument()
    expect(
      screen.queryByText('Failed to update profile')
    ).not.toBeInTheDocument()
  })

  it('displays error message when profile update fails', async () => {
    render(<ProfilePage />)

    const errorButton = screen.getByTestId('trigger-error')
    await userEvent.click(errorButton)

    expect(screen.getByText('Failed to update profile')).toBeInTheDocument()
    expect(
      screen.queryByText('Profile updated successfully')
    ).not.toBeInTheDocument()
  })

  it('toggles to password change form when change password button is clicked', async () => {
    render(<ProfilePage />)

    const changePasswordButton = screen.getByText('🔑 Change Password')
    await userEvent.click(changePasswordButton)

    expect(screen.queryByTestId('profile-info-form')).not.toBeInTheDocument()
    expect(screen.getByTestId('password-change-form')).toBeInTheDocument()
  })

  it('displays success message when password is changed', async () => {
    render(<ProfilePage />)

    const changePasswordButton = screen.getByText('🔑 Change Password')
    await userEvent.click(changePasswordButton)

    const successButton = screen.getByTestId('trigger-password-success')
    await userEvent.click(successButton)

    expect(
      screen.getByText('Password changed successfully')
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByTestId('profile-info-form')).toBeInTheDocument()
      expect(
        screen.queryByTestId('password-change-form')
      ).not.toBeInTheDocument()
    })
  })

  it('displays error message when password change fails', async () => {
    render(<ProfilePage />)

    const changePasswordButton = screen.getByText('🔑 Change Password')
    await userEvent.click(changePasswordButton)

    const errorButton = screen.getByTestId('trigger-password-error')
    await userEvent.click(errorButton)

    expect(screen.getByText('Failed to change password')).toBeInTheDocument()
    expect(
      screen.queryByText('Password changed successfully')
    ).not.toBeInTheDocument()

    expect(screen.getByTestId('password-change-form')).toBeInTheDocument()
  })

  it('closes password form when close button is clicked', async () => {
    render(<ProfilePage />)

    const changePasswordButton = screen.getByText('🔑 Change Password')
    await userEvent.click(changePasswordButton)

    const closeButton = screen.getByTestId('close-password-form')
    await userEvent.click(closeButton)

    expect(screen.getByTestId('profile-info-form')).toBeInTheDocument()
    expect(screen.queryByTestId('password-change-form')).not.toBeInTheDocument()
  })

  it('clears messages when closing password form', async () => {
    render(<ProfilePage />)

    const changePasswordButton = screen.getByText(/Change Password/)
    await userEvent.click(changePasswordButton)

    const errorButton = screen.getByTestId('trigger-password-error')
    await userEvent.click(errorButton)

    expect(screen.getByText('Failed to change password')).toBeInTheDocument()

    const closeButton = screen.getByTestId('close-password-form')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(
        screen.queryByText('Failed to change password')
      ).not.toBeInTheDocument()
    })
  })
})
