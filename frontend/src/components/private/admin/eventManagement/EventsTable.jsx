import Table from 'react-bootstrap/Table'
import { EventRow } from './EventRow'
import { useTranslation } from 'react-i18next'

export const EventsTable = ({ events, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('admin')
  return (
    <div className="d-flex justify-content-center w-75">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('eventManagement.eventTitle')}</th>
            <th>{t('eventManagement.eventDescription')}</th>
            <th>{t('eventManagement.eventDate')}</th>
            <th>{t('eventManagement.eventCategory')}</th>
            <th>{t('eventManagement.eventStatus')}</th>
            <th className="text-right">{t('eventManagement.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <EventRow key={event.id} event={event} requestUpdate={requestUpdate} requestDelete={requestDelete} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
