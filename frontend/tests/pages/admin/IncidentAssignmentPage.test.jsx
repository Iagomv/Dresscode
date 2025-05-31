import { describe, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import IncidentAssignmentPage from '../../../src/pages/admin/IncidentAssignmentPage'
import * as AuthContext from '../../../src/context/AuthContext'
import ApiConfig from '../../../src/api/apiConfig'
import { toast } from 'react-toastify'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: () => <div data-testid="navigate-redirect" />,
  }
})

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}))

vi.mock('../../../src/api/apiConfig', () => ({
  default: {
    getAllIncidentsWithTechnicianName: vi.fn(),
    getTechniciansWithActualIncidentCount: vi.fn(),
    assignIncidents: vi.fn(),
  },
}))

vi.mock('../../../src/context/AuthContext', () => {
  const actual = vi.importActual('../../../src/context/AuthContext')
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      auth: { user: { authorities: ['ROLE_ADMIN'] } },
    })),
  }
})

vi.mock('../../../src/components/admin/assignments/AssignmentFilters', () => ({
  default: ({ onFilterChange }) => (
    <div data-testid="assignment-filters">
      <button data-testid="change-assignment-status" onClick={() => onFilterChange('assignmentStatus', 'assigned')}>
        Change Assignment Status
      </button>
      <button data-testid="change-priority" onClick={() => onFilterChange('priority', 'high')}>
        Change Priority
      </button>
      <button data-testid="change-incident-status" onClick={() => onFilterChange('incidentStatus', 'open')}>
        Change Incident Status
      </button>
    </div>
  ),
}))

vi.mock('../../../src/components/admin/assignments/IncidentsAssignmentTable', () => ({
  default: ({ incidents, onSelect, onSort, selectedIncidents }) => (
    <div data-testid="incidents-table">
      <p>Total incidents: {incidents.length}</p>
      <button data-testid="sort-by-date" onClick={() => onSort('createdAt')}>
        Sort By Date
      </button>
      {incidents.map((incident) => (
        <div key={incident.id} data-testid={`incident-${incident.id}`}>
          <input
            type="checkbox"
            checked={selectedIncidents.includes(incident.id)}
            onChange={() => onSelect(incident.id)}
            data-testid={`select-incident-${incident.id}`}
          />
          Incident {incident.id} - {incident.technicianName || 'Unassigned'}
        </div>
      ))}
    </div>
  ),
}))

vi.mock('../../../src/components/admin/assignments/TechniciansList', () => ({
  default: ({ technicians }) => (
    <div data-testid="technicians-list">
      <p>Total technicians: {technicians.length}</p>
      {technicians.map((tech) => (
        <div key={tech.id} data-testid={`technician-${tech.id}`}>
          {tech.username} - {tech.incidentCount} incidents
        </div>
      ))}
    </div>
  ),
}))

vi.mock('../../../src/components/admin/assignments/AssignmentControls', () => ({
  default: ({
    selectedIncidents,
    technicians,
    selectedTechnician,
    onTechnicianChange,
    onAssign,
    onSelectAll,
    totalItems,
  }) => (
    <div data-testid="assignment-controls">
      <p>Selected incidents: {selectedIncidents.length}</p>
      <p>Total items: {totalItems}</p>
      <select data-testid="technician-select" value={selectedTechnician} onChange={onTechnicianChange}>
        <option value="">Select Technician</option>
        {technicians.map((tech) => (
          <option key={tech.id} value={tech.id}>
            {tech.username}
          </option>
        ))}
      </select>
      <button data-testid="assign-button" onClick={onAssign}>
        Assign
      </button>
      <button data-testid="select-all-button" onClick={() => onSelectAll(true)}>
        Select All
      </button>
      <button data-testid="deselect-all-button" onClick={() => onSelectAll(false)}>
        Deselect All
      </button>
    </div>
  ),
}))

// Test data
const mockIncidents = [
  {
    id: '1',
    title: 'Incident 1',
    priority: 'high',
    status: 'open',
    createdAt: '2023-01-01',
    technicianId: null,
    technicianName: null,
  },
  {
    id: '2',
    title: 'Incident 2',
    priority: 'medium',
    status: 'open',
    createdAt: '2023-01-02',
    technicianId: '1',
    technicianName: 'Tech1',
  },
  {
    id: '3',
    title: 'Incident 3',
    priority: 'low',
    status: 'closed',
    createdAt: '2023-01-03',
    technicianId: '2',
    technicianName: 'Tech2',
  },
]

function setup() {
  return render(
    <MemoryRouter>
      <IncidentAssignmentPage />
    </MemoryRouter>
  )
}

const mockTechnicians = [
  { id: '1', username: 'Tech1', incidentCount: 1 },
  { id: '2', username: 'Tech2', incidentCount: 1 },
  { id: '3', username: 'Tech3', incidentCount: 0 },
]

describe('IncidentAssignmentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    ApiConfig.getAllIncidentsWithTechnicianName.mockResolvedValue({
      data: mockIncidents,
    })
    ApiConfig.getTechniciansWithActualIncidentCount.mockResolvedValue({
      data: mockTechnicians,
    })
    ApiConfig.assignIncidents.mockResolvedValue({ data: { status: 'success' } })
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      auth: { user: { authorities: ['ROLE_ADMIN'] } },
    })
  })

  it('renders loading spinner initially', () => {
    setup()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders all components when data is loaded', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('assignment-filters')).toBeInTheDocument()
    expect(screen.getByTestId('incidents-table')).toBeInTheDocument()
    expect(screen.getByTestId('technicians-list')).toBeInTheDocument()
    expect(screen.getByTestId('assignment-controls')).toBeInTheDocument()
    expect(screen.getByText('Incident Assignment Management')).toBeInTheDocument()
  })

  it('handles filter changes correctly', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const changeAssignmentStatus = screen.getByTestId('change-assignment-status')
    await userEvent.click(changeAssignmentStatus)

    await waitFor(() => {
      expect(screen.queryByText('Incident 1 - Unassigned')).not.toBeInTheDocument()
      expect(screen.getByText(/Incident 2 - Tech1/)).toBeInTheDocument()
    })
  })

  it('handles incident selection', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const [, incident1Checkbox] = screen.getAllByRole('checkbox')
    await userEvent.click(incident1Checkbox)

    expect(screen.getByText('Selected incidents: 1')).toBeInTheDocument()
  })

  it('handles select all incidents', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const selectAllButton = screen.getByTestId('select-all-button')
    await userEvent.click(selectAllButton)

    expect(screen.getByText('Selected incidents: 3')).toBeInTheDocument()
  })

  it('handles deselect all incidents', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const selectAllButton = screen.getByTestId('select-all-button')
    await userEvent.click(selectAllButton)

    const deselectAllButton = screen.getByTestId('deselect-all-button')
    await userEvent.click(deselectAllButton)

    expect(screen.getByText('Selected incidents: 0')).toBeInTheDocument()
  })

  it('handles technician selection', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const technicianSelect = screen.getByTestId('technician-select')
    await userEvent.selectOptions(technicianSelect, '2')

    const incident1Checkbox = screen.getByTestId('select-incident-1')
    await userEvent.click(incident1Checkbox)

    const assignButton = screen.getByTestId('assign-button')
    await userEvent.click(assignButton)

    expect(ApiConfig.assignIncidents).toHaveBeenCalledWith({
      incidentId: '1',
      technicianId: '2',
    })

    expect(toast.success).toHaveBeenCalledWith('1 incident(s) assigned')
  })

  it('shows warning when trying to assign without selecting technician', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const incident1Checkbox = screen.getByTestId('select-incident-1')
    await userEvent.click(incident1Checkbox)

    const assignButton = screen.getByTestId('assign-button')
    await userEvent.click(assignButton)

    expect(toast.warn).toHaveBeenCalledWith('Please select incidents and a technician')
    expect(ApiConfig.assignIncidents).not.toHaveBeenCalled()
  })

  it('shows error toast when API call fails', async () => {
    ApiConfig.getAllIncidentsWithTechnicianName.mockRejectedValue({
      response: { data: { message: 'API Error' } },
    })

    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    expect(toast.error).toHaveBeenCalledWith('Failed to load data: API Error')
  })

  it('redirects non-admin users', async () => {
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      auth: { user: { authorities: ['ROLE_USER'] } },
    })

    setup()

    expect(screen.getByTestId('navigate-redirect')).toBeInTheDocument()
    expect(screen.queryByText('Incident Assignment Management')).not.toBeInTheDocument()
  })

  it('handles sorting correctly', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const sortButton = screen.getByTestId('sort-by-date')
    await userEvent.click(sortButton)

    await waitFor(() => {
      expect(screen.getByText('Total incidents: 3')).toBeInTheDocument()
    })

    await userEvent.click(sortButton)
    await waitFor(() => {
      expect(screen.getByText('Total incidents: 3')).toBeInTheDocument()
    })
  })

  it('handles successfully assigning incidents and updates UI', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const technicianSelect = screen.getByTestId('technician-select')
    await userEvent.selectOptions(technicianSelect, '3')

    const incident1Checkbox = screen.getByTestId('select-incident-1')
    await userEvent.click(incident1Checkbox)

    const assignButton = screen.getByTestId('assign-button')
    await userEvent.click(assignButton)

    expect(ApiConfig.assignIncidents).toHaveBeenCalledWith({
      incidentId: '1',
      technicianId: '3',
    })

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('1 incident(s) assigned')
      expect(screen.getByText('Selected incidents: 0')).toBeInTheDocument()
    })
  })
})
