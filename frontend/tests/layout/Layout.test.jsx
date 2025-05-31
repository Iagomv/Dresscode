import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from '../../src/layout/Layout'
import '@testing-library/jest-dom'

vi.mock('../../src/layout/TopNavigation', () => ({
  TopNavigation: () => <div data-testid="top-navigation">TopNavigation</div>,
}))

const setup = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={<div data-testid="outlet-child">Outlet Content</div>}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('Layout', () => {
  it('renders TopNavigation', () => {
    setup()
    expect(screen.getByTestId('top-navigation')).toBeInTheDocument()
  })

  it('renders child route via Outlet', () => {
    setup()
    expect(screen.getByTestId('outlet-child')).toBeInTheDocument()
  })

  it('renders ToastContainer', () => {
    setup()
    const toastContainer = document.querySelector('.Toastify')
    expect(toastContainer).toBeInTheDocument()
  })
})
