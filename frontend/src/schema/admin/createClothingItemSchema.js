import * as Yup from 'yup'
export const createClothingItemSchema = (t) =>
  Yup.object().shape({
    name: Yup.string()
      .min(3, t('validation:name_min', { min: 3 }))
      .max(100, t('validation:name_max', { max: 100 }))
      .required(t('validation:name_required')),

    imageUrl: Yup.string()
      .max(255, t('validation:image.url.max', { max: 255 }))
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
