import { inject, injectable } from "tsyringe"

import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import HashProviderInterface from "@shared/container/providers/HashProvider/HashProviderInterface"
import AppError from "@shared/errors/AppError"

import World from "../infra/typeorm/entities/World"
import WorldsRepositoryInterface from "../repositories/WorldsRepositoryInterface"

interface Request {
  title: string
  description?: string
  password: string
  ownerId: string
  systemBaseId: string
}

@injectable()
class CreateWorldService {
  constructor(
    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface,

    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,

    @inject("HashProvider")
    private hashProvider: HashProviderInterface
  ) {}

  public async execute({
    title,
    description,
    password,
    ownerId,
    systemBaseId,
  }: Request): Promise<World> {
    const user = await this.usersRepository.findById(ownerId)

    if (!user) {
      throw new AppError("User not found.", 404)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const world = await this.worldsRepository.create({
      title,
      password: hashedPassword,
      description,
      user_id: user.id,
      system_base_id: systemBaseId,
    })

    return world
  }
}

export default CreateWorldService
