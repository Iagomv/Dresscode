import Badge from 'react-bootstrap/Badge'
import { ROLE_VARIANTS } from '../../../constants/theme'
import { useTranslation } from 'react-i18next'
export const UserRoleBadge = ({ role }) => {
  const badgeVariant = ROLE_VARIANTS[role?.toUpperCase()] || 'secondary'
  const { t } = useTranslation('common')
  return (
    <Badge bg={badgeVariant} className="text-uppercase">
      {t(`user.role.${role.toLowerCase()}`)}
    </Badge>
  )
}
