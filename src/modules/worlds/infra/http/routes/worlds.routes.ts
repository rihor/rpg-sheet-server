import { Router } from "express"

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated"

import WorldsController from "../controllers/WorldsController"
import { createWorldValidator } from "../validators/worlds.validator"

const worldsRouter = Router()
const worldsController = new WorldsController()

worldsRouter.use(ensureAuthenticated)

worldsRouter.post("/", createWorldValidator, worldsController.create)

export default worldsRouter
