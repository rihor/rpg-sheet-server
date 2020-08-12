import { Router } from "express"

import charactersRouter from "@modules/characters/infra/http/routes/characters.routes"
import systemBasesRouter from "@modules/system/infra/http/routes/systemBases.routes"
import profileRouter from "@modules/users/infra/http/routes/profile.routes"
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes"
import usersRouter from "@modules/users/infra/http/routes/users.routes"
import worldsRouter from "@modules/worlds/infra/http/routes/worlds.routes"

import V1RoutesController from "../controllers/V1RoutesController"

const routes = Router()
const v1Routes = new V1RoutesController()

routes.get("/", v1Routes.index)

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/profile", profileRouter)

routes.use("/characters", charactersRouter)
routes.use("/worlds", worldsRouter)

routes.use("/system-base", systemBasesRouter)

export default routes
