import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
import { COLORS, FONT_FAMILY, SPACING } from '../../constants/theme'
import './css/Activities.css'

export const Activities = () => {
  const { t } = useTranslation('activities')

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        color: COLORS.text,
        padding: `${SPACING.large} 0`,
      }}
    >
      <Container style={{ maxWidth: '1000px' }}>
        {/* Header Section */}
        <header className="activities-header text-center mb-5">
          <h1
            className="activities-title"
            style={{
              color: COLORS.primary,
              fontSize: '2.5rem',
              letterSpacing: '1px',
              marginBottom: SPACING.medium,
              paddingBottom: SPACING.small,
              position: 'relative',
            }}
          >
            {t('title')}
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto',
              color: COLORS.muted,
            }}
          >
            {t('description')}
          </p>
        </header>

        {/* Activities List */}
        <section style={{ marginBottom: SPACING.xlarge }}>
          {t('activities', { returnObjects: true }).map((activity, idx) => (
            <div
              key={idx}
              className="activity-item"
              style={{
                marginBottom: SPACING.large,
                padding: SPACING.large,
                borderLeft: `3px solid ${COLORS.secondary}`,
                backgroundColor: '#f8f7f5',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              <h3
                style={{
                  color: COLORS.primary,
                  marginBottom: SPACING.small,
                  fontSize: '1.4rem',
                }}
              >
                {activity.name}
              </h3>
              <p
                style={{
                  lineHeight: '1.6',
                  marginBottom: 0,
                }}
              >
                {activity.description}
              </p>
            </div>
          ))}
        </section>

        {/* Location & Membership Info */}
        <section
          style={{
            padding: SPACING.large,
            backgroundColor: '#f8f7f5',
            borderRadius: '4px',
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ marginBottom: SPACING.medium }}>
            <p
              style={{
                marginBottom: SPACING.small,
                fontWeight: '500',
                color: COLORS.primary,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  marginRight: '8px',
                }}
              >
                📍
              </span>
              {t('classLocationInfo')}
            </p>
          </div>

          <div>
            <p
              style={{
                marginBottom: 0,
                fontWeight: '500',
                color: COLORS.primary,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  marginRight: '8px',
                }}
              >
                👥
              </span>
              {t('membershipInfo')}
            </p>
          </div>
        </section>
      </Container>
    </div>
  )
}
