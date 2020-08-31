import { Router } from "express"

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated"

import SystemBasesController from "../controllers/SystemBasesController"
import { createSystemBaseValidator } from "../validators/systemBase.validator"

const systemBasesRouter = Router()
const systemBasesController = new SystemBasesController()

systemBasesRouter.use(ensureAuthenticated)

systemBasesRouter.post(
  "/",
  createSystemBaseValidator,
  systemBasesController.create
)

export default systemBasesRouter
