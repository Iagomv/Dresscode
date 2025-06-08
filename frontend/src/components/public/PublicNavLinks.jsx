import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { PATHS } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'

import { useTranslation } from 'react-i18next'

export const PublicNavLinks = ({ getLinkClass }) => {
  const { t } = useTranslation('navigation')
  const { isAuthenticated } = useAuth()
  return (
    <>
      <NavLink to={PATHS.about} className={getLinkClass}>
        {t('nav.about')}
      </NavLink>
      <NavLink to={PATHS.activities} className={getLinkClass}>
        {t('nav.activities')}
      </NavLink>
      <NavLink to={PATHS.events} className={getLinkClass}>
        {t('nav.events')}
      </NavLink>
      {!isAuthenticated && (
        <NavLink to={PATHS.login} className={getLinkClass}>
          {t('nav.login')}
        </NavLink>
      )}
    </>
  )
}
