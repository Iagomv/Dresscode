/* SignUpForm.jsx */
import React from "react";
import { Form, Button, Spinner, Toast, Alert } from "react-bootstrap";
import { useSignUpForm } from "./useSignUpForm";
import { useTranslation } from "react-i18next";

export const SignUpForm = ({ toggleForm }) => {
  const { t: tCommon } = useTranslation("common");
  const {
    formik,
    isSubmitting,
    errorMessage,
    showSuccess,
    setShowSuccess,
    registeredUser,
    tLogin,
  } = useSignUpForm(toggleForm);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>{tCommon("form.name")}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicLastName" className="mt-3">
          <Form.Label>{tCommon("form.lastName")}</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.lastName && formik.errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNumber" className="mt-3">
          <Form.Label>{tCommon("form.phoneNumber")}</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="mt-3">
          <Form.Label>{tCommon("form.email")}</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>{tCommon("form.password")}</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
          <Form.Label>{tCommon("form.repeatPassword")}</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}

        <Button
          variant="secondary"
          type="submit"
          className="w-100 mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner animation="border" size="sm" role="status" />
          ) : (
            tLogin("registerButton")
          )}
        </Button>
      </Form>

      <Toast
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header closeButton>
          <strong className="me-auto">
            {tLogin("form.registrationSuccesful")}
          </strong>
        </Toast.Header>
        <Toast.Body>
          {tLogin("form.toastSignUpSuccessDescription")}{" "}
          <strong>{registeredUser?.name}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default SignUpForm;
