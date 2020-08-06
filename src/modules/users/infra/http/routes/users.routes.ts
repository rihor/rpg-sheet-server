import { Router } from "express"

import UsersController from "../controllers/UsersControllers"
import { createUserValidator } from "../validators/users.validator"

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post("/", createUserValidator, usersController.create)

export default usersRouter
