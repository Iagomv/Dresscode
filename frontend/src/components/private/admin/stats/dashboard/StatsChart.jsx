import React from 'react'
import { Typography, Box } from '@mui/material'
import { StatsPieChart } from './StatsPieChart'
import { StatisticsBarChart } from './StatisticsBarChart'

export const StatsChart = ({ title, type = 'pie', data }) => {
  return (
    <Box mb={4}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      {type === 'pie' ? (
        <StatsPieChart data={data} title={title} paddingAngle={5} />
      ) : (
        <StatisticsBarChart data={data} title={title} />
      )}
    </Box>
  )
}
