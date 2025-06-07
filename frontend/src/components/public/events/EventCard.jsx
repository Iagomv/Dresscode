import React from 'react'
import { COLORS, FONT_FAMILY, SPACING } from '../../../constants/theme'

export const EventCard = ({ event }) => {
  const { title, description, location, eventDate, imageUrl } = event
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [hasImage, setHasImage] = React.useState(!!imageUrl)

  // Check if description is long (more than 120 characters)
  const isLongDescription = description && description.length > 120
  const displayDescription = isLongDescription && !isExpanded ? `${description.substring(0, 120)}...` : description

  const handleImageError = () => {
    setHasImage(false)
  }

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      // Changed to Spanish locale
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="col-lg-4 col-md-6 mb-4" style={{ fontFamily: FONT_FAMILY }}>
      <div
        className="card h-100"
        style={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
          },
        }}
      >
        {hasImage && imageUrl && (
          <img
            src={imageUrl}
            className="card-img-top"
            alt={title}
            style={{
              height: '200px',
              objectFit: 'cover',
              borderBottom: `1px solid ${COLORS.border}`,
            }}
            onError={handleImageError}
          />
        )}

        <div className="card-body d-flex flex-column" style={{ padding: SPACING.medium }}>
          <h5
            className="card-title"
            style={{
              color: COLORS.primary,
              marginBottom: SPACING.small,
              fontWeight: '500',
            }}
          >
            {title}
          </h5>

          <div className="card-text flex-grow-1" style={{ marginBottom: SPACING.medium }}>
            <p
              style={{
                color: COLORS.text,
                lineHeight: '1.5',
                marginBottom: SPACING.small,
              }}
            >
              {displayDescription}
            </p>
            {isLongDescription && (
              <button
                className="btn btn-link p-0 text-decoration-none"
                onClick={toggleDescription}
                style={{
                  fontSize: '0.875rem',
                  color: COLORS.secondary,
                  fontWeight: '500',
                  ':hover': {
                    color: COLORS.primary,
                  },
                }}
              >
                {isExpanded ? 'Mostrar menos' : 'Leer más'}
              </button>
            )}
          </div>

          <div className="mt-auto">
            <div className="d-flex align-items-center mb-2" style={{ color: COLORS.muted }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill={COLORS.secondary}
                viewBox="0 0 16 16"
                style={{ marginRight: '8px' }}
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              <small>{location}</small>
            </div>
            <div className="d-flex align-items-center" style={{ color: COLORS.muted }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill={COLORS.secondary}
                viewBox="0 0 16 16"
                style={{ marginRight: '8px' }}
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              <small>{formatDate(eventDate)}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
