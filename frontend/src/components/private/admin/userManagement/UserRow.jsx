import React from 'react'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { UserActions } from './UserActions'
import { UserStatusBadge } from './UserStatusBadge'
import { UserRoleBadge } from './UserRoleBadge'

const TableRow = ({ children, isExpanded }) => <tr className={isExpanded ? 'bg-blue-50' : undefined}>{children}</tr>

const TableCell = ({ children, ...props }) => <td {...props}>{children}</td>

const ExpandedRow = ({ children, colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="px-6 py-4 bg-blue-50">
      {children}
    </td>
  </tr>
)

const ExpandButton = ({ isExpanded, onToggleExpand }) => (
  <button
    onClick={onToggleExpand}
    className="flex items-center text-sm font-medium text-gray-900
       bg-transparent border-0 p-0
       cursor-pointer
       hover:text-blue-600
       focus:outline-none"
  >
    {isExpanded ? <KeyboardArrowDown size={16} className="mr-2" /> : <KeyboardArrowRight size={16} className="mr-2" />}
  </button>
)

export const UserRow = ({ user, isExpanded, onToggleExpand }) => (
  <>
    <TableRow isExpanded={isExpanded}>
      <TableCell>
        <ExpandButton isExpanded={isExpanded} onToggleExpand={onToggleExpand} />
        {user.name} {user.lastName}
      </TableCell>

      <TableCell>
        <UserRoleBadge role={user.role} />
      </TableCell>

      <TableCell>
        <UserStatusBadge active={user.active} />
      </TableCell>

      <TableCell className="d-flex flex-row justify-content-around">
        <UserActions user={user} />
      </TableCell>
    </TableRow>

    {isExpanded && (
      <ExpandedRow colSpan={4}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Contact</h3>
            <p className="mt-1 text-sm text-gray-600">{user.email}</p>
            <p className="mt-1 text-sm text-gray-600">{user.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Actions</h3>
            <div className="mt-2 space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-900">Edit</button>
              <button className="text-sm text-red-600 hover:text-red-900">Delete</button>
            </div>
          </div>
        </div>
      </ExpandedRow>
    )}
  </>
)
