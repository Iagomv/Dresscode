import React from 'react'
import { Card } from 'react-bootstrap'
import { formatImageUrl } from '../../../../utils/MyStringUtils'

export const ClothingCard = ({ item, addToLoan }) => {
  const host = import.meta.env.VITE_HOST || 'http://localhost:80'
  const placeholderImage = `${host}/uploads/clothing-items/Camiseta_tradicional-galician_shirt.jpeg`

  const imageUrl = item.imageUrl ? formatImageUrl(item.imageUrl) : placeholderImage

  return (
    <Card
      className="h-100 shadow-sm border-0 "
      style={{ cursor: 'pointer' }}
      onClick={() => {
        addToLoan(item)
      }}
    >
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={item.name}
        className="object-fit-cover"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="text-start">
        <Card.Title className="mb-2 fs-6 text-truncate" title={item.name}>
          {item.name}
        </Card.Title>
        <Card.Text className="text-muted small mb-0 text-truncate" title={item.state}>
          {item.state}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
