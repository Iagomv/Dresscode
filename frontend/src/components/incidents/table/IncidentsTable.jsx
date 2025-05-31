/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from 'react-bootstrap'
import { FiAlertTriangle, FiActivity, FiAlignLeft, FiCalendar, FiSettings } from 'react-icons/fi'
import { Row } from './Row'
import { INCIDENTS_TABLE_TEXT } from '../../../constants/textConstants'

const IncidentsTable = ({ incidents, showDetails, RowComponent = Row, onStatusUpdate }) => {
  const isValidArray = Array.isArray(incidents)

  const headerStyle = {
    whiteSpace: 'nowrap',
    minWidth: '120px',
  }

  return (
    <div className="p-4">
      <h1 className="mb-4">{INCIDENTS_TABLE_TEXT.tableTitle}</h1>
      {!isValidArray || incidents.length === 0 ? (
        <h5 className="text-muted">{INCIDENTS_TABLE_TEXT.noIncidents}</h5>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow-sm" style={{ minWidth: '800px' }}>
            <thead className="bg-light">
              <tr>
                <th style={headerStyle}>
                  <span className="align-middle">{INCIDENTS_TABLE_TEXT.thTitle}</span>
                </th>
                <th style={headerStyle}>
                  <span className="align-middle">{INCIDENTS_TABLE_TEXT.thCategory}</span>
                </th>
                <th style={headerStyle}>
                  <FiAlertTriangle className="me-1 align-middle" />
                  <span className="align-middle">{INCIDENTS_TABLE_TEXT.thPriority}</span>
                </th>
                <th style={headerStyle}>
                  <FiActivity className="me-1 align-middle" />
                  <span className="align-middle">{INCIDENTS_TABLE_TEXT.thStatus}</span>
                </th>
                <th style={headerStyle}>
                  <FiAlignLeft className="me-1 align-middle" />
                  <span className="align-middle">{INCIDENTS_TABLE_TEXT.thDescription}</span>
                </th>
                <th style={headerStyle}>
                  <FiCalendar className="me-1 align-middle" />
                  <span className="align-middle">{INCIDENTS_TABLE_TEXT.thCreatedAt} At</span>
                </th>
                <th style={headerStyle}>
                  <FiSettings className="me-1 align-middle" />
                  <span className="align-middle">{INCIDENTS_TABLE_TEXT.thActions}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <RowComponent
                  key={incident.id}
                  incident={incident}
                  showDetails={showDetails}
                  onStatusUpdate={onStatusUpdate}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default IncidentsTable
