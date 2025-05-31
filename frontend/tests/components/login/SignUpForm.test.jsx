import { describe, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { SignUpForm } from '../../../src/components/login/SignUpForm'
import { LOGIN_AND_REGISTER, FORM_TEXT } from '../../../src/constants/textConstants'
import ApiConfig from '../../../src/api/apiConfig'

// Mock dependencies
export const mockToggleForm = vi.fn()

vi.mock('../../../src/api/apiConfig', () => ({
  default: {
    registerUser: vi.fn(),
  },
}))

function setup(props = {}) {
  render(<SignUpForm toggleForm={props.toggleForm || mockToggleForm} />)

  const usernameInput = screen.getByLabelText(`${FORM_TEXT.username}`)
  const emailInput = screen.getByLabelText(`${FORM_TEXT.email}`)
  const passwordInput = screen.getByLabelText(`${FORM_TEXT.password}`)
  const confirmPasswordInput = screen.getByLabelText(`${FORM_TEXT.confirmPassword}`)
  const submitButton = screen.getByRole('button', { name: `${LOGIN_AND_REGISTER.registerButton}` })

  return {
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    submitButton,
  }
}

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders initial form elements', () => {
    const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup()

    expect(usernameInput).toBeInTheDocument()
    expect(usernameInput).toHaveAttribute('type', 'text')

    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')

    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')

    expect(confirmPasswordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')

    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
  })

  it('shows spinner when form is submitting', async () => {
    ApiConfig.registerUser.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup()

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'Password123!')
    await userEvent.type(confirmPasswordInput, 'Password123!')

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })

  it('validates form inputs on submission', async () => {
    const { submitButton } = setup()

    await userEvent.click(submitButton)

    const errorMessages = await screen.findAllByText(/required/i)
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('validates password match on submission', async () => {
    const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup()

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'Password123!')
    await userEvent.type(confirmPasswordInput, 'DifferentPassword123!')

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument()
    })
  })

  it('shows error message on failed registration', async () => {
    ApiConfig.registerUser.mockRejectedValue(new Error('Registration failed'))

    const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup()

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'Password123!')
    await userEvent.type(confirmPasswordInput, 'Password123!')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument()
    })
  })

  it('shows success message and calls toggleForm on successful registration', async () => {
    ApiConfig.registerUser.mockResolvedValue({
      status: 201,
      data: { username: 'testuser', email: 'test@example.com' },
    })

    const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup()

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'Password123!')
    await userEvent.type(confirmPasswordInput, 'Password123!')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(`${LOGIN_AND_REGISTER.registrationSuccesful}`)).toBeInTheDocument()
      expect(mockToggleForm).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(screen.getByText(/testuser/i)).toBeInTheDocument()
    })
  })

  it('does not call toggleForm if not provided', async () => {
    ApiConfig.registerUser.mockResolvedValue({
      status: 201,
      data: { username: 'testuser', email: 'test@example.com' },
    })

    const toggleFormSpy = vi.fn()

    render(<SignUpForm />)

    const usernameInput = screen.getByLabelText(`${FORM_TEXT.username}`)
    const emailInput = screen.getByLabelText(`${FORM_TEXT.email}`)
    const passwordInput = screen.getByLabelText(`${FORM_TEXT.password}`)
    const confirmPasswordInput = screen.getByLabelText(`${FORM_TEXT.confirmPassword}`)
    const submitButton = screen.getByRole('button', { name: `${LOGIN_AND_REGISTER.registerButton}` })

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'Password123!')
    await userEvent.type(confirmPasswordInput, 'Password123!')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText(`${LOGIN_AND_REGISTER.registrationSuccesful}`)).toBeInTheDocument()
      expect(toggleFormSpy).not.toHaveBeenCalled()
    })
  })
})
