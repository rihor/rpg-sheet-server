import { celebrate, Segments, Joi } from "celebrate"

export const createSessionValidator = celebrate(
  {
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
  { abortEarly: false }
)
