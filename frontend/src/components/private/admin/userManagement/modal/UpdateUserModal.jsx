import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(40, 'Name cannot be more than 40 characters')
    .required('Name is required'),
  lastName: Yup.string().notRequired(),
  phoneNumber: Yup.string()
    .matches(/^\d{9}$/, 'Phone number must be exactly 9 digits')
    .notRequired(),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().oneOf(['STUDENT', 'ADMIN', 'TEACHER'], 'Invalid role').required('Role is required'),
  active: Yup.boolean().required('Active status is required'),
})

export const UpdateUserModal = ({ user, onClose, onUpdate }) => {
  return (
    <>
      <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update User</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
            </div>

            <Formik
              initialValues={{
                name: user.name || '',
                lastName: user.lastName || '',
                phoneNumber: user.phoneNumber || '',
                email: user.email || '',
                role: user.role || 'STUDENT',
                active: user.active || false,
              }}
              validationSchema={updateUserSchema}
              onSubmit={(values, { setSubmitting }) => {
                onUpdate(user.id, values).finally(() => setSubmitting(false))
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <Field name="name" type="text" className="form-control" id="name" />
                      <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <Field name="lastName" type="text" className="form-control" id="lastName" />
                      <ErrorMessage name="lastName" component="div" className="text-danger small mt-1" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <Field name="phoneNumber" type="text" className="form-control" id="phoneNumber" />
                      <ErrorMessage name="phoneNumber" component="div" className="text-danger small mt-1" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field name="email" type="email" className="form-control" id="email" />
                      <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        Role
                      </label>
                      <Field as="select" name="role" className="form-select" id="role">
                        <option value="STUDENT">STUDENT</option>
                        <option value="TEACHER">TEACHER</option>
                        <option value="ADMIN">ADMIN</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="text-danger small mt-1" />
                    </div>

                    <div className="form-check mb-3">
                      <Field
                        name="active"
                        type="checkbox"
                        className="form-check-input"
                        id="active"
                        checked={values.active}
                        onChange={() => setFieldValue('active', !values.active)}
                      />
                      <label className="form-check-label" htmlFor="active">
                        Active
                      </label>
                      <ErrorMessage name="active" component="div" className="text-danger small mt-1" />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                      Update
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="modal-backdrop show"></div>
    </>
  )
}
