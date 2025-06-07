import Badge from 'react-bootstrap/Badge'
import { EVENT_STATUS_VARIANTS } from '../../../constants/theme'
import { useTranslation } from 'react-i18next'
export const EventStatusBadge = ({ status }) => {
  const badgeVariant = EVENT_STATUS_VARIANTS[status?.toUpperCase()] || 'secondary'
  const { t } = useTranslation('common')
  return (
    <Badge bg={badgeVariant} className="text-uppercase">
      {t(`event.status.${status.toLowerCase()}`)}
    </Badge>
  )
}
