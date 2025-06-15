import React from 'react'

import { COLORS, SPACING } from '../../../constants/theme'
const HistoryTimeline = ({ items }) => {
  return (
    <div style={{ position: 'relative', paddingLeft: '30px' }}>
      <div
        style={{
          position: 'absolute',
          left: '8px',
          top: '0',
          bottom: '0',
          width: '2px',
          backgroundColor: COLORS.border,
        }}
      />
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            position: 'relative',
            marginBottom: SPACING.large,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '-28px',
              top: '4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: COLORS.primary,
              border: `3px solid ${COLORS.background}`,
            }}
          />
          <h3
            style={{
              color: COLORS.primary,
              marginBottom: SPACING.small,
            }}
          >
            {item.year}
          </h3>
          <p style={{ lineHeight: '1.6' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default HistoryTimeline
