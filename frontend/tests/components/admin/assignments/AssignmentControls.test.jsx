import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AssignmentControls from '../../../../src/components/admin/assignments/AssignmentControls'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

const mockTechs = [
  { id: '1', username: 'tech1', incidentCount: 2 },
  { id: '2', username: 'tech2', incidentCount: 4 },
]

describe('AssignmentControls', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      selectedIncidents: [],
      technicians: mockTechs,
      selectedTechnician: '',
      onTechnicianChange: vi.fn(),
      onAssign: vi.fn(),
      onSelectAll: vi.fn(),
      totalItems: 5,
    }

    return render(<AssignmentControls {...defaultProps} {...props} />)
  }

  it('renders checkbox, dropdown, and button', () => {
    setup()
    expect(screen.getByLabelText(/select all/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /assign 0 incident/i })).toBeInTheDocument()
  })

  it('checkbox reflects correct label and triggers onSelectAll', () => {
    const onSelectAll = vi.fn()
    setup({ selectedIncidents: [1, 2], onSelectAll })

    const checkbox = screen.getByLabelText(/select all/i)
    expect(checkbox).toHaveAttribute('type', 'checkbox')
    expect(checkbox.checked).toBe(false)

    fireEvent.click(checkbox)
    expect(onSelectAll).toHaveBeenCalledWith(true)
  })

  it('dropdown options render correctly and trigger onTechnicianChange', () => {
    const onTechnicianChange = vi.fn()
    setup({ onTechnicianChange })

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(screen.getByText(/tech1 \(2 assigned\)/i)).toBeInTheDocument()
    expect(screen.getByText(/tech2 \(4 assigned\)/i)).toBeInTheDocument()

    fireEvent.change(select, { target: { value: '2' } })
    expect(onTechnicianChange).toHaveBeenCalled()
  })

  it('assign button is enabled only if technician and incidents are selected', () => {
    const onAssign = vi.fn()
    // button should be disabled
    setup({ selectedTechnician: '', selectedIncidents: [1], onAssign })
    const button = screen.getByRole('button', { name: /assign/i })
    expect(button).toBeDisabled()

    // button should be enabled
    setup({ selectedTechnician: '1', selectedIncidents: [1, 2], onAssign })
    const enabledButton = screen.getByRole('button', { name: /assign 2 incident/i })
    expect(enabledButton).not.toBeDisabled()

    fireEvent.click(enabledButton)
    expect(onAssign).toHaveBeenCalled()
  })
})
