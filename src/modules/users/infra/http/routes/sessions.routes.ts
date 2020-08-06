import { Router } from "express"

import SessionsController from "../controllers/SessionsController"
import { createSessionValidator } from "../validators/sessions.validator"

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post("/", createSessionValidator, sessionsController.create)

export default sessionsRouter
