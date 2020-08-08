import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"

import World from "../infra/typeorm/entities/World"
import WorldsRepositoryInterface from "../repositories/WorldsRepositoryInterface"

interface Request {
  worldId: string
}

@injectable()
class ShowWorldService {
  constructor(
    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface
  ) {}

  public async execute({ worldId }: Request): Promise<World> {
    const world = await this.worldsRepository.findById(worldId)

    if (!world) {
      throw new AppError("World not found.", 404)
    }

    return world
  }
}

export default ShowWorldService
