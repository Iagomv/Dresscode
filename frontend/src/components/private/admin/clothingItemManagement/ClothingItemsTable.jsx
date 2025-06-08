import Table from 'react-bootstrap/Table'
import { useTranslation } from 'react-i18next'
import { ClothingItemRow } from './ClothingItemRow'
export const ClothingItemsTable = ({ clothingItems, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('common')
  const { t: tAdmin } = useTranslation('admin')
  return (
    <div className="d-flex justify-content-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('clothingItem.data.name')}</th>
            {/* <th>{t('clothingItem.data.description')}</th> */}
            <th>{t('clothingItem.data.color')}</th>
            <th>{t('clothingItem.data.price')}</th>
            <th>{t('clothingItem.data.state')}</th>
            <th>{t('clothingItem.data.gender')}</th>
            <th>{t('clothingItem.data.type')}</th>
            <th>{t('clothingItem.data.size')}</th>
            <th>{t('clothingItem.data.availability')}</th>
            <th className="text-right">{tAdmin('eventManagement.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {clothingItems.map((ci) => (
            <ClothingItemRow key={ci.id} clothingItem={ci} requestUpdate={requestUpdate} requestDelete={requestDelete} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
