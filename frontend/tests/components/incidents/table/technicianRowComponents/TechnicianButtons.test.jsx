import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TechnicianButtons from '../../../../../src/components/incidents/table/technicianRowComponents/TechnicianButtons'
import '@testing-library/jest-dom'

const setup = (props = {}) => {
  const defaultProps = {
    isEditing: false,
    setIsEditing: vi.fn(),
    incident: { status: 'OPEN' },
    showDetails: vi.fn(),
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    handleChange: vi.fn(),
    handleCancel: vi.fn(),
    isUpdating: false,
  }

  const utils = render(<TechnicianButtons {...defaultProps} {...props} />)
  return {
    ...defaultProps,
    ...utils,
  }
}

describe('TechnicianButtons', () => {
  it('shows edit and view buttons when not editing and incident is not closed', () => {
    setup()

    expect(screen.getByTitle(/Edit/i)).toBeInTheDocument()
    expect(screen.getByTitle(/View Details/i)).toBeInTheDocument()
  })

  it('does not show edit button when incident is closed', () => {
    setup({ incident: { status: 'CLOSED' } })

    expect(screen.queryByTitle(/Edit/i)).not.toBeInTheDocument()
    expect(screen.getByTitle(/View Details/i)).toBeInTheDocument()
  })

  it('shows save and cancel buttons when editing and incident is not closed', () => {
    setup({ isEditing: true })

    expect(screen.getByTitle(/Save Changes/i)).toBeInTheDocument()
    expect(screen.getByTitle(/Cancel/i)).toBeInTheDocument()
  })

  it('does not show cancel button when editing and incident is closed', () => {
    setup({ isEditing: true, incident: { status: 'CLOSED' } })

    expect(screen.getByTitle(/Save Changes/i)).toBeInTheDocument()
    expect(screen.queryByTitle(/Cancel/i)).not.toBeInTheDocument()
  })

  it('calls setIsEditing when edit button is clicked', () => {
    const { setIsEditing } = setup()
    fireEvent.click(screen.getByTitle(/Edit/i))
    expect(setIsEditing).toHaveBeenCalledWith(true)
  })

  it('calls showDetails when view button is clicked', () => {
    const { showDetails, incident } = setup()
    fireEvent.click(screen.getByTitle(/View Details/i))
    expect(showDetails).toHaveBeenCalledWith(incident)
  })

  it('calls handleChange with priority and status when save is clicked', () => {
    const { handleChange } = setup({ isEditing: true })
    fireEvent.click(screen.getByTitle(/Save Changes/i))
    expect(handleChange).toHaveBeenCalledWith('MEDIUM', 'IN_PROGRESS')
  })

  it('calls handleCancel when cancel is clicked', () => {
    const { handleCancel } = setup({ isEditing: true })
    fireEvent.click(screen.getByTitle(/Cancel/i))
    expect(handleCancel).toHaveBeenCalled()
  })
})
