import { Router } from "express"

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated"

import WorldPlayersController from "../controllers/WorldPlayersController"
import WorldsController from "../controllers/WorldsController"
import {
  createWorldValidator,
  createWorldPlayerValidator,
} from "../validators/worlds.validator"

const worldsRouter = Router()
const worldsController = new WorldsController()
const worldPlayersController = new WorldPlayersController()

worldsRouter.use(ensureAuthenticated)

worldsRouter.get("/:id", worldsController.show)

worldsRouter.post("/", createWorldValidator, worldsController.create)

worldsRouter.post(
  "/enter",
  createWorldPlayerValidator,
  worldPlayersController.create
)

export default worldsRouter
