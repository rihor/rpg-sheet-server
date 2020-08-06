import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

import CreateWorldService from "@modules/worlds/services/CreateWorldService"

export default class WorldsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, password, description, ruleId } = request.body
    const userId = request.user.id

    const createUser = container.resolve(CreateWorldService)

    const user = await createUser.execute({
      title,
      password,
      description,
      ownerId: userId,
      ruleId,
    })

    return response.status(201).json(classToClass(user))
  }
}
