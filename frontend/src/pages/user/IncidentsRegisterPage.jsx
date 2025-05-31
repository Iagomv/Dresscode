import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { IncidentForm } from '../../components/incidents/IncidentForm'
const IncidentsRegisterPage = () => {
  return (
    <Container className="mt-5 mb-3">
      <Card className="p-3 shadow-sm">
        <h2 className="mb-4">Creación de un nuevo incidente</h2>
        <IncidentForm />
      </Card>
    </Container>
  )
}
export default IncidentsRegisterPage
