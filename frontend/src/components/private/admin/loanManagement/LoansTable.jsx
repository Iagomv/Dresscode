import React from 'react'
import { LoanRow } from './LoanRow'
import Table from 'react-bootstrap/Table'
import { useTranslation } from 'react-i18next'
export const LoansTable = ({ loans, requestUpdate, requestDelete }) => {
  const { t } = useTranslation('common')
  const { t: tAdmin } = useTranslation('admin')
  return (
    <div className="d-flex justify-content-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('loan.data.userId')}</th>
            {/* <th>{t('loan.data.clothingItemIds')}</th> */}
            <th>{t('loan.data.state')}</th>
            <th>{t('loan.data.startingDate')}</th>
            <th>{t('loan.data.endingDate')}</th>
            <th>{t('loan.data.acceptedById')}</th>
            <th className="text-right">{tAdmin('eventManagement.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {loans &&
            loans.map((loan) => (
              <LoanRow key={loan.id} loan={loan} requestUpdate={requestUpdate} requestDelete={requestDelete} />
            ))}
        </tbody>
      </Table>
    </div>
  )
}
