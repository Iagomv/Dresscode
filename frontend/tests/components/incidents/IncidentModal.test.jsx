import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import IncidentModal from '../../../src/components/incidents/IncidentModal'
import '@testing-library/jest-dom'
import { INCIDENTS_TABLE_TEXT } from '../../../src/constants/textConstants'
const mockIncident = {
  id: 1,
  title: 'Server Down',
  category: 'HARDWARE',
  priority: 'HIGH',
  status: 'OPEN',
  description: 'Main server is unresponsive',
  createdAt: '2023-11-01T08:00:00Z',
}

describe('IncidentModal', () => {
  it('renders the modal when showModal is true', () => {
    render(<IncidentModal showModal={true} handleClose={vi.fn()} selectedIncident={mockIncident} />)

    expect(screen.getByText(/server down/i)).toBeInTheDocument()
    expect(screen.getByText(/hardware/i)).toBeInTheDocument()
    expect(screen.getByText(/high/i)).toBeInTheDocument()
    expect(screen.getByText(/open/i)).toBeInTheDocument()
    expect(screen.getByText(/main server is unresponsive/i)).toBeInTheDocument()
  })

  it('does not render modal content when showModal is false', () => {
    const { queryByText } = render(
      <IncidentModal showModal={false} handleClose={vi.fn()} selectedIncident={mockIncident} />
    )

    expect(queryByText(INCIDENTS_TABLE_TEXT.modalTitle)).not.toBeInTheDocument()
  })

  it('calls handleClose when the close button is clicked', () => {
    const handleClose = vi.fn()

    render(<IncidentModal showModal={true} handleClose={handleClose} selectedIncident={mockIncident} />)

    fireEvent.click(screen.getByText(INCIDENTS_TABLE_TEXT.modalCloseButton))

    expect(handleClose).toHaveBeenCalled()
  })
})
