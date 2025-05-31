// tests/components/common/profile/ProfileInfoForm.test.jsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProfileInfoForm, {
  handleNoChanges,
  handleNoPassword,
  handleUserNameChange,
  cleanValues,
  hasNoChanges,
} from '../../../../src/components/common/profile/ProfileInfoForm'
import ApiConfig from '../../../../src/api/apiConfig'
import { useAuth } from '../../../../src/context/AuthContext'
import { toast } from 'react-toastify'
import '@testing-library/jest-dom'

// ——— Mocks ————————————————————————————————————————————————————
vi.mock('../../../../src/api/apiConfig', () => ({
  default: { updateProfile: vi.fn() },
}))
vi.mock('react-toastify', () => ({
  toast: {
    promise: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}))
vi.mock('../../../../src/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))
vi.mock('../../../../src/schema/ProfileSchema', () => ({
  profileChangeSchema: { validate: () => Promise.resolve() },
}))

describe('ProfileInfoForm', () => {
  const mockLogout = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({
      auth: { user: { username: 'alice', email: 'a@x.com' } },
      logout: mockLogout,
    })
  })

  // ——— Helper to render & fill basic fields ———————————————————
  const setupForm = async ({ username, email, password } = {}) => {
    render(<ProfileInfoForm />)
    if (username != null) {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: username },
      })
    }
    if (email != null) {
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: email },
      })
    }
    if (password != null) {
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: password },
      })
    }
    fireEvent.click(screen.getByRole('button', { name: /update profile/i }))
  }

  it('shows error toast when no fields changed', async () => {
    await setupForm({ password: '' })
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('No changes detected'))
    expect(ApiConfig.updateProfile).not.toHaveBeenCalled()
  })

  it('updates email only without modal or logout', async () => {
    ApiConfig.updateProfile.mockResolvedValueOnce({})
    await setupForm({ email: 'new@x.com', password: 'secret' })

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalledTimes(1)
      const config = toast.promise.mock.calls[0][1]
      expect(config.pending).toBe('Updating profile...')
      expect(config.success.render({ data: {} })).toBe('Profile updated successfully')
    })

    expect(mockLogout).not.toHaveBeenCalled()
  })

  it('opens confirmation modal when username changes', async () => {
    await setupForm({ username: 'bob', password: 'secret' })

    expect(await screen.findByText(/confirm username change/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    await waitFor(() => {
      expect(screen.queryByText(/confirm username change/i)).not.toBeInTheDocument()
    })
    expect(ApiConfig.updateProfile).not.toHaveBeenCalled()
  })

  it('confirms username change → calls API, success toast, then logout', async () => {
    ApiConfig.updateProfile.mockResolvedValueOnce({})
    await setupForm({ username: 'bob', password: 'secret' })

    fireEvent.click(await screen.findByRole('button', { name: /confirm changes/i }))

    await waitFor(() => {
      expect(ApiConfig.updateProfile).toHaveBeenCalledWith({
        username: 'bob',
        email: 'a@x.com',
        password: 'secret',
      })
    })

    const config = toast.promise.mock.calls[0][1]
    expect(config.success.render({ data: {} })).toBe('Profile updated successfully. You will be logged out shortly.')
    expect(config.success.render).toBeTypeOf('function')

    await new Promise((r) => setTimeout(r, 3000))
    expect(mockLogout).toHaveBeenCalled()
    expect(toast.info).toHaveBeenCalledWith('Please login with your new username')
  })

  it('shows error toast on API failure', async () => {
    ApiConfig.updateProfile.mockRejectedValueOnce({
      response: { data: { message: 'bad' } },
    })
    await setupForm({ password: 'secret' })

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('No changes detected'))

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'new@x.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /update profile/i }))

    await waitFor(() => {
      const config = toast.promise.mock.calls[0][1]
      expect(config.error.render({ data: { response: { data: { message: 'bad' } } } })).toBe('Error: bad')
    })
  })

  // ——— Helper-method unit tests —————————————————————————————

  it('shows error toast when no changes are detected in handleNoChanges', async () => {
    const setSubmitting = vi.fn()
    const values = { username: 'alice', email: 'a@x.com', password: 'secret' }
    const user = { username: 'alice', email: 'a@x.com' }

    handleNoChanges(values, user, setSubmitting)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('No changes detected')
    })
    expect(setSubmitting).toHaveBeenCalledWith(false)
  })

  it('shows error toast when password is empty in handleNoPassword', async () => {
    const setSubmitting = vi.fn()
    const values = { username: 'alice', email: 'a@x.com', password: '' }

    handleNoPassword(values, setSubmitting)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Password is required to update profile')
    })
    expect(setSubmitting).toHaveBeenCalledWith(false)
  })

  it('opens confirmation modal when username changes in handleUserNameChange', () => {
    const setSubmitting = vi.fn()
    const values = { username: 'bob', email: 'a@x.com', password: 'secret' }
    const user = { username: 'alice', email: 'a@x.com' }
    const setShowConfirmation = vi.fn()
    const setPendingSubmission = vi.fn()

    const result = handleUserNameChange(values, user, setSubmitting, setShowConfirmation, setPendingSubmission)

    expect(result).toBe(true)

    expect(setPendingSubmission).toHaveBeenCalledWith(true)
  })

  it('cleans username and email values in cleanValues', () => {
    const values = {
      username: '   alice   ',
      email: '   a@x.com   ',
      password: 'secret',
    }
    const cleanedValues = cleanValues(values)
    expect(cleanedValues.username).toBe('alice')
    expect(cleanedValues.email).toBe('a@x.com')
  })

  it('returns true when no changes are made in hasNoChanges', () => {
    const values = { username: 'alice', email: 'a@x.com', password: 'secret' }
    const user = { username: 'alice', email: 'a@x.com' }
    expect(hasNoChanges(values, user)).toBe(true)
  })

  it('returns false when there are changes in hasNoChanges', () => {
    const values = { username: 'bob', email: 'a@x.com', password: 'secret' }
    const user = { username: 'alice', email: 'a@x.com' }
    expect(hasNoChanges(values, user)).toBe(false)
  })
})
