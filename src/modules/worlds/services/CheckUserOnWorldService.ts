import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"

import WorldsRepositoryInterface from "../repositories/WorldsRepositoryInterface"

interface Request {
  worldId: string
  playerId: string
}

@injectable()
class CheckUserOnWorldService {
  constructor(
    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface
  ) {}

  public async execute({ worldId, playerId }: Request): Promise<boolean> {
    const world = await this.worldsRepository.findById(worldId)

    if (!world) {
      throw new AppError("World not found.", 404)
    }

    const player = world.players.find((player) => player.id === playerId)
    const owner = world.owner.id === playerId ? world.owner : undefined

    return !!player || !!owner
  }
}

export default CheckUserOnWorldService
