import { celebrate, Segments, Joi } from "celebrate"

export const updateProfileValidator = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(2),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string().min(6),
      password_confirmation: Joi.string().error(
        new Error(`"password_confirmation" must be the same as "password"`)
      ),
    },
  },
  { abortEarly: false }
)
