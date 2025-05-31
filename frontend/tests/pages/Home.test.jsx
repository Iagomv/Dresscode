import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../../src/pages/Home'
import { ERROR_MESSAGES } from '../../src/constants/textConstants'
import * as AuthContext from '../../src/context/AuthContext'

vi.mock('../../src/pages/user/IncidentsVisualizationPage', () => ({
  default: () => <div data-testid="incidents-visualization">Incidents Visualization Page</div>,
}))

vi.mock('../../src/pages/technician/TechnicianIncidentsPage', () => ({
  default: () => <div data-testid="technician-incidents">Technician Incidents Page</div>,
}))

vi.mock('../../src/pages/admin/AdminIncidentsViewPage', () => ({
  default: () => <div data-testid="admin-incidents">Admin Incidents View</div>,
}))

vi.mock('../../src/pages/admin/IncidentAssignmentPage', () => ({
  default: () => <div data-testid="incident-assignment">Incident Assignment Page</div>,
}))

vi.mock('../../src/components/common/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}))

describe('Home Component', () => {
  const useAuthSpy = vi.spyOn(AuthContext, 'useAuth')

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading spinner when isLoading is true', () => {
    useAuthSpy.mockReturnValue({
      auth: null,
      isLoading: true,
      isAuthenticated: false,
    })

    render(<Home />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders unauthorized message when no role is present', () => {
    useAuthSpy.mockReturnValue({
      auth: { user: {} },
      isLoading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(<Home />)
    expect(screen.getByText(ERROR_MESSAGES.noRoleError)).toBeInTheDocument()
  })

  it('renders IncidentsVisualizationPage for USER role', () => {
    useAuthSpy.mockReturnValue({
      auth: { user: { authorities: ['ROLE_USER'] } },
      isLoading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(<Home />)
    expect(screen.getByTestId('incidents-visualization')).toBeInTheDocument()
  })

  it('renders TechnicianIncidentsPage for TECHNICIAN role', () => {
    useAuthSpy.mockReturnValue({
      auth: { user: { authorities: ['ROLE_TECHNICIAN'] } },
      isLoading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(<Home />)
    expect(screen.getByTestId('technician-incidents')).toBeInTheDocument()
  })

  it('renders IncidentAssignmentPage for ADMIN role', () => {
    useAuthSpy.mockReturnValue({
      auth: { user: { authorities: ['ROLE_ADMIN'] } },
      isLoading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(<Home />)
    expect(screen.getByTestId('incident-assignment')).toBeInTheDocument()
  })

  it('renders not recognized message for unknown role', () => {
    useAuthSpy.mockReturnValue({
      auth: { user: { authorities: ['ROLE_UNKNOWN'] } },
      isLoading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(<Home />)
    expect(screen.getByText(ERROR_MESSAGES.noRoleError)).toBeInTheDocument()
  })
})
