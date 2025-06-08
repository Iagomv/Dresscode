import React from 'react'
import { COLORS } from '../../../constants/theme'
import { useTranslation } from 'react-i18next'
import { EventCountBadge } from '../badges/EventCountBadge'
export const SortingHeader = ({ ListComponent, sortedBy }) => {
  const { t } = useTranslation('common')
  return (
    <section className="events-stats">
      <div className="d-flex justify-content-between align-items-center">
        {ListComponent}
        <small style={{ color: COLORS.muted }}>
          {t('sort.sortedBy')} {sortedBy}
        </small>
      </div>
    </section>
  )
}
