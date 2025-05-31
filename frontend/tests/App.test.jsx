import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import App from '../src/App'
import { useAuth } from '../src/context/AuthContext'

vi.mock('../src/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

// Mock all the pages
vi.mock('../src/pages/LoginPage', () => ({
  default: () => <div>Login Page</div>,
}))
vi.mock('../src/pages/Home', () => ({
  default: () => <div>Home Page</div>,
}))
vi.mock('../src/pages/user/IncidentsVisualizationPage', () => ({
  default: () => <div>Incidents Visualization</div>,
}))
vi.mock('../src/pages/user/IncidentsRegisterPage', () => ({
  default: () => <div>Incidents Register</div>,
}))
vi.mock('../src/pages/ProfilePage', () => ({
  default: () => <div>Profile</div>,
}))
vi.mock('../src/pages/technician/TechnicianIncidentsPage', () => ({
  default: () => <div>Technician Incidents</div>,
}))

vi.mock('../src/pages/admin/AdminUserManagementPage', () => ({
  default: () => <div>User Management</div>,
}))
vi.mock('../src/pages/admin/IncidentAssignmentPage', () => ({
  default: () => <div>Assignments</div>,
}))
vi.mock('../src/pages/admin/StatisticsPage', () => ({
  default: () => <div>Statistics</div>,
}))

vi.mock('../src/layout/Layout', () => ({
  default: () => {
    const { Outlet } = require('react-router-dom')
    return (
      <div data-testid="layout">
        <Outlet />
      </div>
    )
  },
}))

describe('App Component', () => {
  const mockUseAuth = vi.mocked(useAuth)

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  const renderApp = (initialRoute = '/', isAuthenticated = true) => {
    mockUseAuth.mockReturnValue({
      isAuthenticated,
      auth: isAuthenticated ? { user: { name: 'Test User' } } : null,
      login: vi.fn(),
      logout: vi.fn(),
    })

    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    )
  }

  it('renders login page for /login route when unauthenticated', () => {
    renderApp('/login', false)
    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByTestId('layout')).not.toBeInTheDocument()
  })

  it('redirects to login when accessing private route unauthenticated', () => {
    renderApp('/', false)
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('renders layout with Home Page for / route when authenticated', () => {
    renderApp('/', true)
    const layout = screen.getByTestId('layout')
    expect(layout).toBeInTheDocument()
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('renders Incidents Visualization for /visualization route', () => {
    renderApp('/visualization', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Incidents Visualization')).toBeInTheDocument()
  })

  it('renders Incidents Register for /register route', () => {
    renderApp('/register', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Incidents Register')).toBeInTheDocument()
  })

  it('renders Profile Page for /profile route', () => {
    renderApp('/profile', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('renders Technician Incidents for /assigned-incidents route', () => {
    renderApp('/assigned-incidents', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Technician Incidents')).toBeInTheDocument()
  })

  it('renders Assignments for /assignments route', () => {
    renderApp('/assignments', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Assignments')).toBeInTheDocument()
  })

  it('renders User Management for /user-management route', () => {
    renderApp('/user-management', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('User Management')).toBeInTheDocument()
  })

  it('renders Statistics for /statistics route', () => {
    renderApp('/statistics', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Statistics')).toBeInTheDocument()
  })

  it('redirects to home for unknown route', () => {
    renderApp('/unknown-route', true)
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
