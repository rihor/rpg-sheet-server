import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

import AddPlayerToWorld from "@modules/worlds/services/AddPlayerToWorldService"

export default class WorldPlayersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { worldId, password } = request.body
    const userId = request.user.id

    const addPlayerToWorld = container.resolve(AddPlayerToWorld)

    const worldPlayer = await addPlayerToWorld.execute({
      playerId: userId,
      worldId,
      password,
    })

    return response.status(201).json(classToClass(worldPlayer))
  }
}
