import { Router } from "express"

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated"

import CharactersController from "../controllers/CharactersController"
import { createCharacterValidator } from "../validators/characters.validator"

const charactersRouter = Router()
const charactersController = new CharactersController()

charactersRouter.use(ensureAuthenticated)

charactersRouter.post(
  "/",
  createCharacterValidator,
  charactersController.create
)

export default charactersRouter
