import { celebrate, Segments, Joi } from "celebrate"

export const createCharacterValidator = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(2).required().trim(),
      description: Joi.string().min(2).max(1000),
      worldId: Joi.string().uuid().required(),
      ownerId: Joi.string().uuid().required(),
    },
  },
  { abortEarly: false }
)
