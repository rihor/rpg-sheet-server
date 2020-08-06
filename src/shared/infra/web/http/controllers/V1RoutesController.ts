import { Request, Response } from "express"

export default class V1RoutesController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({
      user: {
        POST: "http://localhost:3333/api/v1/users",
        session: {
          POST: "http://localhost:3333/api/v1/sessions",
        },
        profile: {
          GET: "http://localhost:3333/api/v1/profile",
          PUT: "http://localhost:3333/api/v1/profile",
        },
      },
      world: {
        POST: "http://localhost:3333/api/v1/worlds",
      },
    })
  }
}
