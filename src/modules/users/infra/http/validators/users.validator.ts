import { celebrate, Segments, Joi } from "celebrate"

export const createUserValidator = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  },
  { abortEarly: false }
)
