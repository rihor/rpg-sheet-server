import { celebrate, Segments, Joi } from "celebrate"

export const createSystemBaseValidator = celebrate(
  {
    [Segments.BODY]: {
      title: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
      formBase: Joi.object({
        stats: Joi.array().items(Joi.string()).required(),
        currencies: Joi.array().items(Joi.string()).required(),
        hasMana: Joi.boolean(),
        hasAllignment: Joi.boolean(),
        hasExp: Joi.boolean(),
        hasBackground: Joi.boolean(),
        hasRace: Joi.boolean(),
        hasLevel: Joi.boolean(),
        hasClass: Joi.boolean(),
        hasInitiative: Joi.boolean(),
        hasSpeed: Joi.boolean(),
        hasPerception: Joi.boolean(),
        hasArmor: Joi.boolean(),
        hasSavingThrows: Joi.boolean(),
      }).required(),
    },
  },
  { abortEarly: false }
)
