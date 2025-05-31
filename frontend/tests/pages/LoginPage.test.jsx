import { describe, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../../src/pages/LoginPage'
import { LOGIN_AND_REGISTER } from '../../src/constants/textConstants'
import '@testing-library/jest-dom'

export const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../src/components/login/LoginForm.jsx', () => ({
  LoginForm: () => <div data-testid="login-form">Login Form</div>,
}))

vi.mock('../../src/components/login/SignUpForm.jsx', () => ({
  SignUpForm: ({ toggleForm }) => (
    <div data-testid="signup-form">
      Signup Form
      <button data-testid="mock-toggle" onClick={toggleForm}>
        Mock Toggle
      </button>
    </div>
  ),
}))

const mockAuth = { token: null }
vi.mock('../../src/context/AuthContext.jsx', () => ({
  useAuth: () => ({ auth: mockAuth }),
}))

function setup() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.token = null
  })

  it('renders the login form by default', () => {
    setup()
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
    expect(screen.queryByTestId('signup-form')).not.toBeInTheDocument()
    expect(screen.getByText(`${LOGIN_AND_REGISTER.createAnAccount}`)).toBeInTheDocument()
  })

  it('toggles to signup form when button is clicked', async () => {
    setup()
    const toggleButton = screen.getByText(`${LOGIN_AND_REGISTER.createAnAccount}`)

    await userEvent.click(toggleButton)

    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument()
    expect(screen.getByTestId('signup-form')).toBeInTheDocument()
    expect(screen.getByText(`${LOGIN_AND_REGISTER.alreadyHaveAnAccount}`)).toBeInTheDocument()
  })

  it('toggles back to login form when button is clicked again', async () => {
    setup()

    const createAccountButton = screen.getByText(`${LOGIN_AND_REGISTER.createAnAccount}`)
    await userEvent.click(createAccountButton)

    const loginButton = screen.getByText(`${LOGIN_AND_REGISTER.alreadyHaveAnAccount}`)
    await userEvent.click(loginButton)

    expect(screen.getByTestId('login-form')).toBeInTheDocument()
    expect(screen.queryByTestId('signup-form')).not.toBeInTheDocument()
  })

  it('redirects to home if user is already authenticated', async () => {
    mockAuth.token = 'fake-token'

    setup()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
    })
  })

  it('passes toggleForm to SignUpForm and toggles when called', async () => {
    setup()

    const createAccountButton = screen.getByText(`${LOGIN_AND_REGISTER.createAnAccount}`)
    await userEvent.click(createAccountButton)

    const mockToggleButton = screen.getByTestId('mock-toggle')
    await userEvent.click(mockToggleButton)

    expect(screen.getByTestId('login-form')).toBeInTheDocument()
    expect(screen.queryByTestId('signup-form')).not.toBeInTheDocument()
  })

  it('does not redirect if user is not authenticated', () => {
    setup()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
