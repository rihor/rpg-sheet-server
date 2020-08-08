import { inject, injectable } from "tsyringe"

import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import HashProviderInterface from "@shared/container/providers/HashProvider/HashProviderInterface"
import AppError from "@shared/errors/AppError"

import WorldPlayer from "../infra/typeorm/entities/WorldPlayer"
import WorldPlayersRepositoryInterface from "../repositories/WorldPlayersRepositoryInterface"
import WorldsRepositoryInterface from "../repositories/WorldsRepositoryInterface"

interface Request {
  password: string
  playerId: string
  worldId: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject("WorldPlayersRepository")
    private worldPlayersRepository: WorldPlayersRepositoryInterface,

    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface,

    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,

    @inject("HashProvider")
    private hashProvider: HashProviderInterface
  ) {}

  public async execute({
    playerId,
    worldId,
    password,
  }: Request): Promise<WorldPlayer> {
    const playerPromise = this.usersRepository.findById(playerId)
    const worldPromise = this.worldsRepository.findById(worldId)
    const existentWorldPlayerPromise = this.worldPlayersRepository.find(
      playerId,
      worldId
    )

    const [player, world, existentWorldPlayer] = await Promise.all([
      playerPromise,
      worldPromise,
      existentWorldPlayerPromise,
    ])

    if (!player) {
      throw new AppError("User not found.", 404)
    }

    if (!world) {
      throw new AppError("World not found.", 404)
    }

    if (existentWorldPlayer) {
      return existentWorldPlayer
    }

    if (world.user_id === player.id) {
      throw new AppError("World owner cannot enter as a player.", 403)
    }

    const doesPasswordMatch = await this.hashProvider.compareHash(
      password,
      world.password
    )

    if (!doesPasswordMatch) {
      throw new AppError("Wrong password")
    }

    const worldPlayer = await this.worldPlayersRepository.create({
      world_id: world.id,
      player_id: player.id,
    })

    return worldPlayer
  }
}

export default CreateUserService
