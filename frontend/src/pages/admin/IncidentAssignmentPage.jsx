import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import AssignmentFilters from '../../components/admin/assignments/AssignmentFilters'
import IncidentAssignmentTable from '../../components/admin/assignments/IncidentsAssignmentTable'
import TechnicianList from '../../components/admin/assignments/TechniciansList'
import AssignmentControls from '../../components/admin/assignments/AssignmentControls'
import IncidentModal from '../../components/incidents/IncidentModal'
import { INCIDENT_ASSIGNMENT_TEXT } from '../../constants/textConstants'
import useIncidentAssignment from '../../hooks/useIncidentAssignment'

const IncidentAssignmentPage = () => {
  const {
    isAdmin,
    loading,
    filters,
    sortConfig,
    selectedIncidents,
    selectedTechnician,
    technicians,
    filteredIncidents,
    showModal,
    selectedIncidentDetail,
    handleIncidentSelect,
    handleSelectAll,
    handleAssign,
    handleShowDetails,
    handleCloseModal,
    setFilters,
    setSortConfig,
    setSelectedTechnician,
  } = useIncidentAssignment()

  if (!isAdmin) return <Navigate to="/" replace />

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" role="status" />
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">{INCIDENT_ASSIGNMENT_TEXT.page_title}</h2>

      <AssignmentFilters
        filters={filters}
        onFilterChange={(type, value) => setFilters((prev) => ({ ...prev, [type]: value }))}
      />

      <AssignmentControls
        selectedIncidents={selectedIncidents}
        technicians={technicians}
        selectedTechnician={selectedTechnician}
        onTechnicianChange={(e) => setSelectedTechnician(e.target.value)}
        onAssign={handleAssign}
        onSelectAll={handleSelectAll}
        totalItems={filteredIncidents.length}
      />

      <Row>
        <Col xl={9}>
          <IncidentAssignmentTable
            incidents={filteredIncidents}
            sortConfig={sortConfig}
            selectedIncidents={selectedIncidents}
            onSort={(key) =>
              setSortConfig((prev) => ({
                key,
                direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            onSelect={handleIncidentSelect}
            showDetails={handleShowDetails}
          />
        </Col>

        <Col xl={3}>
          <TechnicianList technicians={technicians} />
        </Col>
      </Row>

      <IncidentModal showModal={showModal} handleClose={handleCloseModal} selectedIncident={selectedIncidentDetail} />
    </Container>
  )
}

export default IncidentAssignmentPage
