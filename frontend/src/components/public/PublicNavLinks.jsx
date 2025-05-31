import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { useTranslation } from "react-i18next";

export const PublicNavLinks = () => {
  const { t } = useTranslation("navigation");

  return (
    <>
      <Nav.Link as={NavLink} to="/about">
        {t("nav.about")}
      </Nav.Link>
      <Nav.Link as={NavLink} to="/activities">
        {t("nav.activities")}
      </Nav.Link>
      <Nav.Link as={NavLink} to="/login">
        {t("nav.login")}
      </Nav.Link>
    </>
  );
};
