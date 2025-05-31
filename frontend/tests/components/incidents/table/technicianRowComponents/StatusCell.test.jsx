import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import StatusCell from '../../../../../src/components/incidents/table/technicianRowComponents/StatusCell'
import { getBadgeVariant } from '../../../../../src/utils/IncidentUtils'
import '@testing-library/jest-dom'

vi.mock('../../../../../src/utils/IncidentUtils', () => ({
  getBadgeVariant: vi.fn(() => 'mocked-variant'),
}))

const setup = (props = {}) => {
  const defaultProps = {
    isEditing: false,
    status: 'OPEN',
    setStatus: vi.fn(),
    isUpdating: false,
  }

  const mergedProps = { ...defaultProps, ...props }

  render(
    <table>
      <tbody>
        <tr>
          <StatusCell {...mergedProps} />
        </tr>
      </tbody>
    </table>
  )

  return {
    select: screen.queryByRole('combobox'),
    badge: screen.queryByText(mergedProps.status),
    ...mergedProps,
  }
}

describe('StatusCell', () => {
  it('renders a badge with correct status when not editing', () => {
    const { badge } = setup({ isEditing: false, status: 'OPEN' })

    expect(badge).toBeInTheDocument()
    expect(getBadgeVariant).toHaveBeenCalledWith('status', 'OPEN')
  })

  it('renders a select input with correct value when editing', () => {
    const { select } = setup({ isEditing: true, status: 'CLOSED' })

    expect(select).toBeInTheDocument()
    expect(select.value).toBe('CLOSED')
  })

  it('calls setStatus when the value changes', () => {
    const mockSetStatus = vi.fn()
    const { select } = setup({
      isEditing: true,
      status: 'IN_PROGRESS',
      setStatus: mockSetStatus,
    })

    fireEvent.change(select, { target: { value: 'CLOSED' } })
    expect(mockSetStatus).toHaveBeenCalledWith('CLOSED')
  })

  it('disables select when isUpdating is true', () => {
    const { select } = setup({
      isEditing: true,
      isUpdating: true,
    })

    expect(select).toBeDisabled()
  })
})
