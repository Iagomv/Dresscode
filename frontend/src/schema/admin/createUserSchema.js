import * as Yup from 'yup'

export const createUserSchema = (t) =>
  Yup.object({
    name: Yup.string()
      .min(3, t('validation:name_min', { min: 3 }))
      .max(40, t('validation:name_max', { max: 40 }))
      .required(t('validation:name_required')),
    lastName: Yup.string()
      .min(3, t('validation:lastName_min', { min: 3 }))
      .max(40, t('validation:lastName_max', { max: 50 })),
    email: Yup.string().email(t('validation:email_invalid')).required(t('validation:email_required')),
    phoneNumber: Yup.number()
      .typeError(t('validation:phone_integer'))
      .nullable()
      .transform((value, originalValue) => (originalValue.trim() === '' ? null : value)),
    role: Yup.string()
      .oneOf(['STUDENT', 'TEACHER', 'ADMIN'], t('validation:invalid_role'))
      .required(t('validation:role_required')),
    password: Yup.string()
      .required(t('validation:password_required'))
      .min(8, t('validation:password_min'))
      .max(128, t('validation:password_max'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, t('validation:password_pattern')),
  })
