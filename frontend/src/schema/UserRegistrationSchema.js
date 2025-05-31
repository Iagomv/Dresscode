import * as Yup from 'yup';

export const userRegistrationSchema = (t) => Yup.object({
  name: Yup.string()
    .min(3, t('validation:name_min'))
    .max(20, t('validation:name_max'))
    .required(t('validation:name_required')),

  lastName: Yup.string(),

  phoneNumber: Yup.string()
    .nullable()
    .notRequired()
    .matches(/^[0-9]+$/, (t('validation:phone_integer'))),

  email: Yup.string()
    .email(t('validation:email_invalid'))
    .required(t('validation:email_required')),

  password: Yup.string()
    .min(8, t('validation:password_min'))
    .max(128, t('validation:password_max'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      t('validation:password_pattern')
    )
    .required(t('validation:password_required')),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('validation:passwords_must_match'))
    .required(t('validation:repeat_password_required')),
});
