import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import StatisticsPage from '../../../src/pages/admin/StatisticsPage'
import { useAllTimeStats } from '../../../src/hooks/useAllTimeStats'
import { STATS_TEXT } from '../../../src/constants/textConstants'
import '@testing-library/jest-dom'

vi.mock('../../../src/hooks/useAllTimeStats', () => ({
  useAllTimeStats: vi.fn(),
}))

vi.mock('../../../src/components/admin/statistics/AllTimeStats', () => {
  return {
    default: () => <div data-testid="AllTimeStats">AllTimeStats</div>,
  }
})

vi.mock('../../../src/components/admin/statistics/ActualStatsChart', () => {
  return {
    default: () => <div data-testid="ActualStatsChart">ActualStatsChart</div>,
  }
})

const mockData = {
  priorityData: [10, 20, 30],
  statusData: [15, 25, 35],
  technicianData: [
    { technician: 'John', tickets: 10 },
    { technician: 'Jane', tickets: 12 },
  ],
  avgClosingTimeData: [2.5, 3.5, 1.5],
  priorityColors: ['#ff0000', '#00ff00', '#0000ff'],
}

describe('StatisticsPage', () => {
  beforeEach(() => {
    useAllTimeStats.mockReturnValue({
      loading: false,
      ...mockData,
    })
  })

  it('should render loading spinner when loading is true', () => {
    useAllTimeStats.mockReturnValueOnce({ loading: true })
    render(<StatisticsPage />)

    const spinner = screen.getByRole('progressbar')
    expect(spinner).toBeInTheDocument()
  })

  it('should toggle between AllTimeStats and ActualStatsChart when button is clicked', async () => {
    render(<StatisticsPage />)

    expect(screen.getByTestId('ActualStatsChart')).toBeInTheDocument()
    expect(screen.queryByTestId('AllTimeStats')).not.toBeInTheDocument()

    const toggleButton = screen.getByRole('button', { name: STATS_TEXT.showAllTimeStats })
    fireEvent.click(toggleButton)

    expect(screen.getByTestId('AllTimeStats')).toBeInTheDocument()
    expect(screen.queryByTestId('ActualStatsChart')).not.toBeInTheDocument()

    fireEvent.click(toggleButton)

    expect(screen.getByTestId('ActualStatsChart')).toBeInTheDocument()
    expect(screen.queryByTestId('AllTimeStats')).not.toBeInTheDocument()
  })

  it('should display the correct heading based on the toggle state', () => {
    render(<StatisticsPage />)

    expect(screen.getByText(STATS_TEXT.actualStats)).toBeInTheDocument()

    const toggleButton = screen.getByRole('button', { name: STATS_TEXT.showAllTimeStats })
    fireEvent.click(toggleButton)

    expect(screen.getByText(STATS_TEXT.allTimeStats)).toBeInTheDocument()
  })
})
