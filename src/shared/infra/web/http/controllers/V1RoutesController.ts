import { Request, Response } from "express"

export default class V1RoutesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const prefix = "http://localhost:3333/api/v1"

    return response.status(200).json({
      POST: {
        "create-user": `${prefix}/users`,
        "create-session": `${prefix}/sessions`,
        "create-world": `${prefix}/worlds`,
        "enter-world": `${prefix}/worlds/enter`,
        "create-character": `${prefix}/characters`,
      },
      GET: {
        "show-profile": `${prefix}/profile`,
        "show-world": `${prefix}/worlds/:id`,
      },
      PUT: {
        "update-profile": `${prefix}/profile`,
      },
    })
  }
}
