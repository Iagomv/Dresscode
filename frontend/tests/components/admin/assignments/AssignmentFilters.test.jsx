import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AssignmentFilters from '../../../../src/components/admin/assignments/AssignmentFilters'
import { INCIDENT_ASSIGNMENT_TEXT, INCIDENT_STATUS, INCIDENT_PRIORITY } from '../../../../src/constants/textConstants'

describe('AssignmentFilters', () => {
  const filters = {
    assignmentStatus: 'assigned',
    priority: 'HIGH',
    incidentStatus: 'OPEN',
  }

  const setup = (customFilters = filters) => {
    const onFilterChange = vi.fn()
    render(<AssignmentFilters filters={customFilters} onFilterChange={onFilterChange} />)
    return { onFilterChange }
  }

  it('renders all filter labels correctly', () => {
    setup()
    expect(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelAssignStatusSelect)).toBeInTheDocument()
    expect(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelPrioritySelect)).toBeInTheDocument()
    expect(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelIncidentStatusSelect)).toBeInTheDocument()
  })

  it('renders all dropdowns with correct initial values', () => {
    setup()
    expect(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelAssignStatusSelect)).toHaveValue('assigned')
    expect(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelPrioritySelect)).toHaveValue('HIGH')
    expect(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelIncidentStatusSelect)).toHaveValue('OPEN')
  })

  it('calls onFilterChange with correct values when dropdowns change', () => {
    const { onFilterChange } = setup()

    fireEvent.change(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelAssignStatusSelect), {
      target: { value: 'unassigned' },
    })
    expect(onFilterChange).toHaveBeenCalledWith('assignmentStatus', 'unassigned')

    fireEvent.change(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelPrioritySelect), {
      target: { value: 'LOW' },
    })
    expect(onFilterChange).toHaveBeenCalledWith('priority', 'LOW')

    fireEvent.change(screen.getByLabelText(INCIDENT_ASSIGNMENT_TEXT.labelIncidentStatusSelect), {
      target: { value: 'IN_PROGRESS' },
    })
    expect(onFilterChange).toHaveBeenCalledWith('incidentStatus', 'IN_PROGRESS')
  })

  it('does not render "Closed" status option', () => {
    setup()
    expect(screen.queryByText('Closed')).not.toBeInTheDocument()
  })
})
