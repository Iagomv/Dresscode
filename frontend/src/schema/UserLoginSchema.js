import * as Yup from 'yup';

export const getUserLoginSchema = (t) => 
  Yup.object({
    email: Yup.string()
      .email(t('validation:email_invalid'))
      .required(t('validation:email_required')),

    password: Yup.string()
      .min(8, t('validation:password_min'))
      .max(128, t('validation:password_max'))
      .required(t('validation:password_required')),
  });
