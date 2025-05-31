import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PriorityCell from '../../../../../src/components/incidents/table/technicianRowComponents/PriorityCell'
import { getBadgeVariant } from '../../../../../src/utils/IncidentUtils'
import '@testing-library/jest-dom'

vi.mock('../../../../../src/utils/IncidentUtils', () => ({
  getBadgeVariant: vi.fn(() => 'mocked-variant'),
}))

const setup = (props) => {
  const defaultProps = {
    isEditing: false,
    priority: 'HIGH',
    setPriority: vi.fn(),
    isUpdating: false,
  }

  const mergedProps = { ...defaultProps, ...props }

  render(
    <table>
      <tbody>
        <tr>
          <PriorityCell {...mergedProps} />
        </tr>
      </tbody>
    </table>
  )

  return {
    select: screen.queryByRole('combobox'),
    badge: screen.queryByText(mergedProps.priority),
    ...mergedProps,
  }
}

describe('PriorityCell', () => {
  it('renders a badge with correct priority when not editing', () => {
    const { badge } = setup({ isEditing: false, priority: 'HIGH' })

    expect(badge).toBeInTheDocument()
    expect(getBadgeVariant).toHaveBeenCalledWith('priority', 'HIGH')
  })

  it('renders a select input with correct value when editing', () => {
    const { select } = setup({ isEditing: true, priority: 'MEDIUM' })

    expect(select).toBeInTheDocument()
    expect(select.value).toBe('MEDIUM')
  })

  it('calls setPriority when the value changes', () => {
    const mockSetPriority = vi.fn()
    const { select } = setup({
      isEditing: true,
      priority: 'LOW',
      setPriority: mockSetPriority,
    })

    fireEvent.change(select, { target: { value: 'HIGH' } })
    expect(mockSetPriority).toHaveBeenCalledWith('HIGH')
  })

  it('disables select when isUpdating is true', () => {
    const { select } = setup({
      isEditing: true,
      isUpdating: true,
    })

    expect(select).toBeDisabled()
  })
})
