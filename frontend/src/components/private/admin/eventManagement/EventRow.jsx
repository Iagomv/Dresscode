import { EventStatusBadge } from '../../../common/badges/EventStatusBadge'
import { EventCategoryBadge } from '../../../common/badges/EventCategoryBadge'
import { EventActions } from './EventActions'

export const EventRow = ({ event, requestUpdate, requestDelete }) => (
  <tr>
    <LargeTextTableCell>{event.title}</LargeTextTableCell>
    <LargeTextTableCell>{event.description}</LargeTextTableCell>
    <TableCell>{event.eventDate}</TableCell>
    <TableCell>
      <EventCategoryBadge category={event.category} />
    </TableCell>
    <TableCell>
      <EventStatusBadge status={event.status} />
    </TableCell>
    <TableCell>{event.location}</TableCell>
    <TableCell className="d-flex flex-row justify-content-around">
      <EventActions event={event} requestUpdate={requestUpdate} requestDelete={requestDelete} />
    </TableCell>
  </tr>
)

const TableCell = ({ children, ...props }) => <td {...props}>{children}</td>

const LargeTextTableCell = ({ children, maxWidth = '250px' }) => {
  const tooltipText = Array.isArray(children) ? children.join('') : children

  return (
    <TableCell
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth,
      }}
      title={tooltipText}
    >
      {children}
    </TableCell>
  )
}
