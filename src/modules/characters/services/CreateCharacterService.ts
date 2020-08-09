import { inject, injectable } from "tsyringe"

import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import WorldsRepositoryInterface from "@modules/worlds/repositories/WorldsRepositoryInterface"
import AppError from "@shared/errors/AppError"

import Character from "../infra/typeorm/entities/Character"
import CharactersRepositoryInterface from "../repositories/CharactersRepositoryInterface"

interface Request {
  name: string
  description?: string
  ownerId: string
  worldId: string
}

@injectable()
class CreateCharacterService {
  constructor(
    @inject("CharactersRepository")
    private charactersRepository: CharactersRepositoryInterface,

    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,

    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface
  ) {}

  public async execute({
    name,
    description,
    ownerId,
    worldId,
  }: Request): Promise<Character> {
    const userPromise = this.usersRepository.findById(ownerId)
    const worldPromise = this.worldsRepository.findById(worldId)

    const [user, world] = await Promise.all([userPromise, worldPromise])

    if (!user) {
      throw new AppError("User not found.", 404)
    }

    if (!world) {
      throw new AppError("World not found.", 404)
    }

    const character = await this.charactersRepository.create({
      name,
      description,
      user_id: ownerId,
      world_id: worldId,
    })

    return character
  }
}

export default CreateCharacterService
