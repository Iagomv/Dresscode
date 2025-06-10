import Badge from 'react-bootstrap/Badge'
import { LOAN } from '../../../constants/theme'
import { useTranslation } from 'react-i18next'
export const LoanStateBadge = ({ state }) => {
  const badgeVariant = LOAN.STATE_VARIANTS[state?.toUpperCase()] || 'secondary'
  const { t } = useTranslation('common')
  return (
    <Badge pill bg={badgeVariant} className="text-uppercase">
      {t(`loan.state.${state.toLowerCase()}`)}
    </Badge>
  )
}
