import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Row } from '../../../../src/components/incidents/table/Row'
import '@testing-library/jest-dom'

describe('Row component', () => {
  const mockIncident = {
    title: 'Network Outage',
    category: 'Network',
    priority: 'HIGH',
    status: 'OPEN',
    description: 'Major outage affecting multiple users',
    createdAt: '2023-10-04T14:30:00Z',
  }

  const renderRow = (incident = mockIncident, showDetails = vi.fn()) => {
    return render(
      <table>
        <tbody>
          <Row incident={incident} showDetails={showDetails} />
        </tbody>
      </table>
    )
  }

  it('renders incident details correctly', () => {
    renderRow()

    expect(screen.getByText(/network outage/i)).toBeInTheDocument()
    expect(screen.getByText('Network')).toBeInTheDocument()
    expect(screen.getByText(/major outage/i)).toBeInTheDocument()

    const priorityBadge = screen.getByText('HIGH')
    expect(priorityBadge).toBeInTheDocument()
    expect(priorityBadge).toHaveClass('badge', 'bg-danger')

    const statusBadge = screen.getByText('OPEN')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveClass('badge', 'bg-primary')

    expect(screen.getByText(/Oct.*2023.*\d{1,2}:\d{2}/i)).toBeInTheDocument()
  })

  it('calls showDetails when the view button is clicked', () => {
    const showDetails = vi.fn()
    renderRow(mockIncident, showDetails)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(showDetails).toHaveBeenCalledWith(mockIncident)
  })

  it('falls back to secondary badge on unknown priority/status', () => {
    const weirdIncident = {
      ...mockIncident,
      priority: 'UNKNOWN',
      status: 'MYSTERY',
    }
    renderRow(weirdIncident)

    const priorityBadge = screen.getByText('UNKNOWN')
    const statusBadge = screen.getByText('MYSTERY')

    expect(priorityBadge).toHaveClass('badge', 'bg-secondary')
    expect(statusBadge).toHaveClass('badge', 'bg-secondary')
  })
})
