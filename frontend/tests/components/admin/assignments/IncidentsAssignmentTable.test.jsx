import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import IncidentAssignmentTable from '../../../../src/components/admin/assignments/IncidentsAssignmentTable'
import { INCIDENT_ASSIGNMENT_TEXT } from '../../../../src/constants/textConstants'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

const mockIncidents = [
  {
    id: 1,
    title: 'Incident 1',
    priority: 'HIGH',
    status: 'OPEN',
    technicianName: 'Tech 1',
    createdAt: '2025-05-13T12:00:00Z',
  },
  {
    id: 2,
    title: 'Incident 2',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    technicianName: 'Tech 2',
    createdAt: '2025-05-14T14:00:00Z',
  },
]

const mockOnSort = vi.fn()
const mockOnSelect = vi.fn()
const mockShowDetails = vi.fn()

describe('IncidentAssignmentTable', () => {
  beforeEach(() => {
    render(
      <IncidentAssignmentTable
        incidents={mockIncidents}
        sortConfig={{ key: 'title', direction: 'asc' }}
        selectedIncidents={[1]}
        onSort={mockOnSort}
        onSelect={mockOnSelect}
        showDetails={mockShowDetails}
      />
    )
  })

  it('renders table headers correctly', () => {
    expect(screen.getByText(INCIDENT_ASSIGNMENT_TEXT.table.titleTh)).toBeInTheDocument()
    expect(screen.getByText(INCIDENT_ASSIGNMENT_TEXT.table.priorityTh)).toBeInTheDocument()
    expect(screen.getByText(INCIDENT_ASSIGNMENT_TEXT.table.statusTh)).toBeInTheDocument()
    expect(screen.getByText(INCIDENT_ASSIGNMENT_TEXT.table.assignedToTh)).toBeInTheDocument()
    expect(screen.getByText(INCIDENT_ASSIGNMENT_TEXT.table.createdAtTh)).toBeInTheDocument()
    expect(screen.getByText(INCIDENT_ASSIGNMENT_TEXT.table.detailsTh)).toBeInTheDocument()
  })

  it('sorts by title when clicked', () => {
    const titleHeader = screen.getByText(INCIDENT_ASSIGNMENT_TEXT.table.titleTh)
    fireEvent.click(titleHeader)
    expect(mockOnSort).toHaveBeenCalledWith('title')
  })

  it('renders rows with incident data', () => {
    const row1 = screen.getByText('Incident 1')
    const row2 = screen.getByText('Incident 2')
    expect(row1).toBeInTheDocument()
    expect(row2).toBeInTheDocument()
  })

  it('calls showDetails when the "eye" button is clicked', () => {
    const eyeButton = screen.getAllByRole('button')[0] // the first button in the details column
    fireEvent.click(eyeButton)
    expect(mockShowDetails).toHaveBeenCalledWith(mockIncidents[0])
  })

  it('displays the correct badge for priority', () => {
    const highPriorityBadge = screen.getByText('HIGH').closest('span')
    expect(highPriorityBadge).toHaveClass('bg-danger')

    const lowPriorityBadge = screen.getByText('LOW').closest('span')
    expect(lowPriorityBadge).toHaveClass('bg-success')
  })

  it('selects and deselects incidents correctly', () => {
    const checkbox = screen.getByRole('checkbox', { name: /incident 1/i })
    fireEvent.click(checkbox) // Deselect
    expect(mockOnSelect).toHaveBeenCalledWith(1)

    fireEvent.click(checkbox) // Select again
    expect(mockOnSelect).toHaveBeenCalledWith(1)
  })
})
