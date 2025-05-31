import { describe, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TechnicianIncidentsPage from '../../../src/pages/technician/TechnicianIncidentsPage'
import * as AuthContext from '../../../src/context/AuthContext'
import ApiConfig from '../../../src/api/apiConfig'

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to }) => <div data-testid="navigate" data-to={to} />,
  }
})

vi.mock('../../../src/api/apiConfig', () => ({
  default: {
    getIncidentsByTechnicianId: vi.fn(),
  },
}))

vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../../../src/components/common/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}))

vi.mock('../../../src/components/incidents/table/IncidentsTable', () => ({
  default: ({ incidents, showDetails, onStatusUpdate }) => (
    <div data-testid="incidents-table">
      <span>Incident Count: {incidents.length}</span>
      {incidents.map((incident) => (
        <div key={incident.id} data-testid={`incident-${incident.id}`}>
          <span>{incident.title}</span>
          <button onClick={() => showDetails(incident)} data-testid={`view-${incident.id}`}>
            View Details
          </button>
          <button
            onClick={() => onStatusUpdate(incident.id, incident.priority, 'Resolved')}
            data-testid={`update-${incident.id}`}
          >
            Mark Resolved
          </button>
        </div>
      ))}
    </div>
  ),
}))

vi.mock('../../../src/components/incidents/table/TechnicianRow', () => ({
  TechnicianRow: () => <div data-testid="technician-row" />,
}))

vi.mock('../../../src/components/incidents/IncidentModal', () => ({
  default: ({ showModal, handleClose, selectedIncident }) =>
    showModal ? (
      <div data-testid="incident-modal">
        {selectedIncident && (
          <div>
            <span>Viewing: {selectedIncident.title}</span>
            <button onClick={handleClose} data-testid="close-modal">
              Close
            </button>
          </div>
        )}
      </div>
    ) : null,
}))

function setup(authOverride = {}) {
  const useAuthMock = vi.spyOn(AuthContext, 'useAuth')
  useAuthMock.mockImplementation(() => ({
    auth: {
      user: {
        id: 'tech-123',
        username: 'technician1',
        ...authOverride.user,
      },
      ...authOverride,
    },
  }))

  return render(
    <MemoryRouter>
      <TechnicianIncidentsPage />
    </MemoryRouter>
  )
}

describe('TechnicianIncidentsPage', () => {
  const mockIncidents = [
    {
      id: 1,
      title: 'Network Outage',
      description: 'Main router down',
      priority: 'High',
      status: 'Open',
      technicianId: 'tech-123',
    },
    {
      id: 2,
      title: 'Printer Error',
      description: 'Paper jam in HR printer',
      priority: 'Medium',
      status: 'In Progress',
      technicianId: 'tech-123',
    },
    {
      id: 3,
      title: 'Software Installation',
      description: 'Need MS Office installed',
      priority: 'Low',
      status: 'Open',
      technicianId: 'tech-123',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ApiConfig.getIncidentsByTechnicianId.mockResolvedValue({
      data: mockIncidents,
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('shows loading spinner while fetching incidents', () => {
    ApiConfig.getIncidentsByTechnicianId.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    setup()

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders incidents table after loading', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('incidents-table')).toBeInTheDocument()
    expect(screen.getByText('Incident Count: 3')).toBeInTheDocument()
    expect(screen.getByText('Network Outage')).toBeInTheDocument()
    expect(screen.getByText('Printer Error')).toBeInTheDocument()
    expect(screen.getByText('Software Installation')).toBeInTheDocument()
  })

  it('handles API error when fetching incidents', async () => {
    ApiConfig.getIncidentsByTechnicianId.mockRejectedValue(new Error('API Error'))

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Failed to fetch incidents')).toBeInTheDocument()
  })

  it('does not fetch incidents when userId is not available', async () => {
    const useAuthMock = vi.spyOn(AuthContext, 'useAuth')
    useAuthMock.mockImplementation(() => ({
      auth: {
        user: undefined,
      },
    }))

    render(
      <MemoryRouter>
        <TechnicianIncidentsPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(ApiConfig.getIncidentsByTechnicianId).not.toHaveBeenCalled()
    })
  })

  it('opens modal when incident details button is clicked', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const viewButton = screen.getByTestId('view-1')
    await userEvent.click(viewButton)

    expect(screen.getByTestId('incident-modal')).toBeInTheDocument()
    expect(screen.getByText('Viewing: Network Outage')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const viewButton = screen.getByTestId('view-2')
    await userEvent.click(viewButton)

    expect(screen.getByTestId('incident-modal')).toBeInTheDocument()

    const closeButton = screen.getByTestId('close-modal')
    await userEvent.click(closeButton)

    expect(screen.queryByTestId('incident-modal')).not.toBeInTheDocument()
  })

  it('updates incident status when update button is clicked', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const updateButton = screen.getByTestId('update-2')
    await userEvent.click(updateButton)
  })

  it('fetches incidents with the correct user ID', async () => {
    const useAuthMock = vi.spyOn(AuthContext, 'useAuth')
    useAuthMock.mockImplementation(() => ({
      auth: {
        user: {
          id: 'tech-456',
          username: 'technician2',
        },
      },
    }))

    render(
      <MemoryRouter>
        <TechnicianIncidentsPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(ApiConfig.getIncidentsByTechnicianId).toHaveBeenCalledWith('tech-456')
    })
  })

  it('does not fetch incidents if user ID changes to undefined', async () => {
    const useAuthMock = vi.spyOn(AuthContext, 'useAuth')

    useAuthMock.mockImplementation(() => ({
      auth: {
        user: {
          id: 'tech-123',
          username: 'technician1',
        },
      },
    }))
    const { rerender } = render(
      <MemoryRouter>
        <TechnicianIncidentsPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(ApiConfig.getIncidentsByTechnicianId).toHaveBeenCalledTimes(1)
    })
    vi.clearAllMocks()
    useAuthMock.mockImplementation(() => ({
      auth: {
        user: undefined,
      },
    }))
    rerender(
      <MemoryRouter>
        <TechnicianIncidentsPage />
      </MemoryRouter>
    )

    expect(ApiConfig.getIncidentsByTechnicianId).not.toHaveBeenCalled()
  })

  it('cleans up properly on unmount', async () => {
    ApiConfig.getIncidentsByTechnicianId.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: mockIncidents }), 100))
    )
    const consoleSpy = vi.spyOn(console, 'log')
    const { unmount } = setup()
    unmount()
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(consoleSpy).not.toHaveBeenCalledWith('Fetched incidents for:', 'tech-123')
  })
})
