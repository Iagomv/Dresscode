import { Button } from 'react-bootstrap'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { PiCalendarXThin } from 'react-icons/pi'

export const EventActions = ({ event, requestUpdate, requestDelete }) => {
  return (
    <div className="d-flex flex-row gap-2">
      <Button aria-label="Edit" variant="outline-primary" title="Edit" onClick={() => requestUpdate(event)}>
        <MdOutlineEditCalendar />
      </Button>
      <Button aria-label="Delete" variant="outline-danger" title="Delete" onClick={() => requestDelete(event.id)}>
        <PiCalendarXThin />
      </Button>
    </div>
  )
}
