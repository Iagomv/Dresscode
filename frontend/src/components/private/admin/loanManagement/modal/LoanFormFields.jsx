import React from 'react'
import { FormikTextField } from '../../../common/formFields/FormikTextField'
import { FormikSelectField } from '../../../common/formFields/FormikSelectField'
import { FormikImageField } from '../../../common/formFields/FormikImageField'
import { useTranslation } from 'react-i18next'
import { FormikNumberField } from '../../../common/formFields/FormikNumberField'
import { LoadingSpinner } from '../../../../common/LoadingSpinner'
import { useLoanFormFields } from './useLoanFormFields'

export const LoanFormFields = () => {
  const { t } = useTranslation('common')
  const { userOptions, itemOptions, loading } = useLoanFormFields()
  // Labels
  const userIdLabel = t('loan.data.userId')
  const startingDateLabel = t('loan.data.startingDate')
  const endingDateLabel = t('loan.data.endingDate')
  const stateLabel = t('loan.data.state')
  const clothingItemIdsLabel = t('loan.data.clothingItemIds')

  // Options (enums)
  const stateOptions = [
    { value: 'ACTIVE', label: t('loan.state.active') },
    { value: 'PENDING', label: t('loan.state.pending') },
    { value: 'REJECTED', label: t('loan.state.rejected') },
    { value: 'RETURNED', label: t('loan.state.returned') },
    { value: 'EXPIRED', label: t('loan.state.expired') },
  ]

  if (loading) return <LoadingSpinner />
  return (
    <div>
      <FormikSelectField name="userId" label={userIdLabel} options={userOptions} isSearchable={true} />
      {/* Loan Dates */}
      <div className="form-section">
        <div className="d-flex flex-row  gap-3">
          <FormikTextField name="startingDate" label={startingDateLabel} type="date" />
          <FormikTextField name="endingDate" label={endingDateLabel} type="date" />
        </div>
      </div>

      <FormikSelectField name="state" label={stateLabel} options={stateOptions} />
      <FormikSelectField
        name="clothingItemIds"
        label={clothingItemIdsLabel}
        options={itemOptions}
        isSearchable={true}
        isMulti={true}
      />
    </div>
  )
}
