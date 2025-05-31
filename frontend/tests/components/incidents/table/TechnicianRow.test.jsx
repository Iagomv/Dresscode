import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TechnicianRow } from '../../../../src/components/incidents/table/TechnicianRow'
import ApiConfig from '../../../../src/api/apiConfig'
import { toast } from 'react-toastify'
import '@testing-library/jest-dom'

vi.mock('react-toastify', () => {
  const real = vi.importActual('react-toastify')
  return {
    ...real,
    toast: {
      promise: vi.fn((promise, { success, error }) => {
        return promise
          .then((data) => {
            if (typeof success.render === 'function') success.render({ data })
            return data
          })
          .catch((err) => {
            if (typeof error.render === 'function') error.render({ data: err })
            throw err
          })
      }),
      error: vi.fn(),
      success: vi.fn(),
    },
  }
})

vi.mock('../../../../src/api/apiConfig', () => ({
  default: { updateIncidentPriorityAndStatus: vi.fn() },
}))

const mockIncident = {
  id: 1,
  title: 'Server Down',
  category: 'Infrastructure',
  priority: 'HIGH',
  status: 'OPEN',
  description: 'Main server is unresponsive',
  createdAt: '2023-11-01T08:00:00Z',
}
const setup = () => {
  render(<TechnicianRow incident={mockIncident} showDetails={vi.fn()} onStatusUpdate={vi.fn()} />)
}
describe('TechnicianRow Component', () => {
  it('renders the incident data correctly', () => {
    setup()

    expect(screen.getByText('Server Down')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure')).toBeInTheDocument()
    expect(screen.getByText('HIGH')).toBeInTheDocument()
    expect(screen.getByText('OPEN')).toBeInTheDocument()
    expect(screen.getByText('Main server is unresponsive')).toBeInTheDocument()
  })

  it('can start editing the priority and status when clicking on the buttons', async () => {
    setup()

    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    await waitFor(() => {
      expect(screen.getByTitle('Save Changes')).toBeInTheDocument()
      expect(screen.getByTitle('Cancel')).toBeInTheDocument()
    })
  })

  it('sends the correct API request when saving changes', async () => {
    const updateIncidentPriorityAndStatusMock = vi.fn().mockResolvedValue({ message: 'Incident updated' })
    ApiConfig.updateIncidentPriorityAndStatus = updateIncidentPriorityAndStatusMock

    setup()

    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    const saveButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(updateIncidentPriorityAndStatusMock).toHaveBeenCalledWith(mockIncident.id, 'HIGH', 'OPEN')
      expect(toast.promise).toHaveBeenCalled()
    })
  })

  it('shows error message when the API request fails', async () => {
    const updateIncidentPriorityAndStatusMock = vi.fn().mockRejectedValue(new Error('API error'))
    ApiConfig.updateIncidentPriorityAndStatus = updateIncidentPriorityAndStatusMock

    setup()

    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    const saveButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An unexpected error occurred')
    })
  })

  it('updates the UI after a successful API call', async () => {
    const updateIncidentPriorityAndStatusMock = vi.fn().mockResolvedValue({ message: 'Incident updated' })
    ApiConfig.updateIncidentPriorityAndStatus = updateIncidentPriorityAndStatusMock
    const onStatusUpdateMock = vi.fn()

    render(<TechnicianRow incident={mockIncident} showDetails={vi.fn()} onStatusUpdate={onStatusUpdateMock} />)

    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    const saveButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(onStatusUpdateMock).toHaveBeenCalledWith(mockIncident.id, 'HIGH', 'OPEN')
    })
  })
})
