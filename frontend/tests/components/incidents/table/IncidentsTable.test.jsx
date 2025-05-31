import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import IncidentsTable from '../../../../src/components/incidents/table/IncidentsTable'
import '@testing-library/jest-dom'
import { INCIDENTS_TABLE_TEXT } from '../../../../src/constants/textConstants'

const mockIncidents = [
  {
    id: 1,
    title: 'Server Down',
    category: 'Infrastructure',
    priority: 'HIGH',
    status: 'OPEN',
    description: 'Main server is unresponsive',
    createdAt: '2023-11-01T08:00:00Z',
  },
  {
    id: 2,
    title: 'Login Issues',
    category: 'Authentication',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    description: 'Users unable to log in intermittently',
    createdAt: '2023-11-01T09:15:00Z',
  },
]

describe('IncidentsTable component', () => {
  it('renders without crashing with incidents', () => {
    render(<IncidentsTable incidents={mockIncidents} showDetails={vi.fn()} />)

    expect(screen.getByText(INCIDENTS_TABLE_TEXT.tableTitle)).toBeInTheDocument()
    expect(screen.getByText('Server Down')).toBeInTheDocument()
    expect(screen.getByText('Login Issues')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure')).toBeInTheDocument()
    expect(screen.getByText('Authentication')).toBeInTheDocument()
  })

  it('displays "There are no incidents" when incidents is an empty array', () => {
    render(<IncidentsTable incidents={[]} showDetails={vi.fn()} />)
    expect(screen.getByText(/there are no incidents/i)).toBeInTheDocument()
  })

  it('displays "There are no incidents" when incidents is undefined', () => {
    render(<IncidentsTable incidents={undefined} showDetails={vi.fn()} />)
    expect(screen.getByText(/there are no incidents/i)).toBeInTheDocument()
  })

  it('uses custom RowComponent if provided', () => {
    const CustomRow = ({ incident }) => (
      <tr data-testid="custom-row">
        <td colSpan={7}>{incident.title} - Custom Row</td>
      </tr>
    )

    render(<IncidentsTable incidents={mockIncidents} showDetails={vi.fn()} RowComponent={CustomRow} />)

    expect(screen.getAllByTestId('custom-row')).toHaveLength(2)
    expect(screen.getByText(/Server Down - Custom Row/)).toBeInTheDocument()
  })
})
