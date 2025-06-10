import * as Yup from 'yup'
export const editUserSchema = (t) =>
  Yup.object().shape({
    name: Yup.string()
      .min(3, t('validation:name_min', { min: 3 }))
      .max(40, t('validation:name_max', { max: 40 }))
      .required(t('validation:name_required')),
    lastName: Yup.string().notRequired(),
    phoneNumber: Yup.string()
      .matches(/^\d{9}$/, t('validation:phone_integer'))
      .notRequired(),
    email: Yup.string().email(t('validation:email_invalid')).required(t('validation:email_required')),
    role: Yup.string()
      .required(t('validation:role_required'))
      .oneOf(['STUDENT', 'ADMIN', 'TEACHER'], t('validation:invalid_role')),
    active: Yup.boolean().required(t('validation:active_required')),
  })
