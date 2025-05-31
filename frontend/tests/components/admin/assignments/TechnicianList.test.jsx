import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TechnicianList from '../../../../src/components/admin/assignments/TechniciansList'
import { INCIDENT_ASSIGNMENT_TEXT } from '../../../../src/constants/textConstants'

describe('TechnicianList', () => {
  const mockTechnicians = [
    { id: 1, username: 'tech1', email: 'tech1@example.com', incidentCount: 3 },
    { id: 2, username: 'tech2', email: 'tech2@example.com', incidentCount: 5 },
  ]

  it('renders the card header text correctly', () => {
    render(<TechnicianList technicians={mockTechnicians} />)
    expect(screen.getByText(INCIDENT_ASSIGNMENT_TEXT.avaliableTechniciansTitle)).toBeInTheDocument()
  })

  it('renders the correct number of technicians', () => {
    render(<TechnicianList technicians={mockTechnicians} />)
    const items = screen.getAllByTestId('technician-item')
    expect(items).toHaveLength(mockTechnicians.length)
  })

  it('displays technician usernames, emails, and incident counts', () => {
    render(<TechnicianList technicians={mockTechnicians} />)

    mockTechnicians.forEach(({ username, email, incidentCount }) => {
      expect(screen.getByText(username)).toBeInTheDocument()
      expect(screen.getByText(email)).toBeInTheDocument()
      expect(screen.getByText(incidentCount.toString())).toBeInTheDocument()
    })
  })

  it('renders nothing if technicians list is empty', () => {
    const { container } = render(<TechnicianList technicians={[]} />)
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })
})
