import { Router } from "express"

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated"

import SystemBasesController from "../controllers/SystemBasesController"

const systemBasesRouter = Router()
const systemBasesController = new SystemBasesController()

systemBasesRouter.use(ensureAuthenticated)

systemBasesRouter.post("/", systemBasesController.create)

export default systemBasesRouter
