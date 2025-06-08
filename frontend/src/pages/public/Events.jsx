import React from 'react'
import { useEvents } from './hooks/useEvents'
import { useTranslation } from 'react-i18next'
import { EventList } from '../../components/public/events/EventList'
import { EventCountBadge } from '../../components/common/badges/EventCountBadge'
import { COLORS, FONT_FAMILY, SPACING } from '../../constants/theme'
import { SortingHeader } from '../../components/common/sort/SortingHeader'
import { EventsHeader } from '../../components/public/events/EventsHeader'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import './css/Events.css'

export const Events = () => {
  const { events, loading } = useEvents()
  const { t } = useTranslation('events')
  const { t: tCommon } = useTranslation('common')

  const noEventsFound = () => {
    return (
      <div className="empty-events text-center">
        <i className="bi bi-calendar-x display-1 mb-3" style={{ color: COLORS.muted }}></i>
        <h3 style={{ color: COLORS.muted }}>{t('noEvents')}</h3>
        <p style={{ color: COLORS.muted }}>{t('checkLater')}</p>
      </div>
    )
  }

  if (loading) return <LoadingSpinner />
  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        color: COLORS.text,
        padding: `${SPACING.large} 0`,
        minHeight: '100vh',
      }}
    >
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Header Section */}
        <EventsHeader title={t('title')} description={t('description')} />

        {/* Events Stats */}
        <SortingHeader
          ListComponent={<EventCountBadge count={events.length} />}
          sortedBy={tCommon('event.data.date').toLowerCase()}
        />

        {/* Events List */}
        <section style={{ marginBottom: SPACING.xlarge }}>
          {events.length > 0 ? <EventList events={events} /> : noEventsFound()}
        </section>
      </div>
    </div>
  )
}
