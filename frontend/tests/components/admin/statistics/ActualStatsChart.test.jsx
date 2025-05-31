import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ActualStatsChart from '../../../../src/components/admin/statistics/ActualStatsChart'
import ApiConfig from '../../../../src/api/apiConfig'
import { vi } from 'vitest'

vi.mock('../../../../src/components/admin/statistics/StatisticsPieChart', () => {
  return {
    default: ({ title }) => <div data-testid="chart">{title}</div>,
  }
})

vi.mock('../../../../src/api/apiConfig', () => {
  return {
    default: {
      getActualStatsData: vi.fn(),
    },
  }
})

const mockResponseData = [
  {
    labels: ['HIGH', 'MEDIUM', 'LOW'],
    data: [3, 5, 2],
  },
  {
    labels: ['OPEN', 'IN_PROGRESS', 'RESOLVED'],
    data: [4, 3, 3],
  },
]

describe('ActualStatsChart', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('shows loading indicator initially', async () => {
    ApiConfig.getActualStatsData.mockReturnValue(
      new Promise(() => {}) // keep it pending
    )
    render(<ActualStatsChart />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('displays error message on fetch failure', async () => {
    ApiConfig.getActualStatsData.mockRejectedValue(new Error('API error'))
    render(<ActualStatsChart />)
    await waitFor(() => {
      expect(screen.getByText('Failed to load data')).toBeInTheDocument()
    })
  })

  test('renders two charts when data loads successfully', async () => {
    ApiConfig.getActualStatsData.mockResolvedValue({ data: mockResponseData })
    render(<ActualStatsChart />)

    const charts = await screen.findAllByTestId('chart')
    expect(charts).toHaveLength(2)

    expect(charts[0]).toHaveTextContent('Incident Priority Distribution')
    expect(charts[1]).toHaveTextContent('Incident Status Distribution')
  })
})
