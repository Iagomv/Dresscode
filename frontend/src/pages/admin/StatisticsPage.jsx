import React, { useState } from 'react'
import { Container, Grid, CircularProgress, Typography, Button, Box } from '@mui/material'
import { useAllTimeStats } from '../../hooks/useAllTimeStats'
import AllTimeStats from '../../components/admin/statistics/AllTimeStats'
import ActualStatsChart from '../../components/admin/statistics/ActualStatsChart'
import { STATS_TEXT } from '../../constants/textConstants'

const StatisticsPage = () => {
  const [showAllTime, setShowAllTime] = useState(false)
  const { loading, priorityData, statusData, technicianData, priorityColors, avgClosingTimeData } = useAllTimeStats()

  if (loading) {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    )
  }

  const toggleStats = () => {
    setShowAllTime((prev) => !prev)
  }

  return (
    <Container style={{ padding: '2rem', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ marginBottom: '1rem' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              {showAllTime ? STATS_TEXT.allTimeStats : STATS_TEXT.actualStats}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleStats}
              style={{ borderRadius: '20px', textTransform: 'none', marginLeft: '20px' }}
            >
              {showAllTime ? STATS_TEXT.showActualStats : STATS_TEXT.showAllTimeStats}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {showAllTime ? (
            <AllTimeStats
              priorityData={priorityData}
              statusData={statusData}
              technicianData={technicianData}
              avgClosingTimeData={avgClosingTimeData}
              priorityColors={priorityColors}
            />
          ) : (
            <ActualStatsChart />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default StatisticsPage
