import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import IncidentsRegisterPage from '../../../src/pages/user/IncidentsRegisterPage'
import '@testing-library/jest-dom'

vi.mock('../../../src/components/incidents/IncidentForm', () => ({
  IncidentForm: () => <div data-testid="incident-form-mock" />,
}))

describe('IncidentsRegisterPage', () => {
  it('renders the title and the IncidentForm', () => {
    render(<IncidentsRegisterPage />)

    expect(
      screen.getByRole('heading', { name: /creación de un nuevo incidente/i })
    ).toBeInTheDocument()

    expect(screen.getByTestId('incident-form-mock')).toBeInTheDocument()
  })
})
