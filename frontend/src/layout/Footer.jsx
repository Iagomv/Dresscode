import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { COLORS, FONT_FAMILY, SPACING } from '../constants/theme'
import { useTranslation } from 'react-i18next'
import './Footer.css' // We'll add styles here

export const Footer = () => {
  const { t } = useTranslation('contact')

  return (
    <footer
      style={{
        fontFamily: FONT_FAMILY,
        backgroundColor: COLORS.background,
        borderTop: `1px solid ${COLORS.border}`,
        padding: `${SPACING.large} 0`,
        marginTop: 'auto',
        width: '100%',
      }}
    >
      <Container>
        <Row className="g-4">
          {/* Contact Information */}
          <Col md={6} className="text-center text-lg-start">
            <div style={{ lineHeight: '1.6' }}>
              <div style={{ marginBottom: SPACING.small }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.secondary}
                  strokeWidth="2"
                  style={{ marginRight: '8px' }}
                  aria-hidden="true"
                >
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t('address')}
              </div>

              <div style={{ marginBottom: SPACING.small }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.secondary}
                  strokeWidth="2"
                  style={{ marginRight: '8px' }}
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${t('email')}`} style={{ color: COLORS.text }} aria-label="Correo electrónico">
                  {t('email')}
                </a>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.secondary}
                  strokeWidth="2"
                  style={{ marginRight: '8px' }}
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={`tel:${t('phone')}`} style={{ color: COLORS.text }} aria-label="Teléfono">
                  {t('phone')}
                </a>
              </div>
            </div>
          </Col>

          {/* Social Media */}
          <Col md={6} className="text-center text-lg-end">
            <a
              href={t('facebook')}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill={COLORS.secondary}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-5">
          <Col
            className="text-center"
            style={{
              color: COLORS.muted,
              fontSize: '0.9rem',
              borderTop: `1px solid ${COLORS.border}`,
              paddingTop: SPACING.medium,
            }}
          >
            {t('copyright')}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
