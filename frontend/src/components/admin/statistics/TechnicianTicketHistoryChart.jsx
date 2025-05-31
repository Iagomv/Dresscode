import React from 'react'
import { Card, Grid } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const TechnicianTicketHistoryChart = ({ data, colors, title }) => {
  return (
    <Grid item xs={12} md={4}>
      <Card style={{ padding: '2rem', height: '300px' }}>
        <h5 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h5>
        <ResponsiveContainer width="90%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tech" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="HIGH" stackId="a" fill={colors.HIGH} />
            <Bar dataKey="MEDIUM" stackId="a" fill={colors.MEDIUM} />
            <Bar dataKey="LOW" stackId="a" fill={colors.LOW} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Grid>
  )
}
