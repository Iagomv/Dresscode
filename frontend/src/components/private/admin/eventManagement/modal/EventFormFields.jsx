import React from 'react'
import { FormikTextField } from '../../../common/formFields/FormikTextField'
import { FormikSelectField } from '../../../common/formFields/FormikSelectField'
import { FormikImageField } from '../../../common/formFields/FormikImageField'
import { useTranslation } from 'react-i18next'
export const EventFormFields = () => {
  const { t } = useTranslation('admin')
  const { t: tCommon } = useTranslation('common')
  const eventTitle = t('eventManagement.eventTitle')
  const eventDesc = t('eventManagement.eventDescription')
  const eventDate = t('eventManagement.eventDate')
  const eventCategory = t('eventManagement.eventCategory')
  const eventStatus = t('eventManagement.eventStatus')
  const eventLocation = t('eventManagement.eventLocation')
  const eventImage = t('eventManagement.eventImage')

  const categoryOptions = [
    { value: 'PUBLIC', label: tCommon('event.category.public') },
    { value: 'PRIVATE', label: tCommon('event.category.private') },
  ]
  const statusOptions = [
    { value: 'DRAFT', label: tCommon('event.status.draft') },
    { value: 'PUBLISHED', label: tCommon('event.status.published') },
    { value: 'CANCELLED', label: tCommon('event.status.cancelled') },
    { value: 'ARCHIVED', label: tCommon('event.status.archived') },
  ]

  return (
    <div>
      <FormikTextField name="title" label={eventTitle} type="text" />
      <FormikTextField name="description" label={eventDesc} type="text" />
      <FormikTextField name="eventDate" label={eventDate} type="date" />
      <FormikSelectField name="category" label={eventCategory} options={categoryOptions} />
      <FormikSelectField name="status" label={eventStatus} options={statusOptions} />
      <FormikTextField name="location" label={eventLocation} />
      <FormikImageField name="image" label={eventImage} />
    </div>
  )
}
