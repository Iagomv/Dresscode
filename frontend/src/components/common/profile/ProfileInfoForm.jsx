import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Form as BootstrapForm,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import { FiUser, FiMail, FiLock, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profileChangeSchema } from "../../../schema/ProfileSchema";
import { useAuth } from "../../../context/AuthContext";
import { ApiConfig } from "../../../api/ApiConfig";

const ProfileInfoForm = () => {
  const { auth, logout } = useAuth();
  const user = auth.user;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(null);

  const proceedWithSubmission = async (values, setSubmitting) => {
    setSubmitting(true);

    try {
      const payload = buildProfilePayload(values);
      await toast.promise(ApiConfig.updateProfile(payload), {
        pending: "Updating profile...",
        success: { render: () => handleSuccessToast(values, user, logout) },
        error: { render: ({ data }) => handleErrorToast(data) },
      });
    } catch (error) {
      console.error("Unhandled error during profile update:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (handleNoChanges(values, user, setSubmitting)) return;
    if (handleNoPassword(values, setSubmitting)) return;
    if (
      handleUserNameChange(
        values,
        user,
        setSubmitting,
        setPendingSubmission,
        setShowConfirmation
      )
    )
      return;

    proceedWithSubmission(cleanValues(values), setSubmitting);
  };

  return (
    <>
      <Formik
        initialValues={{
          username: user.username || "",
          email: user.email || "",
          password: "",
        }}
        validationSchema={profileChangeSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form>
            <Row className="g-4">
              <Col md={12}>
                <BootstrapForm.Group controlId="username">
                  <BootstrapForm.Label className="d-flex align-items-center gap-2 text-secondary mb-2">
                    <FiUser size={18} />
                    Username
                  </BootstrapForm.Label>
                  <BootstrapForm.Control
                    name="username"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isInvalid={touched.username && !!errors.username}
                    placeholder="Enter your username"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.username}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>

              <Col md={12}>
                <BootstrapForm.Group controlId="email">
                  <BootstrapForm.Label className="d-flex align-items-center gap-2 text-secondary mb-2">
                    <FiMail size={18} />
                    Email Address
                  </BootstrapForm.Label>
                  <BootstrapForm.Control
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isInvalid={touched.email && !!errors.email}
                    placeholder="name@example.com"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.email}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>

              <Col md={12}>
                <BootstrapForm.Group controlId="password">
                  <BootstrapForm.Label className="d-flex align-items-center gap-2 text-secondary mb-2">
                    <FiLock size={18} />
                    Password
                  </BootstrapForm.Label>
                  <BootstrapForm.Control
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={touched.password && !!errors.password}
                    placeholder="Enter your password"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.password}
                  </BootstrapForm.Control.Feedback>
                  <BootstrapForm.Text className="text-muted">
                    Actual password is required to update your profile
                    information
                  </BootstrapForm.Text>
                </BootstrapForm.Group>
              </Col>

              <Col md={12} className="mt-4 border-top pt-4">
                <div className="d-flex justify-content-end gap-3">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="d-flex align-items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div aria-live="polite" aria-atomic="true">
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        </div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <FiSave size={18} />
                        <span>Update Profile</span>
                      </>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Username Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Changing your username will log you out immediately. Make sure you
          remember your new username to login again.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmation(false);
              pendingSubmission?.setSubmitting(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowConfirmation(false);
              if (pendingSubmission) {
                proceedWithSubmission(
                  pendingSubmission.values,
                  pendingSubmission.setSubmitting
                );
              }
            }}
          >
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoForm;

// helper methods
export const userNameChangedHandler = (logout, delay) => {
  setTimeout(() => {
    logout();
    toast.info("Please login with your new username");
  }, delay);
  return "Profile updated successfully. You will be logged out shortly.";
};

export const handleNoChanges = (values, user, setSubmitting) => {
  if (hasNoChanges(values, user)) {
    setSubmitting(false);
    toast.error("No changes detected");
    return true;
  }
  return false;
};

export const handleNoPassword = (values, setSubmitting) => {
  if (!values.password) {
    setSubmitting(false);
    toast.error("Password is required to update profile");
    return true;
  }
  return false;
};

export const handleUserNameChange = (
  values,
  user,
  setSubmitting,
  setPendingSubmission,
  setShowConfirmation
) => {
  if (values.username !== user.username) {
    setPendingSubmission({ values, setSubmitting });
    setShowConfirmation(true);
    return true;
  }
  return false;
};

export const cleanValues = (values) => {
  return {
    ...values,
    username: values.username.trim(),
    email: values.email.trim(),
  };
};

export const hasNoChanges = (values, user) => {
  return (
    values.username.trim() === user.username &&
    (values.email.trim() === user.email || values.email.trim() === "")
  );
};

export const buildProfilePayload = (values) => ({
  username: values.username,
  email: values.email,
  password: values.password,
});

export const handleSuccessToast = (values, user, logout) => {
  const usernameChanged = values.username !== user.username;
  if (usernameChanged) {
    return userNameChangedHandler(logout, 2500);
  }
  return "Profile updated successfully";
};

export const handleErrorToast = (data) => {
  if (data?.response?.data?.message) {
    return `Error: ${data.response.data.message}`;
  }
  return "Failed to update profile";
};
