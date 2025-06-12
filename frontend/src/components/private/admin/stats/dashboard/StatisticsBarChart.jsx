import React from 'react'
import { Card, Typography, Box } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

export const StatisticsBarChart = ({ data = [], title }) => {
  const isEmpty = !data || data.length === 0

  return (
    <Card sx={{ p: 2, height: 300 }}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {title}
      </Typography>

      {isEmpty ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80%">
          <Typography variant="body2" color="text.secondary">
            No data available
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} formatter={(value) => value.replace(/_/g, ' ')} />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`bar-${entry.name}`} fill={entry.fill || '#8884d8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
