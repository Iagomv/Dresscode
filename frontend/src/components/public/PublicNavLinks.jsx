import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { PATHS } from "../../constants/routes";

import { useTranslation } from "react-i18next";

export const PublicNavLinks = () => {
  const { t } = useTranslation("navigation");

  return (
    <>
      <Nav.Link as={NavLink} to={PATHS.about}>
        {t("nav.about")}
      </Nav.Link>
      <Nav.Link as={NavLink} to={PATHS.activities}>
        {t("nav.activities")}
      </Nav.Link>
      <Nav.Link as={NavLink} to={PATHS.login}>
        {t("nav.login")}
      </Nav.Link>
    </>
  );
};
