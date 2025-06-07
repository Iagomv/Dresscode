import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { NavLink, useNavigate, useLocation } from 'react-router-dom' // Added useLocation
import { useAuth } from '../context/AuthContext'
import { LanguageSwitcher } from '../components/public/LanguageSwitcher'
import { TOP_NAVIGATION_TEXT, ROLES } from '../constants/textConstants'
import { useTranslation } from 'react-i18next'
import { PublicNavLinks } from '../components/public/PublicNavLinks'
import { PATHS } from '../constants/routes'
import styles from './TopNavigation.module.css'

export const TopNavigation = () => {
  const { auth, logout, isAuthenticated } = useAuth()
  const { t } = useTranslation('navigation')
  const navigate = useNavigate()
  const location = useLocation()
  const role = auth?.user?.role

  const isDropdownActive = location.pathname.startsWith('/profile')

  const handleLogout = () => {
    logout()
    navigate(PATHS.login, { replace: true })
  }

  const getLinkClass = ({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
  const getHomeLink = isAuthenticated ? PATHS.dresscode.home : PATHS.slash

  return (
    <div className=" d-flex justify-content-center">
      <Navbar expand="lg" className={styles.navbar}>
        <Container fluid>
          <Navbar.Brand as={NavLink} to={getHomeLink} className={styles.brand}>
            {t('nav.title')}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggleButton}>
            <span className={styles.toggleIcon}></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.navContainer}>
              <PublicNavLinks getLinkClass={getLinkClass} />
            </Nav>

            <Nav className={styles.navContainer}>
              {/* Role-based navigation items */}
              {role === ROLES.STUDENT && (
                <>
                  <NavLink to={PATHS.dresscode.home} className={getLinkClass}>
                    {t('nav.student.myZone')}
                  </NavLink>
                </>
              )}
              {/* 
              {role === ROLES.TEACHER && (
                <NavLink to="/assigned-incidents" className={getLinkClass}>
                  {TOP_NAVIGATION_TEXT.myAssignedIncidents}
                </NavLink>
              )} */}
              {role === ROLES.ADMIN && (
                <NavDropdown
                  title="Management"
                  menuVariant="light"
                  className={`${isDropdownActive ? styles.navDropdownActive : ''}`}
                >
                  <NavDropdown.Item as="span" className={styles.dropdownItem}>
                    <NavLink to={PATHS.dresscode.admin.userManagement} className={getLinkClass}>
                      {t('nav.admin.userManagement')}
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item as="span" className={styles.dropdownItem}>
                    <NavLink to={PATHS.dresscode.admin.eventManagement} className={getLinkClass}>
                      {t('nav.admin.eventManagement')}
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {/* Profile Dropdown */}
              {auth?.user && (
                <NavDropdown
                  title={TOP_NAVIGATION_TEXT.profile}
                  align="end"
                  toggleas={CustomToggle}
                  menuVariant="light"
                  className={`${isDropdownActive ? styles.navDropdownActive : ''}`}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/profile"
                    className={styles.dropdownItem}
                    active={location.pathname === '/profile'}
                  >
                    {TOP_NAVIGATION_TEXT.profileInfo}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout} className={styles.dropdownItem}>
                    {TOP_NAVIGATION_TEXT.logout}
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <LanguageSwitcher className={styles.navLink} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
    className={styles.navLink}
  >
    {children}
  </button>
))
