import React from 'react'
import { render, screen } from '@testing-library/react'
import AllTimeStats from '../../../../src/components/admin/statistics/AllTimeStats'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

vi.mock('../../../../src/components/admin/statistics/StatisticsPieChart', () => ({
  StatisticsPieChart: ({ title, data }) => (
    <div data-testid="StatisticsPieChart">
      <h2>{title}</h2>
      <div>{JSON.stringify(data)}</div>
    </div>
  ),
}))

vi.mock('../../../../src/components/admin/statistics/AvgResolutionTimeChart', () => ({
  AvgResolutionTimeChart: ({ title, data }) => (
    <div data-testid="AvgResolutionTimeChart">
      <h2>{title}</h2>
      <div>{JSON.stringify(data)}</div>
    </div>
  ),
}))

vi.mock('../../../../src/components/admin/statistics/TechnicianTicketHistoryChart', () => ({
  TechnicianTicketHistoryChart: ({ title, data }) => (
    <div data-testid="TechnicianTicketHistoryChart">
      <h2>{title}</h2>
      <div>{JSON.stringify(data)}</div>
    </div>
  ),
}))

describe('AllTimeStats', () => {
  const mockPriorityData = [10, 20, 30]
  const mockStatusData = [15, 25, 35]
  const mockTechnicianData = [
    { technician: 'John', tickets: 10 },
    { technician: 'Jane', tickets: 12 },
  ]
  const mockAvgClosingTimeData = [2.5, 3.5, 1.5]
  const mockPriorityColors = ['#ff0000', '#00ff00', '#0000ff']

  it('renders AllTimeStats component with the correct data', () => {
    render(
      <AllTimeStats
        priorityData={mockPriorityData}
        statusData={mockStatusData}
        technicianData={mockTechnicianData}
        avgClosingTimeData={mockAvgClosingTimeData}
        priorityColors={mockPriorityColors}
      />
    )

    const pieCharts = screen.getAllByTestId('StatisticsPieChart')
    expect(pieCharts).toHaveLength(2)

    expect(pieCharts[0]).toHaveTextContent('Priority Distribution')
    expect(pieCharts[0]).toHaveTextContent(JSON.stringify(mockPriorityData))

    expect(pieCharts[1]).toHaveTextContent('Status Distribution')
    expect(pieCharts[1]).toHaveTextContent(JSON.stringify(mockStatusData))

    expect(screen.getByTestId('AvgResolutionTimeChart')).toHaveTextContent('Average Resolution Time')
    expect(screen.getByTestId('AvgResolutionTimeChart')).toHaveTextContent(JSON.stringify(mockAvgClosingTimeData))

    expect(screen.getByTestId('TechnicianTicketHistoryChart')).toHaveTextContent('Technician History')
    expect(screen.getByTestId('TechnicianTicketHistoryChart')).toHaveTextContent(JSON.stringify(mockTechnicianData))
  })
})
