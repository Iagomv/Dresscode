import React from 'react'
import { useEvents } from './hooks/useEvents'
import { useTranslation } from 'react-i18next'
import { EventList } from '../../components/public/events/EventList'
import { EventCountBadge } from '../../components/common/badges/EventCountBadge'
export const Events = () => {
  // eslint-disable-next-line no-unused-vars
  const { events, loading } = useEvents()
  const { t } = useTranslation('events')

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="text-center">
              <h1 className="display-4 fw-bold text-dark mb-3">{t('title')}</h1>
              <p className="lead text-muted">{t('description')}</p>
              <div className="d-inline-block bg-primary" style={{ height: '3px', width: '60px' }}></div>
            </div>
          </div>
        </div>

        {/* Events Stats */}
        <div className="row mb-4 ">
          <div className="col-12 ">
            <div className="alert alert-light border-0 shadow-sm al">
              <div>
                <EventCountBadge count={events.length} />
              </div>
              <small className="text-muted">Sorted by date (newest first)</small>
            </div>
          </div>
        </div>

        {/* Events List */}
        {events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
                <h3 className="text-muted">No events found</h3>
                <p className="text-muted">Check back later for new events!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
