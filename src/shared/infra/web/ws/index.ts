import { Server } from "http"
import socketIO from "socket.io"

export default function startWebsocket(server: Server): void {
  const io = socketIO(server)

  io.on("connect", () => {
    console.log("WEB SOCKET CONNECT")
  })

  io.on("connection", () => {
    console.log("WEB SOCKET CONNECTION")
  })
}
