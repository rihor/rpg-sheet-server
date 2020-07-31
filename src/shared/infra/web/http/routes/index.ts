import { Router } from "express"

import v1Routes from "./v1"

const routes = Router()

routes.get("/", (request, response) => {
  // console.log(v1Routes.stack)

  return response.json(JSON.stringify("v1Routes"))
})

routes.use("/v1", v1Routes)

export default routes
