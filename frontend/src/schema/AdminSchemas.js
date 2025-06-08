import * as Yup from 'yup'
// Validation schema for the event form
export const createEventSchema = (t) =>
  Yup.object().shape({
    title: Yup.string()
      .min(3, t('title.min', { min: 3 }))
      .max(100, t('title.max'))
      .required(t('title.required')),
    description: Yup.string().min(10, t('description.min')).max(1000, t('description.max')).required(t('description.required')),
    location: Yup.string().max(100, t('location.max')).required(t('location.required')),
    eventDate: Yup.date().required(t('date.required')),
    category: Yup.string().oneOf(['PUBLIC', 'PRIVATE'], t('category.invalid')).required(t('category.required')),
    status: Yup.string()
      .oneOf(['DRAFT', 'PUBLISHED', 'CANCELLED', 'ARCHIVED'], t('status.invalid'))
      .required(t('status.required')),
    image: Yup.mixed().test('fileType', t('image.valid'), (value) => {
      if (!value) return true
      return ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'].includes(value.type)
    }),
  })

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

export const createClothingItemSchema = (t) =>
  Yup.object().shape({
    name: Yup.string()
      .min(3, t('validation:name_min', { min: 3 }))
      .max(100, t('validation:name_max', { max: 100 }))
      .required(t('validation:name_required')),

    imageUrl: Yup.string()
      .max(255, t('validation:image.url.max', { max: 255 }))
      .url(t('validation:image.valid'))
      .nullable(),

    description: Yup.string().nullable(),

    quantity: Yup.number()
      .integer(t('validation:quantity.integer'))
      .min(0, t('validation:quantity.min', { min: 0 }))
      .required(t('validation:quantity.required')),

    color: Yup.string()
      .max(50, t('validation:color.max', { max: 50 }))
      .nullable(),

    price: Yup.number()
      .min(0, t('validation:price.min', { min: 0 }))
      .required(t('validation:price.required')),

    state: Yup.string().oneOf(['NEW', 'USED'], t('validation:state.invalid')).required(t('validation:state.required')),

    gender: Yup.string()
      .oneOf(['MALE', 'FEMALE', 'UNISEX'], t('validation:gender.invalid'))
      .required(t('validation:gender.required')),

    type: Yup.string()
      .oneOf(['PANTS', 'SHIRT', 'JACKET', 'DRESS', 'SKIRT', 'SHOES', 'HAT', 'BELT'], t('validation:type.invalid'))
      .required(t('validation:type.required')),

    size: Yup.string()
      .oneOf(['6', '8', '10', '12', '14', 'XS', 'S', 'M', 'L', 'XL', 'XXL'], t('validation:size.invalid'))
      .required(t('validation:size.required')),

    availability: Yup.string()
      .oneOf(['AVAILABLE', 'UNAVAILABLE', 'LOST', 'SOLD', 'RESERVED'], t('validation:availability.invalid'))
      .required(t('validation:availability.required')),
  })
