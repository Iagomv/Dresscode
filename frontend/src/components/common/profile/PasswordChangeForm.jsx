import React from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Form as BootstrapForm,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { FiLock, FiKey, FiArrowLeft } from "react-icons/fi";
import { passwordChangeSchema } from "../../../schema/ProfileSchema";
import { ApiConfig } from "../../../api/ApiConfig";

const PasswordChangeForm = ({ onSuccess, onError, onClose }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { currentPassword, newPassword } = values;
      await ApiConfig.updatePassword({
        currentPassword,
        newPassword,
      });

      onSuccess("Password changed successfully");
      resetForm();
    } catch (error) {
      console.error("Password change error:", error);
      onError(error.response?.data?.message || "Failed to change password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={passwordChangeSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Row className="g-4">
            <Col md={12}>
              <BootstrapForm.Group controlId="currentPassword">
                <BootstrapForm.Label className="d-flex align-items-center gap-2 text-secondary mb-2">
                  <FiKey size={18} />
                  Current Password
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  name="currentPassword"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.currentPassword && !!errors.currentPassword
                  }
                  placeholder="Enter current password"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.currentPassword}
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={12}>
              <BootstrapForm.Group controlId="newPassword">
                <BootstrapForm.Label className="d-flex align-items-center gap-2 text-secondary mb-2">
                  <FiLock size={18} />
                  New Password
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  name="newPassword"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.newPassword && !!errors.newPassword}
                  placeholder="Enter new password"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.newPassword}
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={12}>
              <BootstrapForm.Group controlId="confirmPassword">
                <BootstrapForm.Label className="d-flex align-items-center gap-2 text-secondary mb-2">
                  <FiLock size={18} />
                  Confirm Password
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                  placeholder="Confirm new password"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={12} className="mt-4 border-top pt-4">
              <div className="d-flex justify-content-between gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={onClose}
                  className="d-flex align-items-center gap-2"
                >
                  <FiArrowLeft size={18} />
                  Back to Profile
                </Button>
                <Button
                  variant="warning"
                  type="submit"
                  disabled={isSubmitting}
                  className="d-flex align-items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span>Updating...</span>
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordChangeForm;
