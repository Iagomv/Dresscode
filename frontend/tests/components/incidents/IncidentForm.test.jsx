// tests/components/IncidentForm.test.jsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { IncidentForm } from '../../../src/components/incidents/IncidentForm'
import ApiConfig from '../../../src/api/apiConfig'
import { useAuth } from '../../../src/context/AuthContext'
import { toast } from 'react-toastify'
import '@testing-library/jest-dom'

vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../../../src/api/apiConfig', () => ({
  default: { createIncident: vi.fn() },
}))

vi.mock('react-toastify', () => ({
  toast: {
    promise: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('IncidentForm', () => {
  const fakeUser = { id: 'user-42' }

  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ auth: { user: fakeUser } })
  })

  it('renders all fields', () => {
    render(<IncidentForm />)

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Categoría/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Prioridad/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Crear Incidente/i })).toBeInTheDocument()
  })

  it('submits valid form, calls API and resets', async () => {
    ApiConfig.createIncident.mockResolvedValueOnce({ data: { id: 99 } })

    render(<IncidentForm />)

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: 'Test incident' },
    })
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: 'Something went wrong' },
    })
    fireEvent.change(screen.getByLabelText(/Categoría/i), {
      target: { value: 'SOFTWARE' },
    })
    fireEvent.change(screen.getByLabelText(/Prioridad/i), {
      target: { value: 'HIGH' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Crear Incidente/i }))

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalled()
    })

    expect(ApiConfig.createIncident).toHaveBeenCalledWith({
      title: 'Test incident',
      description: 'Something went wrong',
      category: 'SOFTWARE',
      priority: 'HIGH',
      status: 'OPEN',
      userId: 'user-42',
    })

    expect(screen.getByLabelText(/Título/i)).toHaveValue('')
    expect(screen.getByLabelText(/Descripción/i)).toHaveValue('')
    expect(screen.getByLabelText(/Categoría/i)).toHaveValue('')
    expect(screen.getByLabelText(/Prioridad/i)).toHaveValue('LOW')
  })

  it('catches and logs API errors without crashing', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    ApiConfig.createIncident.mockRejectedValueOnce(new Error('fail'))

    render(<IncidentForm />)

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: 'Valid Title' },
    })
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: 'Valid description' },
    })
    fireEvent.change(screen.getByLabelText(/Categoría/i), {
      target: { value: 'SOFTWARE' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Crear Incidente/i }))

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })

  it('requires description', async () => {
    render(<IncidentForm />)

    fireEvent.blur(screen.getByLabelText(/Descripción/i))

    await waitFor(() => {
      expect(screen.getByText(/Description is required/i)).toBeInTheDocument()
    })
  })
})
