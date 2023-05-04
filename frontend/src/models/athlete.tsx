import * as yup from 'yup'

export const athleteSchema = yup.object().shape({
  name: yup.object().shape({
    first: yup.string().required(),
    last: yup.string().required(),
  }),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  gender: yup.string().oneOf(['male', 'female']),
  dateOfBirth: yup.date(),
  address: yup.object().shape({
    street: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zip: yup.string(),
  }),
  phone: yup.string(),
  weight: yup.number(),
  height: yup.number(),
  session: yup.array().of(yup.string()),
  age: yup.number(),
  level: yup
    .string()
    .oneOf(['beginner', 'intermediate', 'advanced', 'professional']),
  discipline: yup.array().of(yup.string()),
  adminType: yup.string().oneOf(['association', 'gym', 'personal trainer']),
})
