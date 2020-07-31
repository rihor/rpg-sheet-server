import express from "express"
import cors from "cors"

import "express-async-errors" // must be after express import

import routes from "./routes"
import errorHandler from "./middlewares/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", routes)

// Must be after routes
app.use(errorHandler)

export default app
