import { celebrate, Segments, Joi } from "celebrate"

export const createWorldValidator = celebrate(
  {
    [Segments.BODY]: {
      title: Joi.string().min(2).required(),
      password: Joi.string().min(6).required(),
      description: Joi.string().min(2),
      ruleId: Joi.string().uuid().required(),
    },
  },
  { abortEarly: false }
)
