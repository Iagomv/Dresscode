// tests/layout/TopNavigation.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as routerDom from 'react-router-dom'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { TOP_NAVIGATION_TEXT } from '../../src/constants/textConstants'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    NavLink: (props) => <a {...props} />,
  }
})

const mockLogout = vi.fn()
let mockRole = 'ROLE_USER'

vi.mock('../../src/context/AuthContext', () => ({
  useAuth: () => ({
    auth: { user: { authorities: [mockRole] } },
    logout: mockLogout,
  }),
}))

import { TopNavigation } from '../../src/layout/TopNavigation' //import after mocking

function setup(role = 'ROLE_USER') {
  mockRole = role
  mockLogout.mockReset()
  const navigate = vi.fn()
  vi.spyOn(routerDom, 'useNavigate').mockImplementation(() => navigate)

  render(
    <MemoryRouter>
      <TopNavigation />
    </MemoryRouter>
  )
  return { navigate }
}

describe('TopNavigation', () => {
  it('renders USER links', () => {
    setup('ROLE_USER')
    expect(screen.getByText(`${TOP_NAVIGATION_TEXT.myIncidents}`)).toBeInTheDocument()
    expect(screen.getByText(`${TOP_NAVIGATION_TEXT.createIncident}`)).toBeInTheDocument()
  })

  it('renders TECHNICIAN link', () => {
    setup('ROLE_TECHNICIAN')
    expect(screen.getByText(`${TOP_NAVIGATION_TEXT.myAssignedIncidents}`)).toBeInTheDocument()
  })

  it('renders ADMIN links', () => {
    setup('ROLE_ADMIN')
    expect(screen.getByText(`${TOP_NAVIGATION_TEXT.userManagement}`)).toBeInTheDocument()
    expect(screen.getByText(`${TOP_NAVIGATION_TEXT.assignIncidents}`)).toBeInTheDocument()
    expect(screen.getByText(`${TOP_NAVIGATION_TEXT.statistics}`)).toBeInTheDocument()
  })

  it('calls logout and navigates on logout click', () => {
    const { navigate } = setup('ROLE_USER')

    fireEvent.click(screen.getByText(`${TOP_NAVIGATION_TEXT.profile}`))
    fireEvent.click(screen.getByText(`${TOP_NAVIGATION_TEXT.logout}`))

    expect(mockLogout).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})
