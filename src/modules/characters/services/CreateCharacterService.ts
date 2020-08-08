import { inject, injectable } from "tsyringe"

import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
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
    private usersRepository: UsersRepositoryInterface
  ) {}

  public async execute({
    name,
    description,
    ownerId,
    worldId,
  }: Request): Promise<Character> {
    const user = await this.usersRepository.findById(ownerId)

    if (!user) {
      throw new AppError("Character owner not found.", 404)
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
