import Badge from 'react-bootstrap/Badge'
import { CLOTHING_ITEM } from '../../../../constants/theme'
import { useTranslation } from 'react-i18next'
export const ClothingItemAvailabilityBadge = ({ availability }) => {
  const badgeVariant = CLOTHING_ITEM.AVAILABILITY_VARIANTS[availability?.toUpperCase()] || 'secondary'
  const { t } = useTranslation('common')
  return (
    <Badge pill bg={badgeVariant} className="text-uppercase">
      {t(`clothingItem.availability.${availability.toLowerCase()}`)}
    </Badge>
  )
}
