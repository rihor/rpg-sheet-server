import { Router } from "express"

import CharactersController from "../controllers/CharactersController"
import { createCharacterValidator } from "../validators/characters.validator"

const charactersRouter = Router()
const charactersController = new CharactersController()

charactersRouter.post(
  "/",
  createCharacterValidator,
  charactersController.create
)

export default charactersRouter
