import React, { useState } from 'react'
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap'
import { useDashBoardStats } from './useDashBoardStats'
import { StatsChart } from './dashboard/StatsChart'
import { StatsSection } from './dashboard/StatsSection'
import { mapToChartData } from '../../../../utils/chartData'
import { LoadingSpinner } from '../../../common/LoadingSpinner'
import { useTranslation } from 'react-i18next'

export default function DashboardStats() {
  const { data, loading } = useDashBoardStats()
  const [activeTab, setActiveTab] = useState('users')
  const { t } = useTranslation('common')
  const { t: tStats } = useTranslation('stats')

  if (loading) return <LoadingSpinner />

  const { users, loans, events } = data

  return (
    <Container className="py-4">
      {/* Toggle Tabs */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="justify-content-center mb-4">
        <Nav.Item>
          <Nav.Link eventKey="users">{tStats('users')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="loans">{tStats('loans')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="events">{tStats('events')}</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="w-75 mx-auto">
        <Tab.Container activeKey={activeTab}>
          <Tab.Content>
            {/* Users */}
            <Tab.Pane eventKey="users">
              <StatsSection title={tStats('users')} summary={`${tStats('totalLabel.users')} ${users.totalUsers}`}>
                <StatsChart title={tStats('by.role')} type="pie" data={mapToChartData(users.usersByRole, t, 'user.role')} />
                <StatsChart
                  title={tStats('by.state')}
                  type="pie"
                  data={mapToChartData(users.usersByActiveStatus, t, 'loan.state')}
                />
              </StatsSection>
            </Tab.Pane>

            {/* Loans */}
            <Tab.Pane eventKey="loans">
              <StatsSection title={tStats('loans')} summary={`${tStats('totalLabel.loans')} ${loans.totalLoans}`}>
                <StatsChart title={tStats('by.state')} type="pie" data={mapToChartData(loans.loansByState, t, 'loan.state')} />
                <StatsChart title={tStats('by.user')} type="bar" data={mapToChartData(loans.loansByUser, t)} />
                <StatsChart title={tStats('by.approver')} type="bar" data={mapToChartData(loans.loansByApprover, t)} />
              </StatsSection>
            </Tab.Pane>

            {/* Events */}
            <Tab.Pane eventKey="events">
              <StatsSection title={tStats('events')} summary={`${tStats('totalLabel.events')} ${events.totalEvents}`}>
                <StatsChart
                  title={tStats('by.state')}
                  type="pie"
                  data={mapToChartData(events.eventsByStatus, t, 'event.status')}
                />
                <StatsChart
                  title={tStats('by.category')}
                  type="pie"
                  data={mapToChartData(events.eventsByCategory, t, 'event.category')}
                />
              </StatsSection>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </Container>
  )
}
