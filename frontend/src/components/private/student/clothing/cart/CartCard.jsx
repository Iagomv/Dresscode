import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { formatImageUrl } from '../../../../../utils/MyStringUtils'
import { useTranslation } from 'react-i18next'
export const CartCard = ({ item, removeFromLoan }) => {
  const placeholderImage = 'http://localhost:80/uploads/clothing-items/Camiseta_tradicional-galician_shirt.jpeg'
  const imageUrl = item.imageUrl ? formatImageUrl(item.imageUrl) : placeholderImage
  const { t } = useTranslation('common')
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={item.name}
        className="object-fit-cover"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="text-start d-flex flex-column">
        <Card.Title className="mb-2 fs-6 text-truncate" title={item.name}>
          {item.name}
        </Card.Title>

        <Button variant="light" size="sm" onClick={() => removeFromLoan(item.id)} className="mt-auto">
          {t('form.delete')}
        </Button>
      </Card.Body>
    </Card>
  )
}
