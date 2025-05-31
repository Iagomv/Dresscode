import { describe, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LoginForm } from '../../../src/components/login/LoginForm'
import ApiConfig from '../../../src/api/apiConfig'

// Mock dependencies
export const mockLogin = vi.fn()
export const mockNavigate = vi.fn()

vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}))

vi.mock('../../../src/api/apiConfig', () => ({
  default: {
    loginUser: vi.fn(),
  },
}))

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom')
  return {
    ...original,
    useNavigate: () => mockNavigate,
  }
})

function setup() {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  )

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', { name: /log in/i })

  return {
    usernameInput,
    passwordInput,
    submitButton,
  }
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders initial form elements', () => {
    const { usernameInput, passwordInput, submitButton } = setup()

    expect(usernameInput).toBeInTheDocument()
    expect(usernameInput).toHaveAttribute('type', 'text')

    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')

    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
  })

  it('shows spinner when form is submitting', async () => {
    ApiConfig.loginUser.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    const { usernameInput, passwordInput, submitButton } = setup()

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(passwordInput, 'password123')

    await userEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('validates form inputs on submission', async () => {
    const { submitButton } = setup()

    await userEvent.click(submitButton)

    expect(screen.getAllByText(/required/i).length).toBe(2)
  })

  it('shows error message on failed login', async () => {
    ApiConfig.loginUser.mockRejectedValue(new Error('Login failed'))

    const { usernameInput, passwordInput, submitButton } = setup()

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(passwordInput, 'wrong-password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument()
    })
  })

  it('navigates to home on successful login', async () => {
    ApiConfig.loginUser.mockResolvedValue({
      status: 200,
      data: { token: 'fake-token' },
    })

    const { usernameInput, passwordInput, submitButton } = setup()

    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('fake-token')
      expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true })
    })
  })
})
