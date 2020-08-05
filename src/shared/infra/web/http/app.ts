import { errors } from "celebrate"
import cors from "cors"
import express from "express"

import "express-async-errors" // must be after express import

import errorHandler from "./middlewares/errorHandler"
import routes from "./routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", routes)

// Must be after routes
app.use(errors())
app.use(errorHandler)

export default app
