import { Request, Response } from "express"

export default class V1RoutesController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({
      user: {
        POST: "http://localhost:3333/users",
      },
      world: {},
    })
  }
}
