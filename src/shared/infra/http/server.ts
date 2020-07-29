import "reflect-metadata"
import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import cors from "cors"

import "express-async-errors" // must be after express import

import AppError from "@shared/errors/AppError"
import routes from "@shared/infra/http/routes"

import "@shared/infra/typeorm"
import "@shared/container"

const { PORT, APP_API_URL } = process.env
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", routes)

// Must be after routes
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: "error", message: error.message })
    }

    if (process.env.NODE_ENV === "development") {
      console.error(error)
    }

    return response
      .status(500)
      .json({ status: "error", message: "Internal server error." })
  }
)

app.listen(PORT, () => {
  console.info(`Running at ${APP_API_URL}/api`)
})
