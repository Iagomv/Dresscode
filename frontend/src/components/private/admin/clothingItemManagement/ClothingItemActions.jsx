import { Button } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
export const ClothingItemActions = ({ clothingItem, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('common')
  return (
    <div className="d-flex flex-row gap-2">
      <Button aria-label="Edit" variant="outline-primary" title="Edit" onClick={() => requestUpdate(clothingItem)}>
        {t('form.edit')} <FaRegEdit />
      </Button>
      <Button aria-label="Delete" variant="outline-danger" title="Delete" onClick={() => requestDelete(clothingItem.id)}>
        {t('form.delete')} <MdDeleteOutline />
      </Button>
    </div>
  )
}
