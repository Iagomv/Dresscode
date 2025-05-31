import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import IncidentsVisualizationPage from '../../../src/pages/user/IncidentsVisualizationPage'
import ApiConfig from '../../../src/api/apiConfig'
import { useAuth } from '../../../src/context/AuthContext'
import '@testing-library/jest-dom'

vi.mock('../../../src/components/incidents/table/IncidentsTable', () => ({
  default: ({ incidents }) => <div data-testid="mock-table">Incidents: {incidents.length}</div>,
}))
vi.mock('../../../src/components/incidents/IncidentModal', () => ({
  default: ({ showModal }) => (showModal ? <div data-testid="mock-modal">Modal Open</div> : null),
}))
vi.mock('../../../src/components/common/LoadingSpinner', () => ({
  default: () => <div data-testid="mock-spinner">Loading...</div>,
}))

vi.mock('../../../src/api/apiConfig', () => ({
  default: {
    getIncidentsByUserId: vi.fn(),
  },
}))

vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    auth: { user: { id: 'u123', name: 'Test User' } },
  })),
}))

describe('IncidentsVisualizationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner initially', () => {
    render(<IncidentsVisualizationPage />)
    expect(screen.getByTestId('mock-spinner')).toBeInTheDocument()
  })

  it('renders incidents table after data loads', async () => {
    ApiConfig.getIncidentsByUserId.mockResolvedValueOnce({
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
    })

    render(<IncidentsVisualizationPage />)

    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument())

    expect(screen.getByTestId('mock-table')).toHaveTextContent('Incidents: 3')
  })

  it('shows error if fetch fails', async () => {
    ApiConfig.getIncidentsByUserId.mockRejectedValueOnce(new Error('Network error'))

    render(<IncidentsVisualizationPage />)

    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument())

    expect(screen.getByText('Failed to fetch incidents')).toBeInTheDocument()
  })

  it('does not fetch or render spinner if no user', async () => {
    vi.mocked(useAuth).mockReturnValue({ auth: { user: null } })

    render(<IncidentsVisualizationPage />)

    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument())

    expect(ApiConfig.getIncidentsByUserId).not.toHaveBeenCalled()
  })

  it('fetches incidents for a valid user', async () => {
    vi.mocked(useAuth).mockReturnValue({
      auth: { user: { id: 'u123', name: 'Test User' } },
      isLoading: false,
    })

    ApiConfig.getIncidentsByUserId.mockResolvedValueOnce({
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
    })
    render(<IncidentsVisualizationPage />)

    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument())

    expect(screen.getByTestId('mock-table')).toHaveTextContent('Incidents: 3')

    expect(ApiConfig.getIncidentsByUserId).toHaveBeenCalledWith('u123')
  })
})
