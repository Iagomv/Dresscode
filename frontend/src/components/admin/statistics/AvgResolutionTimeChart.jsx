import React from 'react'
import { Card } from '@mui/material'
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const PRIORITY_ORDER = ['HIGH', 'MEDIUM', 'LOW']
const priorityColors = {
  HIGH: '#FF4560',
  MEDIUM: '#FEB019',
  LOW: '#00E396',
}

export const AvgResolutionTimeChart = ({ data, title }) => {
  const sortedData = [...data].sort((a, b) => PRIORITY_ORDER.indexOf(a.name) - PRIORITY_ORDER.indexOf(b.name))

  const formatSecondsToHMS = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
  const formatTooltipLabel = (value) => {
    const entry = sortedData.find((d) => d.name === value)
    return <span style={{ color: '#333' }}>{formatSecondsToHMS(entry.seconds)}</span>
  }
  const CustomTooltip = ({ payload }) => {
    if (!payload || !payload[0]) return null
    const data = payload[0].payload

    return (
      <div className="custom-tooltip">
        <p>
          {data.name} {formatSecondsToHMS(data.seconds)}
        </p>
      </div>
    )
  }
  return (
    <Card style={{ padding: '1rem', height: '300px' }}>
      <h5 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h5>
      <ResponsiveContainer width="100%" height="80%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="90%"
          data={sortedData}
          startAngle={180}
          endAngle={0}
          margin={{ top: 0, right: 0, bottom: 10, left: 0 }}
        >
          <RadialBar dataKey="value" cornerRadius={8} animationBegin={300}>
            {sortedData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={priorityColors[entry.name]} />
            ))}
          </RadialBar>
          <Legend
            iconSize={6}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '13px', marginTop: '-100px' }}
            formatter={formatTooltipLabel}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
    </Card>
  )
}
