import React from 'react'
import { Container, Grid } from '@mui/material'
import { StatisticsPieChart } from './StatisticsPieChart'
import { AvgResolutionTimeChart } from './AvgResolutionTimeChart'
import { TechnicianTicketHistoryChart } from './TechnicianTicketHistoryChart'
import { STATS_TEXT } from '../../../constants/textConstants'
export default function AllTimeStats({ priorityData, statusData, technicianData, avgClosingTimeData, priorityColors }) {
  return (
    <Container maxWidth="xl" style={{ padding: '2rem 0' }}>
      <Grid container spacing={3}>
        <StatisticsPieChart title={STATS_TEXT.priorityDistribution} data={priorityData} paddingAngle={10} />
        <StatisticsPieChart title={STATS_TEXT.statusDistribution} data={statusData} paddingAngle={0} />
        <AvgResolutionTimeChart
          title={STATS_TEXT.avgResolutionTime}
          data={avgClosingTimeData}
          colors={priorityColors}
          valueFormatter={(value) => `${value} hrs`}
          tooltipFormatter={(value) => {
            const hours = Math.floor(value.seconds / 3600)
            const minutes = Math.floor((value.seconds % 3600) / 60)
            return `${hours}h ${minutes}m`
          }}
        />
        <TechnicianTicketHistoryChart
          title={STATS_TEXT.techniciansHistory}
          data={technicianData}
          colors={priorityColors}
        />
      </Grid>
    </Container>
  )
}
