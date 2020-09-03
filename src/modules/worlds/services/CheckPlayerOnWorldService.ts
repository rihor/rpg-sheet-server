import { inject, injectable } from "tsyringe"

import User from "@modules/users/infra/typeorm/entities/User"
import AppError from "@shared/errors/AppError"

import WorldsRepositoryInterface from "../repositories/WorldsRepositoryInterface"

interface Request {
  worldId: string
  playerId: string
}

@injectable()
class CheckPlayerOnWorldService {
  constructor(
    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface
  ) {}

  public async execute({ worldId, playerId }: Request): Promise<User> {
    const world = await this.worldsRepository.findById(worldId)

    if (!world) {
      throw new AppError("World not found.", 404)
    }

    const player = world.players.find((player) => player.id === playerId)

    if (!player) {
      throw new AppError("Player not found on this world.", 404)
    }

    return player
  }
}

export default CheckPlayerOnWorldService
