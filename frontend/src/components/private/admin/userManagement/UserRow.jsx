import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { UserActions } from './UserActions'
import { UserStatusBadge } from './UserStatusBadge'
import { UserRoleBadge } from '../../../common/UserRoleBadge'
import Tooltip from 'react-bootstrap/Tooltip'

// TODO TOGGLE CLASS INFO ON EXPANDED ROW utilizing the ExpandButton
// eslint-disable-next-line no-unused-vars
export const UserRow = ({ user, isExpanded, onToggleExpand, requestUpdate, requestDelete, toggleStatus }) => (
  <>
    <TableRow isExpanded={isExpanded}>
      <LargeTextTableCell>
        {/* <ExpandButton isExpanded={isExpanded} onToggleExpand={onToggleExpand} /> */}
        {user.name} {user.lastName}
      </LargeTextTableCell>

      <TableCell>{user.phoneNumber}</TableCell>
      <LargeTextTableCell>{user.email}</LargeTextTableCell>
      <TableCell>
        <UserRoleBadge role={user.role} />
      </TableCell>
      <TableCell>
        <UserStatusBadge active={user.active} />
      </TableCell>
      <TableCell className="d-flex flex-row justify-content-around">
        <UserActions user={user} toggleStatus={toggleStatus} requestUpdate={requestUpdate} requestDelete={requestDelete} />
      </TableCell>
    </TableRow>

    {/* {isExpanded && (
      <ExpandedRow colSpan={4}>
      <div className="grid grid-cols-2 gap-4">
      <div>
      <h3 className="text-sm font-medium text-gray-900">Contact</h3>
      <p className="mt-1 text-sm text-gray-600">{user.email}</p>
      <p className="mt-1 text-sm text-gray-600">{user.phoneNumber}</p>
      </div>
      </div>
      </ExpandedRow>
      )} */}
  </>
)

const TableRow = ({ children, isExpanded }) => <tr className={isExpanded ? 'bg-blue-50' : undefined}>{children}</tr>

const TableCell = ({ children, ...props }) => <td {...props}>{children}</td>

const ExpandedRow = ({ children, colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="px-6 py-4 bg-blue-50">
      {children}
    </td>
  </tr>
)

const ExpandButton = ({ isExpanded }) => (
  <button
    // onClick={onToggleExpand}
    className="flex items-center text-sm font-medium text-gray-900
       bg-transparent border-0 p-0
       cursor-pointer
       hover:text-blue-600
       focus:outline-none"
  >
    {isExpanded ? <KeyboardArrowDown size={16} className="mr-2" /> : <KeyboardArrowRight size={16} className="mr-2" />}
  </button>
)

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
