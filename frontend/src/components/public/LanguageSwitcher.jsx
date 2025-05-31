import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup, Button } from "react-bootstrap";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={handleChange} value={i18n.language}>
      <option value="es">Castellano</option>
      <option value="gl">Galego</option>
    </select>
  );
};
