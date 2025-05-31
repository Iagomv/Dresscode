import React from 'react'
import { render, screen } from '@testing-library/react'
import IncidentCard from '../../../src/components/incidents/IncidentCard'
import '@testing-library/jest-dom'

const mockIncident = {
  id: 1,
  title: 'Server Down',
  description: 'Main server is unresponsive',
  category: 'HARDWARE',
  priority: 'HIGH',
  status: 'OPEN',
  userId: 2,
  technicianId: null,
  createdAt: '2023-11-01T08:00:00Z',
}

describe('IncidentCard', () => {
  it('renders incident details correctly', () => {
    render(<IncidentCard incident={mockIncident} />)

    expect(screen.getByText(/server down/i)).toBeInTheDocument()
    expect(screen.getByText(/#2/)).toBeInTheDocument()
    expect(screen.getByText(/unassigned/i)).toBeInTheDocument()
    expect(screen.getByText(/hardware/i)).toBeInTheDocument()
    expect(screen.getByText(/open/i)).toBeInTheDocument()
    expect(screen.getByText(/high/i)).toBeInTheDocument()
    expect(screen.getByText(/created/i)).toBeInTheDocument()
  })

  it('renders technician ID when assigned', () => {
    const assignedIncident = { ...mockIncident, technicianId: 77 }
    render(<IncidentCard incident={assignedIncident} />)

    expect(screen.getByText(/Technician/)).toHaveTextContent('#77')
    expect(screen.queryByText(/Unassigned/)).not.toBeInTheDocument()
  })

  it('displays correct badge variants', () => {
    render(<IncidentCard incident={mockIncident} />)

    const priorityBadge = screen.getByText(/HIGH/).closest('.badge')
    const statusBadge = screen.getByText(/OPEN/).closest('.badge')

    expect(priorityBadge).toHaveClass('bg-danger')
    expect(statusBadge).toHaveClass('bg-primary')
  })
})
