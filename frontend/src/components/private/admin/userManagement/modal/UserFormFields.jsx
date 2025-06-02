import React from 'react'
import { Form } from 'react-bootstrap'
import { Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

export const UserFormFields = ({ formik }) => {
  const { t } = useTranslation('common')
  const { t: tUserMgmnt } = useTranslation('userManagement')
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{t('form.name')}*</Form.Label>
        <Field type="text" name="name" as={Form.Control} isInvalid={formik.touched.name && !!formik.errors.name} />
        <ErrorMessage name="name" component={Form.Control.Feedback} type="invalid" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('form.lastName')}</Form.Label>
        <Field type="text" name="lastName" as={Form.Control} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('form.email')}*</Form.Label>
        <Field type="email" name="email" as={Form.Control} isInvalid={formik.touched.email && !!formik.errors.email} />
        <ErrorMessage name="email" component={Form.Control.Feedback} type="invalid" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('form.phoneNumber')}</Form.Label>
        <Field type="tel" name="phoneNumber" as={Form.Control} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('form.password')}*</Form.Label>
        <Field
          type="password"
          name="password"
          as={Form.Control}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <ErrorMessage name="password" component={Form.Control.Feedback} type="invalid" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('form.role')}*</Form.Label>
        <Field name="role" as={Form.Select} isInvalid={formik.touched.role && !!formik.errors.role}>
          <option value="STUDENT">{t('roles.STUDENT')}</option>
          <option value="TEACHER">{t('roles.TEACHER')}</option>
          <option value="ADMIN">{t('roles.ADMIN')}</option>
        </Field>
        <ErrorMessage name="role" component={Form.Control.Feedback} type="invalid" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label={tUserMgmnt('activeUser')}
          name="active"
          checked={formik.values.active}
          onChange={formik.handleChange}
        />
      </Form.Group>
    </>
  )
}
