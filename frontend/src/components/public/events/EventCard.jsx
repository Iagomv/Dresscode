import React from 'react'
import { COLORS, EVENT_STATUS_VARIANTS } from '../../../constants/theme'
import './EventCard.css' // Import the dedicated CSS
import { Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export const EventCard = ({ event }) => {
  const { title, description, location, eventDate, imageUrl } = event
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [hasImage, setHasImage] = React.useState(!!imageUrl)
  const statusVariant = EVENT_STATUS_VARIANTS[event.status] || {}
  const isNotPublised = event.status !== 'PUBLISHED'
  const isLongDescription = description && description.length > 120
  const displayDescription = isLongDescription && !isExpanded ? `${description.substring(0, 120)}...` : description
  const { t } = useTranslation('common')

  const handleImageError = () => setHasImage(false)
  const toggleDescription = () => setIsExpanded(!isExpanded)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  const CancelledBadge = () => (
    <Badge pill bg={statusVariant} className="cancelled-badge" style={{ fontFamily: 'var(--font-family)' }}>
      {t(`event.status.${event.status.toLowerCase()}`)}
    </Badge>
  )
  const formatUrl = (url) => {
    const replacedImages = url.replace('/images/', '/uploads/')
    const fullUrl = `${import.meta.env.VITE_IMAGES_URL}${replacedImages}`
    return fullUrl
  }

  return (
    <div className="col-12 mb-4">
      <div className="event-card">
        <div className="event-card-content-wrapper">
          {/* Image Column */}
          {hasImage && imageUrl && (
            <div className="event-card-image-container">
              <img
                src={formatUrl(imageUrl)}
                srcSet={formatUrl(imageUrl)}
                alt={title}
                className="event-card-image"
                onError={handleImageError}
              />
            </div>
          )}

          {/* Content Column */}
          <div className="event-card-content">
            <div className="event-card-header">
              <h3 className="event-card-title">
                {title} {isNotPublised && <CancelledBadge />}
              </h3>
              <span className="event-card-badge">{formatDate(eventDate)}</span>
            </div>

            <div className="mb-3">
              <p className="event-card-description">{displayDescription}</p>
              {isLongDescription && (
                <button className="event-card-read-more" onClick={toggleDescription}>
                  {isExpanded ? 'Mostrar menos' : 'Leer más'}
                </button>
              )}
            </div>

            <div className="event-card-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              <small>{location}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
