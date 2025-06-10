import { Button } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
export const LoanActions = ({ loan, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('common')
  return (
    <div className="d-flex flex-row gap-2">
      <Button aria-label="Edit" variant="outline-primary" title="Edit" onClick={() => requestUpdate(loan)}>
        {t('form.edit')} <FaRegEdit />
      </Button>
      <Button aria-label="Delete" variant="outline-danger" title="Delete" onClick={() => requestDelete(loan.id)}>
        {t('form.delete')} <MdDeleteOutline />
      </Button>
    </div>
  )
}
