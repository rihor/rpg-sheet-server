import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.get("/", () => {
  console.log("EITA")
})

app.listen(3333, () => {
  console.info("Running at port 3333")
})
