import React from 'react'
import { LandingCard } from '../../../components/private/student/LandingCard'
import { useTranslation } from 'react-i18next'
export const StudentHome = () => {
  const { t } = useTranslation('student')
  return (
    <div className="">
      <div className="d-flex flex-row gap-5">
        <LandingCard image={t('content.static.clases.image')} title={t('content.static.clases.title')} />
        <LandingCard image={t('content.static.vestuario.image')} title={t('content.static.vestuario.title')} />
      </div>
    </div>
  )
}
