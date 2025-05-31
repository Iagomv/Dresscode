import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { INCIDENT_ASSIGNMENT_TEXT } from '../../../constants/textConstants'

const TechnicianList = ({ technicians }) => (
  <Card>
    <Card.Header>{INCIDENT_ASSIGNMENT_TEXT.avaliableTechniciansTitle}</Card.Header>
    <ListGroup variant="flush">
      {technicians.map((tech) => (
        <ListGroup.Item key={tech.id} className="d-flex justify-content-between" data-testid="technician-item">
          <div>
            <strong>{tech.username}</strong>
            <div className="text-muted small">{tech.email}</div>
          </div>
          <span className="badge bg-primary">{tech.incidentCount}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card>
)

export default TechnicianList
