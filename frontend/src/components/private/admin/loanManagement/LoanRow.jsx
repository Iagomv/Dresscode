import { LoanActions } from './LoanActions'
import { LoanStateBadge } from '../../../common/badges/LoanStateBadge'
export const LoanRow = ({ loan, requestUpdate, requestDelete }) => {
  return (
    <tr>
      <LargeTextTableCell>{loan?.user?.name}</LargeTextTableCell>
      {/* <LargeTextTableCell>{loan?.clothingItemIds}</LargeTextTableCell> */}
      <TableCell>
        <LoanStateBadge state={loan?.state} />
      </TableCell>
      <TableCell>{loan?.startingDate}</TableCell>
      <TableCell>{loan?.endingDate}</TableCell>
      <TableCell>{loan?.acceptedBy.name}</TableCell>
      <TableCell className="d-flex flex-row justify-content-around">
        <LoanActions loan={loan} requestUpdate={requestUpdate} requestDelete={requestDelete} />
      </TableCell>
    </tr>
  )
}

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
