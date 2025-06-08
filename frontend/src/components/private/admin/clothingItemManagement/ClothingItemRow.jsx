import { ClothingItemStateBadge } from '../../../common/badges/clothingItem/ClothingItemStateBadge'
import { ClothingItemAvailabilityBadge } from '../../../common/badges/clothingItem/ClothingItemAvailabilityBadge'
import { ClothingItemActions } from './ClothingItemActions'
import { useTranslation } from 'react-i18next'

export const ClothingItemRow = ({ clothingItem, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('common')
  return (
    <tr>
      <LargeTextTableCell>{clothingItem.name}</LargeTextTableCell>
      <LargeTextTableCell>{clothingItem.color}</LargeTextTableCell>
      <TableCell>{clothingItem.price}</TableCell>
      <TableCell>
        <ClothingItemStateBadge state={clothingItem.state} />
      </TableCell>
      <TableCell>{t(`clothingItem.gender.${clothingItem.gender?.toLowerCase()}`)}</TableCell>
      <TableCell>{t(`clothingItem.type.${clothingItem.type?.toLowerCase()}`)}</TableCell>
      <TableCell>{clothingItem.size}</TableCell>
      <TableCell>
        <ClothingItemAvailabilityBadge availability={clothingItem.availability} />
      </TableCell>
      <TableCell className="d-flex flex-row justify-content-around">
        <ClothingItemActions clothingItem={clothingItem} requestUpdate={requestUpdate} requestDelete={requestDelete} />
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
