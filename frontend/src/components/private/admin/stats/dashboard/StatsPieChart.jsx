import React from 'react'
import { Card, Typography, Box } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export const StatsPieChart = ({ data = [], title, paddingAngle = 4, total }) => {
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
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={77}
              paddingAngle={paddingAngle}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} formatter={(value) => value.replace(/_/g, ' ')} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
