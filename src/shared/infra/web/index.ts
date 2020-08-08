import "reflect-metadata"
import "dotenv/config"
import "@shared/infra/typeorm" // start database
import "@shared/container" // start the dependency injection container

import httpApp from "./http/app"
import startWebsocket from "./ws"

const { PORT, APP_API_URL } = process.env

const server = httpApp.listen(PORT, () => {
  console.info(`Running at ${APP_API_URL}/api`)
})

startWebsocket(server)
