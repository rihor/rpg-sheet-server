import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

import CreateWorldService from "@modules/worlds/services/CreateWorldService"
import ShowWorldService from "@modules/worlds/services/ShowWorldService"

export default class WorldsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, password, description, systemBaseId } = request.body
    const userId = request.user.id

    const createUser = container.resolve(CreateWorldService)

    const user = await createUser.execute({
      title,
      password,
      description,
      ownerId: userId,
      systemBaseId,
    })

    return response.status(201).json(classToClass(user))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const worldId = request.params.id

    const showWorld = container.resolve(ShowWorldService)

    const world = await showWorld.execute({
      worldId,
    })

    return response.status(200).json(classToClass(world))
  }
}
