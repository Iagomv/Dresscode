import React from 'react'
import { Row, Col } from 'react-bootstrap'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { LoanActions } from './LoanActions'
import { LoanStateBadge } from '../../../common/badges/LoanStateBadge'
import { useTranslation } from 'react-i18next'
import { ClothingItemDetail } from '../../../common/ClothingItemDetail'
export const LoanRow = ({ loan, isExpanded, onToggleExpand, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('common', 'admin')

  const fullName = `${loan?.user?.name} ${loan?.user?.lastName}`
  return (
    <>
      <TableRow isExpanded={isExpanded}>
        <LargeTextTableCell>
          <div className="d-flex align-items-center">
            <ExpandButton isExpanded={isExpanded} onToggleExpand={onToggleExpand} />
            {loan?.user?.name}
          </div>
        </LargeTextTableCell>

        {/* Example: if you want to show clothing item IDs */}
        {/* <LargeTextTableCell>{loan?.clothingItemIds?.join(', ')}</LargeTextTableCell> */}

        <TableCell>
          <LoanStateBadge state={loan?.state} />
        </TableCell>
        <TableCell>{loan?.startingDate}</TableCell>
        <TableCell>{loan?.endingDate}</TableCell>
        <TableCell>{loan?.acceptedBy?.name}</TableCell>
        <TableCell className="d-flex flex-row justify-content-around">
          <LoanActions loan={loan} requestUpdate={requestUpdate} requestDelete={requestDelete} />
        </TableCell>
      </TableRow>

      {isExpanded && <ExpandedInfo t={t} fullName={fullName} loan={loan} />}
    </>
  )
}

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
       bg-transparent border-0 p-0 me-2
       cursor-pointer
       hover:text-blue-600
       focus:outline-none"
    aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
  >
    {isExpanded ? <KeyboardArrowDown size={16} /> : <KeyboardArrowRight size={16} />}
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

const ExpandedInfo = ({ t, fullName, loan }) => {
  const nameLabel = `${t('form.name')}:`
  const mailLabel = `${t('form.email')}:`
  const clothingItemsLabel = t('admin:loanManagement.clothingItemsLabel')
  const userDetailsLabel = t('admin:loanManagement.userDetails')
  return (
    <ExpandedRow colSpan={6}>
      <div className="d-flex flex-row justify-content-around">
        <div>
          <h6 className="text-sm font-medium text-gray-900">{userDetailsLabel}</h6>
          <small style={{ fontWeight: 'lighter' }}>
            <b>{nameLabel}</b> {fullName}
          </small>
          <p style={{ fontWeight: 'lighter' }}>
            <small>
              <b>{mailLabel}</b> {loan?.user?.email ?? 'n/a'}
            </small>
          </p>
        </div>
        {/* Clothing items */}
        <div>
          <h6 className="text-sm font-medium text-gray-900">{clothingItemsLabel}</h6>
          {loan?.clothingItems?.length > 0 ? (
            loan.clothingItems.map((item) => <ClothingItemDetail key={item.id} item={item} />)
          ) : (
            <small style={{ fontWeight: 'lighter' }}>No items available.</small>
          )}
        </div>
      </div>
    </ExpandedRow>
  )
}
