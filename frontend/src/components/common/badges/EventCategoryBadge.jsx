import Badge from 'react-bootstrap/Badge'
import { EVENT_CATEGORY_VARIANTS } from '../../../constants/theme'
import { useTranslation } from 'react-i18next'
export const EventCategoryBadge = ({ category }) => {
  const badgeVariant = EVENT_CATEGORY_VARIANTS[category?.toUpperCase()] || 'secondary'
  const { t } = useTranslation('common')
  return (
    <Badge bg={badgeVariant} className="text-uppercase">
      {t(`event.category.${category.toLowerCase()}`)}
    </Badge>
  )
}
