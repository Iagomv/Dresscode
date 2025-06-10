// ClothingItemDetails.js
import React from 'react'

export const ClothingItemDetail = ({ item }) => {
  return (
    <div className="mb-2">
      <small style={{ fontWeight: 'lighter' }}>{item.name}</small>
      {item.size && (
        <p style={{ fontWeight: 'lighter' }}>
          <small>
            <b>Size:</b> {item.size}
          </small>
        </p>
      )}
    </div>
  )
}
