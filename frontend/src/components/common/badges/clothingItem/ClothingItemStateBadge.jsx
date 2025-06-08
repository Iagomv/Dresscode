import Badge from 'react-bootstrap/Badge'
import { CLOTHING_ITEM } from '../../../../constants/theme'
import { useTranslation } from 'react-i18next'
export const ClothingItemStateBadge = ({ state }) => {
  const badgeVariant = CLOTHING_ITEM.STATE_VARIANTS[state?.toUpperCase()] || 'secondary'
  const { t } = useTranslation('common')
  return (
    <Badge pill bg={badgeVariant} className="text-uppercase">
      {t(`clothingItem.state.${state.toLowerCase()}`)}
    </Badge>
  )
}
