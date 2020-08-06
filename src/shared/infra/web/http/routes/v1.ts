import { Router } from "express"

import charactersRouter from "@modules/characters/infra/http/routes/characters.routes"
import profileRouter from "@modules/users/infra/http/routes/profile.routes"
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes"
import usersRouter from "@modules/users/infra/http/routes/users.routes"
import worldsRouter from "@modules/worlds/infra/http/routes/worlds.routes"

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/profile", profileRouter)

routes.use("/characters", charactersRouter)
routes.use("/worlds", worldsRouter)

export default routes
