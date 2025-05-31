import React from 'react'
import { Card } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export const StatisticsPieChart = ({ data, title, paddingAngle }) => {
  return (
    <Card style={{ padding: '1rem', height: '300px' }}>
      <h5 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h5>
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
          <Legend iconSize={6} wrapperStyle={{ fontSize: '12px' }} formatter={(v) => v.replace('_', ' ')} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default StatisticsPieChart
