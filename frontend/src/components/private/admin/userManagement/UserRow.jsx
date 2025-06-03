import React from 'react'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { UserActions } from './UserActions'
import { UserStatusBadge } from './UserStatusBadge'
import { UserRoleBadge } from '../../../common/UserRoleBadge'

const TableRow = ({ children, isExpanded }) => <tr className={isExpanded ? 'bg-blue-50' : undefined}>{children}</tr>

const TableCell = ({ children, ...props }) => <td {...props}>{children}</td>

const ExpandedRow = ({ children, colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="px-6 py-4 bg-blue-50">
      {children}
    </td>
  </tr>
)

// eslint-disable-next-line no-unused-vars
// TODO TOGGLE CLASS INFO ON EXPANDED ROW
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

export const UserRow = ({ user, isExpanded, onToggleExpand, requestDelete, toggleStatus }) => (
  <>
    <TableRow isExpanded={isExpanded}>
      <TableCell>
        <ExpandButton isExpanded={isExpanded} onToggleExpand={onToggleExpand} />
        {user.name} {user.lastName}
      </TableCell>

      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <UserRoleBadge role={user.role} />
      </TableCell>

      <TableCell>
        <UserStatusBadge active={user.active} />
      </TableCell>

      <TableCell className="d-flex flex-row justify-content-around">
        <UserActions user={user} toggleStatus={toggleStatus} requestDelete={requestDelete} />
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
