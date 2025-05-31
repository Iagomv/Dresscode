import React from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLoginForm } from "./useLoginForm";

export const LoginForm = () => {
  const { t } = useTranslation();
  const { formik, isSubmitting, errorMessage } = useLoginForm();

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{t("common:form.email")}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t("common:form.emailPlaceholder")}
          name="email"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-3">
        <Form.Label>{t("common:form.password")}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t("common:form.passwordPlaceholder")}
          name="password"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}

      <Button
        variant="primary"
        type="submit"
        className="w-100 mt-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Spinner animation="border" size="sm" role="status" />
        ) : (
          t("loginRegister:loginButton")
        )}
      </Button>
    </Form>
  );
};

export default LoginForm;
