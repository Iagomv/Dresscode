/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Card, Badge, Row, Col } from 'react-bootstrap'
import { FiAlertCircle, FiUser, FiTool, FiCalendar, FiClock, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { motion } from 'framer-motion'
import './IncidentCard.css'
const formatDate = (isoString) => {
  if (!isoString) return 'N/A'
  return new Date(isoString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const badgeVariant = {
  priority: {
    HIGH: 'danger',
    MEDIUM: 'warning',
    LOW: 'success',
  },
  status: {
    OPEN: 'primary',
    IN_PROGRESS: 'warning',
    CLOSED: 'success',
  },
}

const iconStyle = { marginRight: 8, verticalAlign: 'text-top' }

const IncidentCard = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { title, description, category, priority, status, userId, technicianId, createdAt, updatedAt } = incident

  const truncatedDesc = description.length > 150 && !isExpanded ? `${description.substring(0, 150)}...` : description

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        className="m-3 shadow-sm border-0 rounded-lg overflow-hidden"
        style={{
          transition: 'all 0.2s ease',
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex align-items-center">
              <FiAlertCircle size={24} className="text-primary me-2" />
              <Card.Title className="mb-0 fw-600 text-dark">{title}</Card.Title>
            </div>
            <div className="d-flex gap-2">
              <Badge pill bg={badgeVariant.priority[priority]} className="d-flex align-items-center">
                <FiInfo size={14} className="me-1" /> {priority}
              </Badge>
              <Badge pill bg={badgeVariant.status[status]} className="d-flex align-items-center">
                {status}
              </Badge>
            </div>
          </div>

          <Row className="g-3 mb-3 text-muted">
            <Col xs={6} md={4}>
              <div className="d-flex align-items-center">
                <FiUser style={iconStyle} />
                <span className="small">
                  Reported by: <strong className="text-dark">#{userId}</strong>
                </span>
              </div>
            </Col>

            <Col xs={6} md={4}>
              <div className="d-flex align-items-center">
                <FiTool style={iconStyle} />
                <span className="small">
                  Technician:
                  <strong className="text-dark">{technicianId ? `#${technicianId}` : 'Unassigned'}</strong>
                </span>
              </div>
            </Col>

            <Col xs={6} md={4}>
              <div className="d-flex align-items-center">
                <FiCalendar style={iconStyle} />
                <span className="small">
                  Category: <strong className="text-dark">{category}</strong>
                </span>
              </div>
            </Col>
          </Row>

          <div className="mb-3">
            <div className="d-flex align-items-center text-muted small mb-2">
              <FiClock style={iconStyle} />
              <span>Timeline</span>
            </div>
            <Row className="g-3">
              <Col xs={6}>
                <div className="bg-light p-2 rounded">
                  <div className="text-xs text-muted">Created</div>
                  <div className="text-dark fw-500">{formatDate(createdAt)}</div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="bg-light p-2 rounded">
                  <div className="text-xs text-muted">Updated</div>
                  <div className="text-dark fw-500">{formatDate(updatedAt)}</div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="border-top pt-3">
            <div className="text-muted small mb-2">Description</div>
            <p className="text-dark">
              {truncatedDesc}
              {description.length > 150 && (
                <button
                  className="btn btn-link p-0 ms-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <motion.span whileHover={{ scale: 1.1 }}>
                      <FiChevronUp className="text-primary" />
                    </motion.span>
                  ) : (
                    <motion.span whileHover={{ scale: 1.1 }}>
                      <FiChevronDown className="text-primary" />
                    </motion.span>
                  )}
                </button>
              )}
            </p>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default IncidentCard
