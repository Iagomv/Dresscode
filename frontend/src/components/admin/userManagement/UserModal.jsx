import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { createUserSchema, editUserSchema } from '../../../schema/AdminSchemas'
import { ADMIN_USER_MANAGEMENT_TEXT, ROLES, FORM_TEXT } from '../../../constants/textConstants'

const UserModal = ({ show, onHide, user, onSave, isSubmitting: parentSubmitting }) => {
  const isEditing = !!user
  const editUserText = ADMIN_USER_MANAGEMENT_TEXT.userModal.editTitle
  const createUserText = ADMIN_USER_MANAGEMENT_TEXT.userModal.createTitle

  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
      role: user?.role || 'USER',
      ...(!isEditing && { password: '' }),
    },
    validationSchema: isEditing ? editUserSchema : createUserSchema,
    enableReinitialize: true,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const dataToSend = isEditing
          ? {
              username: values.username,
              email: values.email,
              role: values.role,
            }
          : values

        await onSave(dataToSend)
        toast.success(`User ${isEditing ? 'updated' : 'created'} successfully`)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Operation failed')
      } finally {
        setSubmitting(false)
      }
    },
  })
  const getButtonContent = () => {
    if (formik.isSubmitting || parentSubmitting) {
      return (
        <span className="d-flex align-items-center">
          <span className="spinner-border spinner-border-sm me-2" />
          {isEditing ? 'Saving...' : 'Creating...'}
        </span>
      )
    }

    return isEditing ? 'Save Changes' : 'Create User'
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? editUserText : createUserText}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          {/* Username Field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">{FORM_TEXT.username}</Form.Label>
            <Form.Control
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">{FORM_TEXT.email}</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
          </Form.Group>

          {/* Role Field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="role">{FORM_TEXT.role}</Form.Label>
            <Form.Select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              isInvalid={formik.touched.role && formik.errors.role}
            >
              <option value="USER">{ROLES.USER}</option>
              <option value="TECHNICIAN">{ROLES.TECHNICIAN}</option>
              <option value="ADMIN">{ROLES.ADMIN}</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{formik.errors.role}</Form.Control.Feedback>
          </Form.Group>

          {/* Conditional Password Field */}
          {!isEditing && (
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">{FORM_TEXT.password}</Form.Label>
              <Form.Control
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
                placeholder="Required"
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting || parentSubmitting}>
            {getButtonContent()}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UserModal
