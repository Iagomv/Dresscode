import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LanguageSwitcher } from "../components/public/LanguageSwitcher";
import { TOP_NAVIGATION_TEXT, ROLES } from "../constants/textConstants";
import { PublicNavLinks } from "../components/public/PublicNavLinks";
import styles from "./TopNavigation.module.css";

export const TopNavigation = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const role = auth?.user?.authorities?.[0];
  const ROLE_STUDENT = `ROLE_${ROLES.STUDENT}`;
  const ROLE_TEACHER = `ROLE_${ROLES.TEACHER}`;
  const ROLE_ADMIN = `ROLE_${ROLES.ADMIN}`;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className={styles.brand}>
          {TOP_NAVIGATION_TEXT.title}
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.toggleButton}
        >
          <span className={styles.toggleIcon}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto ${styles.navContainer}`}>
            <PublicNavLinks />
          </Nav>

          <Nav className={styles.navContainer}>
            {/* Role-based navigation items */}
            {role === ROLE_STUDENT && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/"
                  className={styles.navLink}
                  activeClassName={styles.navLinkActive}
                >
                  {TOP_NAVIGATION_TEXT.myIncidents}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className={styles.navLink}
                  activeClassName={styles.navLinkActive}
                >
                  {TOP_NAVIGATION_TEXT.createIncident}
                </Nav.Link>
              </>
            )}

            {role === ROLE_TEACHER && (
              <Nav.Link
                as={NavLink}
                to="/assigned-incidents"
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
              >
                {TOP_NAVIGATION_TEXT.myAssignedIncidents}
              </Nav.Link>
            )}

            {role === ROLE_ADMIN && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/user-management"
                  className={styles.navLink}
                  activeClassName={styles.navLinkActive}
                >
                  {TOP_NAVIGATION_TEXT.userManagement}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/assignments"
                  className={styles.navLink}
                  activeClassName={styles.navLinkActive}
                >
                  {TOP_NAVIGATION_TEXT.assignIncidents}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/statistics"
                  className={styles.navLink}
                  activeClassName={styles.navLinkActive}
                >
                  {TOP_NAVIGATION_TEXT.statistics}
                </Nav.Link>
              </>
            )}

            {/* Profile Dropdown */}
            {auth?.user && (
              <NavDropdown
                title={TOP_NAVIGATION_TEXT.profile}
                align="end"
                menuVariant="light"
                className={styles.navLink}
                menuClassName={styles.dropdownMenu}
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/profile"
                  className={styles.dropdownItem}
                >
                  {TOP_NAVIGATION_TEXT.profileInfo}
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={handleLogout}
                  className={styles.dropdownItem}
                >
                  {TOP_NAVIGATION_TEXT.logout}
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <LanguageSwitcher />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
