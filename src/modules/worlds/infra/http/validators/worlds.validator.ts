import { celebrate, Segments, Joi } from "celebrate"

export const createWorldValidator = celebrate(
  {
    [Segments.BODY]: {
      title: Joi.string().min(2).required(),
      password: Joi.string().min(6).required(),
      description: Joi.string().min(2),
      systemBaseId: Joi.string().required(),
    },
  },
  { abortEarly: false }
)

export const createWorldPlayerValidator = celebrate(
  {
    [Segments.BODY]: {
      worldId: Joi.string().uuid().required(),
      password: Joi.string().required(),
    },
  },
  { abortEarly: false }
)
